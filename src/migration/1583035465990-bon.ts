import {MigrationInterface, QueryRunner} from "typeorm";

export class bon1583035465990 implements MigrationInterface {
    name = 'bon1583035465990'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` CHANGE `socialId` `social` varchar(255) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `social`", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD `social` enum ('google') NOT NULL DEFAULT 'google'", undefined);
        await queryRunner.query("CREATE UNIQUE INDEX `IDX_539ee6dd9db0d6f72dcbdcdcfb` ON `user` (`email`, `social`)", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP INDEX `IDX_539ee6dd9db0d6f72dcbdcdcfb` ON `user`", undefined);
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `social`", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD `social` varchar(255) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `user` CHANGE `social` `socialId` varchar(255) NOT NULL", undefined);
    }

}
