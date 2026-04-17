<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class ImportSqliteDataCommand extends Command
{
    protected $signature = 'db:import-sqlite
                            {--path= : Path to SQLite file (default: database/database.sqlite)}';

    protected $description = 'Copy data from a local SQLite file into the current (MySQL) database. Run after php artisan migrate.';

    public function handle(): int
    {
        $path = $this->option('path') ?: database_path('database.sqlite');

        if (! is_readable($path)) {
            $this->warn("SQLite file not found or not readable: {$path}");
            $this->line('Nothing to import. If you only deploy to MySQL, this is expected.');

            return self::SUCCESS;
        }

        config(['database.connections.sqlite_import' => [
            'driver' => 'sqlite',
            'database' => $path,
            'prefix' => '',
            'foreign_key_constraints' => true,
        ]]);

        $src = 'sqlite_import';
        $dst = config('database.default');

        if ($dst === 'sqlite') {
            $this->error('Default DB is sqlite. Set DB_CONNECTION=mysql before importing into MySQL.');

            return self::FAILURE;
        }

        $order = ['users', 'categories', 'posts', 'products', 'abouts', 'category_post'];

        foreach ($order as $table) {
            if (! Schema::connection($src)->hasTable($table)) {
                $this->warn("Skip {$table}: not in SQLite.");
                continue;
            }
            if (! Schema::hasTable($table)) {
                $this->warn("Skip {$table}: not in MySQL — run migrations first.");

                return self::FAILURE;
            }
        }

        $this->info('Importing from SQLite → '.$dst.'...');

        DB::connection($dst)->statement('SET FOREIGN_KEY_CHECKS=0');

        try {
            foreach ($order as $table) {
                $rows = DB::connection($src)->table($table)->get();
                if ($rows->isEmpty()) {
                    $this->line("  {$table}: 0 rows");

                    continue;
                }
                foreach ($rows as $row) {
                    DB::connection($dst)->table($table)->insert((array) $row);
                }
                $this->info("  {$table}: {$rows->count()} rows");
            }
        } catch (\Throwable $e) {
            $this->error($e->getMessage());
            $this->line('Tip: use an empty MySQL database, or remove conflicting rows, then retry.');

            return self::FAILURE;
        } finally {
            DB::connection($dst)->statement('SET FOREIGN_KEY_CHECKS=1');
        }

        $this->info('Done.');

        return self::SUCCESS;
    }
}
