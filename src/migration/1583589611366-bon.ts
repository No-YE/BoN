import {MigrationInterface, QueryRunner} from "typeorm";

export class bon1583589611366 implements MigrationInterface {
    name = 'bon1583589611366'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `post_to_category` DROP FOREIGN KEY `FK_9dab22c49ca441a85b5d1305342`", undefined);
        await queryRunner.query("ALTER TABLE `post_to_category` DROP FOREIGN KEY `FK_9d072d7c8d7909a5474fee7bbae`", undefined);
        await queryRunner.query("DROP INDEX `IDX_9dab22c49ca441a85b5d130534` ON `post_to_category`", undefined);
        await queryRunner.query("DROP INDEX `IDX_9d072d7c8d7909a5474fee7bba` ON `post_to_category`", undefined);
        await queryRunner.query("CREATE TABLE `image` (`id` int NOT NULL AUTO_INCREMENT, `uri` varchar(255) NOT NULL, `kind` enum ('post') NOT NULL DEFAULT 'post', `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_2e862f9d1794d3a38b57236886` (`uri`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `post` ADD `thumbnail` varchar(255) NULL", undefined);
        await queryRunner.query("ALTER TABLE `post` ADD `views` int NOT NULL DEFAULT 0", undefined);
        await queryRunner.query("ALTER TABLE `category` ADD UNIQUE INDEX `IDX_23c05c292c439d77b0de816b50` (`name`)", undefined);
        await queryRunner.query("CREATE INDEX `IDX_9dab22c49ca441a85b5d130534` ON `post_to_category` (`postId`)", undefined);
        await queryRunner.query("CREATE INDEX `IDX_9d072d7c8d7909a5474fee7bba` ON `post_to_category` (`categoryId`)", undefined);
        await queryRunner.query("ALTER TABLE `post_to_category` ADD CONSTRAINT `FK_9dab22c49ca441a85b5d1305342` FOREIGN KEY (`postId`) REFERENCES `post`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `post_to_category` ADD CONSTRAINT `FK_9d072d7c8d7909a5474fee7bbae` FOREIGN KEY (`categoryId`) REFERENCES `category`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `post_to_category` DROP FOREIGN KEY `FK_9d072d7c8d7909a5474fee7bbae`", undefined);
        await queryRunner.query("ALTER TABLE `post_to_category` DROP FOREIGN KEY `FK_9dab22c49ca441a85b5d1305342`", undefined);
        await queryRunner.query("DROP INDEX `IDX_9d072d7c8d7909a5474fee7bba` ON `post_to_category`", undefined);
        await queryRunner.query("DROP INDEX `IDX_9dab22c49ca441a85b5d130534` ON `post_to_category`", undefined);
        await queryRunner.query("ALTER TABLE `category` DROP INDEX `IDX_23c05c292c439d77b0de816b50`", undefined);
        await queryRunner.query("ALTER TABLE `post` DROP COLUMN `views`", undefined);
        await queryRunner.query("ALTER TABLE `post` DROP COLUMN `thumbnail`", undefined);
        await queryRunner.query("DROP INDEX `IDX_2e862f9d1794d3a38b57236886` ON `image`", undefined);
        await queryRunner.query("DROP TABLE `image`", undefined);
        await queryRunner.query("CREATE INDEX `IDX_9d072d7c8d7909a5474fee7bba` ON `post_to_category` (`categoryId`)", undefined);
        await queryRunner.query("CREATE INDEX `IDX_9dab22c49ca441a85b5d130534` ON `post_to_category` (`postId`)", undefined);
        await queryRunner.query("ALTER TABLE `post_to_category` ADD CONSTRAINT `FK_9d072d7c8d7909a5474fee7bbae` FOREIGN KEY (`categoryId`) REFERENCES `category`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `post_to_category` ADD CONSTRAINT `FK_9dab22c49ca441a85b5d1305342` FOREIGN KEY (`postId`) REFERENCES `post`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

}
