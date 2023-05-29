import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class OrderTable1685157625684 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "orders",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                    default: "gen_random_uuid()"
                },
                {
                    name: "event_id",
                    type: "uuid"
                },
                {
                    name: "price",
                    type: "decimal"
                },
                {
                    name: "email",
                    type: "varchar(150)"
                },
                {
                    name: "bank_slip_url",
                    type: "varchar(150)",
                    isNullable: true
                    
                },                
                {
                    name: "document",
                    type: "varchar(100)"
                },
                {
                    name: "payment_method",
                    type: "varchar(50)"
                },
                {
                    name: "status",
                    type: "varchar"
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

        const foreignKey = new TableForeignKey({
            columnNames: ["event_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "events",
            
        });
        await queryRunner.createForeignKey("orders", foreignKey);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("orders")
    }

}
