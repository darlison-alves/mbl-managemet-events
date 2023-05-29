import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class EventTable1684853111069 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "events",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                    default: "gen_random_uuid()"
                },
                {
                    name: "name",
                    type: "varchar(100)"
                },
                {
                    name: "description",
                    type: "varchar",
                    isNullable: true
                },
                {
                    name: "price",
                    type: "decimal"
                },
                {
                    name: "status",
                    type: "varchar"
                },
                {
                    name: "show_date",
                    type: "timestamptz",
                    isNullable: true
                },
                {
                    name: "created_at",
                    type: "timestamptz",
                    default: "now()"
                },
                {
                    name: "updated_at",
                    type: "timestamptz",
                    default: "now()"
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("events")
    }

}
