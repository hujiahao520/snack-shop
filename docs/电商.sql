/*
SQLyog Ultimate v12.08 (64 bit)
MySQL - 5.5.62 : Database - letao
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`letao` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `letao`;

/*Table structure for table `address` */

DROP TABLE IF EXISTS `address`;

CREATE TABLE `address` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `addressDetail` varchar(200) DEFAULT NULL,
  `isDelete` int(4) DEFAULT NULL,
  `recipients` varchar(100) DEFAULT NULL,
  `postCode` varchar(100) DEFAULT NULL,
  `mobile` varchar(100) DEFAULT NULL,
  `ad_state` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

/*Data for the table `address` */

insert  into `address`(`id`,`userId`,`address`,`addressDetail`,`isDelete`,`recipients`,`postCode`,`mobile`,`ad_state`) values (15,2,'辽宁省抚顺市望花区','大师傅似的',1,'胡玉杰','637000','15555668899',0),(18,2,'北京市北京城区丰台区','发生发射点',0,'谢师宴','637000','15655556666',1),(19,2,'四川省成都市温江区','成都师范学院',1,'胡先生','637000','13258298208',0);

/*Table structure for table `address01` */

DROP TABLE IF EXISTS `address01`;

CREATE TABLE `address01` (
  `ad_id` int(11) NOT NULL AUTO_INCREMENT,
  `u_id` int(10) DEFAULT NULL,
  `ad_pro` varchar(10) DEFAULT NULL,
  `ad_city` varchar(10) DEFAULT NULL,
  `ad_region` varchar(10) DEFAULT NULL,
  `ad_detail` varchar(50) DEFAULT NULL,
  `ad_tel` varchar(18) DEFAULT NULL,
  `ad_name` varchar(18) DEFAULT NULL,
  `ad_state` int(11) DEFAULT '0',
  PRIMARY KEY (`ad_id`),
  KEY `u_id` (`u_id`),
  CONSTRAINT `address01_ibfk_1` FOREIGN KEY (`u_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4;

/*Data for the table `address01` */

insert  into `address01`(`ad_id`,`u_id`,`ad_pro`,`ad_city`,`ad_region`,`ad_detail`,`ad_tel`,`ad_name`,`ad_state`) values (4,10,'222','222','222','222','222','222',0),(20,NULL,'四川省','成都市','双流区','国信安基地','17360074295','黄欣',0),(21,NULL,'河北省','秦皇岛市','北戴河区','单位','17360074295','淡淡的',0),(22,NULL,'辽宁省','抚顺市','顺城区','淡淡的','17360074295','淡淡的',0),(23,NULL,'山西省','长治市','屯留县','啊实打实大','15554444587','asd',0),(24,NULL,'辽宁省','本溪市','南芬区','阿萨','啊实打实大1','啊实打实大',0),(25,1,'北京市','北京城区','朝阳区','登山泛','17311388039','萨芬',0),(27,1,'四川省','成都市','双流区','国信安','17360074295','阿飞',0);

/*Table structure for table `brand` */

DROP TABLE IF EXISTS `brand`;

CREATE TABLE `brand` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `brandName` varchar(50) DEFAULT NULL,
  `categoryId` int(11) DEFAULT NULL,
  `brandLogo` varchar(200) DEFAULT NULL,
  `isDelete` int(4) DEFAULT NULL,
  `hot` int(4) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `categoryId` (`categoryId`),
  CONSTRAINT `brand_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

/*Data for the table `brand` */

insert  into `brand`(`id`,`brandName`,`categoryId`,`brandLogo`,`isDelete`,`hot`) values (1,'坚果炒货',1,'./images/shang01.JPG',1,1),(2,'饼干糕点',1,'./images/shang02.jpg',1,1),(3,'糖果巧克力',1,'./images/shang03.jpg',1,1),(4,'蜜饯果干',1,'./images/shang04.jpg',1,1),(5,'肉类制品',1,'./images/shang05.jpg',1,1),(6,'海味零食',2,'./images/shang06.jpg',1,1),(7,'膨化零食',2,'./images/shang07.jpg',1,1),(8,'饮料/罐头/牛奶',3,'./images/shang08.jpg',1,1),(9,'豆菌笋类',4,'./images/shang09.jpg',1,1),(10,'速食方便',5,'./images/shang02.jpg',1,1);

/*Table structure for table `cart` */

DROP TABLE IF EXISTS `cart`;

CREATE TABLE `cart` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `productId` int(10) unsigned DEFAULT NULL,
  `num` int(20) DEFAULT NULL,
  `size` varchar(20) DEFAULT NULL,
  `isDelete` int(4) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `productId` (`productId`),
  CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`),
  CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8;

/*Data for the table `cart` */

insert  into `cart`(`id`,`userId`,`productId`,`num`,`size`,`isDelete`) values (1,1,1,1,'50',1),(2,1,2,2,'45',1),(3,1,3,4,'40',1),(4,2,8,1,'',0),(5,2,8,1,'',0),(6,2,8,1,'',0),(7,2,8,1,'',0),(8,2,8,1,'',0),(9,2,8,1,'',0),(10,2,8,1,'',0),(11,2,8,1,'',0),(12,2,8,1,'',0),(13,2,8,1,'',0),(14,2,8,1,'',0),(15,2,19,1,'',0),(18,2,7,1,'',0),(19,2,7,1,'',0),(20,2,8,1,'',0),(21,2,7,1,'',0),(22,2,7,1,'2',0),(23,2,7,1,'',0),(24,2,7,1,'',0),(25,2,7,1,'',0),(26,2,7,1,'',0),(27,2,7,2,'8',0),(28,2,13,1,'',0),(29,2,33,1,'',0),(30,2,33,1,'',0),(31,2,11,1,'',0),(32,2,11,1,'',0),(33,2,5,1,'',0),(34,2,14,6,'',0),(35,2,11,1,'',0),(36,2,15,2,'',0),(37,2,91,3,'',0),(38,2,6,1,'',0),(39,2,23,1,'',0),(40,4,1,1,'',1),(41,2,10,1,'',0),(42,5,3,1,'',0),(43,2,2,2,'9',0),(44,6,2,1,'',1),(45,2,10,1,'',0),(46,2,10,2,'9',0),(47,2,38,4,'3',0),(48,2,14,1,'4',0),(49,2,2,1,'',1),(50,2,3,3,'8',1),(61,2,2,1,'',0),(62,2,2,1,'',1);

/*Table structure for table `category` */

DROP TABLE IF EXISTS `category`;

CREATE TABLE `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `categoryName` varchar(50) DEFAULT NULL,
  `isDelete` int(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

/*Data for the table `category` */

insert  into `category`(`id`,`categoryName`,`isDelete`) values (1,'首页',1),(2,'秒杀',1),(3,'促销',1),(4,'新品',1),(5,'美食社区',1),(6,'大家好',1);

/*Table structure for table `employee` */

DROP TABLE IF EXISTS `employee`;

CREATE TABLE `employee` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `mobile` char(11) DEFAULT NULL,
  `authority` int(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Data for the table `employee` */

insert  into `employee`(`id`,`username`,`password`,`mobile`,`authority`) values (1,'root','4QrcOUm6Wau+VuBX8g+IPg==','13902060052',1),(2,'abcd','4QrcOUm6Wau+VuBX8g+IPg==','13258298208',NULL),(3,'h123','hujiahao',NULL,NULL);

/*Table structure for table `logistics` */

DROP TABLE IF EXISTS `logistics`;

CREATE TABLE `logistics` (
  `log_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `or_id` int(10) unsigned DEFAULT NULL,
  `log_company` varchar(20) DEFAULT NULL,
  `log_expressid` varchar(50) DEFAULT NULL,
  `log_deliverTime` date DEFAULT NULL,
  PRIMARY KEY (`log_id`),
  KEY `or_id` (`or_id`),
  CONSTRAINT `logistics_ibfk_1` FOREIGN KEY (`or_id`) REFERENCES `orderlist` (`or_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

/*Data for the table `logistics` */

insert  into `logistics`(`log_id`,`or_id`,`log_company`,`log_expressid`,`log_deliverTime`) values (1,13,'申通快递','1001101102','2019-10-09'),(2,16,'中通快递','1113065135','2019-06-08');

/*Table structure for table `logisticsdetails` */

DROP TABLE IF EXISTS `logisticsdetails`;

CREATE TABLE `logisticsdetails` (
  `logDe_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `log_id` int(10) unsigned NOT NULL,
  `log_status` varchar(20) DEFAULT NULL,
  `logDe_date` datetime DEFAULT NULL,
  `logDe_time` time DEFAULT NULL,
  `logDe_position` varchar(50) DEFAULT NULL,
  `logDe_message` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`logDe_id`),
  KEY `log_id` (`log_id`),
  CONSTRAINT `logisticsdetails_ibfk_1` FOREIGN KEY (`log_id`) REFERENCES `logistics` (`log_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4;

/*Data for the table `logisticsdetails` */

insert  into `logisticsdetails`(`logDe_id`,`log_id`,`log_status`,`logDe_date`,`logDe_time`,`logDe_position`,`logDe_message`) values (1,1,'1','2019-10-15 18:10:23','18:10:23','广州分拣仓库','您的订单已经打印完成'),(2,1,'1','2019-10-15 19:11:23','19:11:23','广州分拣仓库','拣货完成'),(3,1,'1','2019-10-15 20:11:23','20:11:23','广州分拣仓库','扫描完成'),(4,1,'1','2019-10-15 20:15:21','20:15:21','广州分拣仓库','打包完成'),(5,1,'2','2019-10-15 22:15:21','22:15:21','广州分拣仓库','您的订单由【广州一号接货仓】送往【成都新都亚一分拣中心】'),(6,1,'2','2019-10-17 08:15:21','08:15:21','成都新都亚一分拣中心','您的订单在【成都新都亚一分拣中心】分拣完成'),(7,1,'2','2019-10-17 10:19:21','10:19:21','成都新都亚一分拣中心','您的订单由京东【成都新都亚一分拣中心】送往【成都温江营业部】'),(8,1,'2','2019-10-17 16:19:33','16:19:33','成都温江营业部','您的订单已到达京东【成都温江营业部】'),(9,1,'3','2019-10-18 08:10:21','08:10:21','成都温江营业部','您的订单正在配送途中（快递员：加号，电话：18848000000），请您耐心等待。'),(11,1,'4','2019-10-19 07:50:21','07:50:21','成都师范学院','您的订单已送达。（快递员：加号，电话：18848000000)'),(12,2,'1','2019-10-08 10:19:21','10:19:21','广州分拣仓库','您的订单已经打印完成'),(13,2,'1','2019-10-08 10:19:21','10:19:21','广州分拣仓库','拣货完成'),(14,2,'1','2019-10-08 10:19:21','10:19:21','广州分拣仓库','扫描完成'),(15,2,'1','2019-10-08 10:19:21','10:19:21','广州分拣仓库','打包完成'),(16,2,'2','2019-10-09 08:15:21','08:15:21','广州分拣仓库','您的订单由【广州一号接货仓】送往【北京亚一分拣中心】'),(17,2,'2','2019-10-09 10:19:21','10:19:21','北京亚一分拣中心','您的订单在【北京亚一分拣中心】分拣完成'),(18,2,'3','2019-10-10 07:50:21','07:50:21','北京亚一分拣中心','您的订单正在配送途中（快递员：加号，电话：18848000000），请您耐心等待。');

/*Table structure for table `orderdetails` */

DROP TABLE IF EXISTS `orderdetails`;

CREATE TABLE `orderdetails` (
  `orDe_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `or_id` int(10) unsigned DEFAULT NULL,
  `pr_id` int(10) unsigned DEFAULT NULL,
  `orDe_color` varchar(20) DEFAULT NULL,
  `orDe_standard` varchar(10) DEFAULT NULL,
  `orDe_amount` int(11) DEFAULT NULL,
  `orDe_price` int(11) DEFAULT NULL,
  PRIMARY KEY (`orDe_id`),
  KEY `or_id` (`or_id`),
  KEY `mer_id` (`pr_id`),
  CONSTRAINT `orderdetails_ibfk_1` FOREIGN KEY (`or_id`) REFERENCES `orderlist` (`or_id`),
  CONSTRAINT `orderdetails_ibfk_2` FOREIGN KEY (`pr_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=129 DEFAULT CHARSET=utf8mb4;

/*Data for the table `orderdetails` */

insert  into `orderdetails`(`orDe_id`,`or_id`,`pr_id`,`orDe_color`,`orDe_standard`,`orDe_amount`,`orDe_price`) values (113,13,3,'黑色','热卖',22,22),(114,16,5,'白色','促销',33,10),(118,13,3,'首页','坚果炒货',3,18),(124,137,2,'首页','坚果炒货',1,50),(125,137,3,'首页','坚果炒货',3,18),(126,138,3,'首页','坚果炒货',3,18),(127,139,2,'首页','坚果炒货',1,50),(128,140,2,'首页','坚果炒货',1,50);

/*Table structure for table `orderlist` */

DROP TABLE IF EXISTS `orderlist`;

CREATE TABLE `orderlist` (
  `or_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `u_id` int(10) DEFAULT NULL,
  `or_time` date DEFAULT NULL,
  `or_payTime` date DEFAULT NULL,
  `or_price` int(11) DEFAULT NULL,
  `or_status` int(10) DEFAULT '1',
  `or_address` varchar(50) DEFAULT NULL,
  `or_people` varchar(10) DEFAULT NULL,
  `or_telephone` varchar(18) DEFAULT NULL,
  `or_isDel` int(11) DEFAULT '0' COMMENT '1表示删除，0表示存在',
  `or_number` varchar(20) DEFAULT NULL,
  `or_msg` varchar(100) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`or_id`),
  KEY `u_id` (`u_id`),
  CONSTRAINT `orderlist_ibfk_1` FOREIGN KEY (`u_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=141 DEFAULT CHARSET=utf8mb4;

/*Data for the table `orderlist` */

insert  into `orderlist`(`or_id`,`u_id`,`or_time`,`or_payTime`,`or_price`,`or_status`,`or_address`,`or_people`,`or_telephone`,`or_isDel`,`or_number`,`or_msg`) values (13,2,'2019-10-30','2019-10-10',199,4,'成都','胡玉杰','17444444444',0,'111',NULL),(16,2,'2019-10-30','2019-10-17',102,4,'四川省/成都/武侯区/高新青年公寓','雷开武','13185289966',0,'222',NULL),(119,1,'2019-11-10',NULL,53,1,'四川省成都市温江区/成都师范学院','胡先生','13258298208',0,'7760692195555916000','亲，记得包邮哦'),(121,2,'2019-11-10',NULL,53,1,'四川省南充市嘉陵区/金山寺','黄欣','15555668899',0,'9743674677329076000',''),(137,2,'2019-11-10','2019-11-10',102,2,'四川省南充市嘉陵区/金山寺','黄欣','15555668899',0,'3677792190831368000',''),(138,2,'2019-11-10','2019-11-10',53,2,'四川省南充市嘉陵区/金山寺','黄欣','15555668899',0,'4764869648967469000','亲  ！ 记得多给一点'),(139,2,'2019-11-13','2019-11-13',50,2,'辽宁省抚顺市望花区/大师傅似的','胡玉杰','15555668899',0,'5741668620573641000','亲  记得包邮'),(140,2,'2019-12-25','2019-12-25',50,2,'辽宁省抚顺市望花区/大师傅似的','胡玉杰','15555668899',0,'9771291560926257000','');

/*Table structure for table `product` */

DROP TABLE IF EXISTS `product`;

CREATE TABLE `product` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `proName` varchar(200) DEFAULT NULL COMMENT '商品名称',
  `oldPrice` float DEFAULT NULL COMMENT '商品价格',
  `price` float DEFAULT NULL COMMENT '商品折扣价',
  `proDesc` varchar(500) DEFAULT NULL COMMENT '商品描述',
  `size` varchar(20) DEFAULT NULL COMMENT '商品尺寸',
  `statu` int(4) DEFAULT NULL COMMENT '是否下架',
  `updateTime` datetime DEFAULT NULL COMMENT '上下架时间',
  `num` int(20) DEFAULT NULL COMMENT '商品库存',
  `brandId` int(11) DEFAULT NULL COMMENT '归属品牌',
  PRIMARY KEY (`id`),
  KEY `brandId` (`brandId`),
  CONSTRAINT `product_ibfk_1` FOREIGN KEY (`brandId`) REFERENCES `brand` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=102 DEFAULT CHARSET=utf8;

/*Data for the table `product` */

insert  into `product`(`id`,`proName`,`oldPrice`,`price`,`proDesc`,`size`,`statu`,`updateTime`,`num`,`brandId`) values (1,'WIN2七叶兰味脆果80g',59.5,49.5,'描述','1-10',1,'2019-10-06 11:14:51',20,1),(2,'WIN2巧克力味脆果80g',59.5,49.5,'描述','1-10',1,'2019-10-06 11:12:08',20,1),(3,'小荷糖果盒80g',20.5,17.5,'描述','1-10',1,'2019-10-06 11:15:10',20,1),(4,'卫士极甜心薯片',10.5,9.5,'描述','1-10',0,'2017-01-05 00:28:29',20,1),(5,'WIN2奶油味脆果80g',59.5,49.5,'描述123123','1-10',0,'2017-01-05 00:48:05',22,2),(6,'WIN2黑芝麻味脆果80g',59.5,49.5,'描述123123','1-10',0,'2017-01-05 00:48:05',44,2),(7,'WIN2七叶兰味软糖100g',20.9,18.5,NULL,'1-10',0,'2019-01-05 00:48:05',55,3),(8,'WIN2七叶兰味甜甜圈80g',12.1,10.5,NULL,'1-10',1,'2019-01-05 00:48:05',22,4),(9,'WIN2七叶兰味脆果80g',59.5,49.5,NULL,'1-10',0,'2019-01-05 00:48:05',55,5),(10,'WIN2巧克力味脆果80g',59.5,49.5,NULL,'1-10',1,'2019-01-05 00:48:05',22,6),(11,'WIN2黑芝麻味脆果80g',22.6,20.1,NULL,'1-10',0,'2019-01-05 00:48:05',55,7),(12,'卫士极甜心薯片',13.1,10.2,NULL,'1-10',0,'2019-01-05 00:48:05',55,8),(13,'WIN2七叶兰味脆果80g',59.5,49.5,'描述','1-10',0,'2019-09-05 00:28:29',20,1),(14,'WIN2巧克力味脆果80g',59.5,49.5,'描述','1-10',0,'2019-09-05 00:28:29',20,2),(15,'小荷糖果盒80g',20.5,17.5,'描述','1-10',0,'2019-09-05 00:28:29',20,3),(16,'卫士极甜心薯片',10.5,9.5,'描述','1-10',1,'2019-09-05 00:28:29',20,4),(17,'WIN2奶油味脆果80g',59.5,49.5,'描述123123','1-10',0,'2019-01-05 00:48:05',22,5),(18,'WIN2黑芝麻味脆果80g',59.5,49.5,'描述123123','1-10',1,'2019-09-05 00:48:05',44,6),(19,'WIN2七叶兰味软糖100g',20.9,18.5,'描述123123','1-10',1,'2019-09-05 00:48:05',44,7),(20,'WIN2七叶兰味甜甜圈80g',20.9,18.5,'描述123123','1-10',1,'2019-09-05 00:48:05',44,8),(21,'小荷糖果盒80g',20.5,17.5,'描述','1-10',1,'2019-09-05 00:28:29',20,9),(22,'WIN2黑芝麻味脆果80g',59.5,49.5,'描述123123','1-10',1,'2019-09-05 00:48:05',44,10),(23,'WIN2七叶兰味脆果80g',59.5,49.5,'描述','1-10',1,'2019-09-05 00:28:29',20,1),(24,'WIN2巧克力味脆果80g',59.5,49.5,'描述','1-10',1,'2019-09-05 00:28:29',20,2),(25,'小荷糖果盒80g',20.5,17.5,'描述','1-10',1,'2019-09-05 00:28:29',20,3),(26,'卫士极甜心薯片',10.5,9.5,'描述','1-10',1,'2019-09-05 00:28:29',20,4),(27,'WIN2奶油味脆果80g',59.5,49.5,'描述123123','1-10',1,'2019-01-05 00:48:05',22,5),(28,'WIN2黑芝麻味脆果80g',59.5,49.5,'描述123123','1-10',1,'2019-09-05 00:48:05',44,6),(29,'WIN2七叶兰味软糖100g',20.9,18.5,'描述123123','1-10',1,'2019-09-05 00:48:05',44,7),(30,'WIN2七叶兰味甜甜圈80g',20.9,18.5,'描述123123','1-10',1,'2019-09-05 00:48:05',44,8),(31,'小荷糖果盒80g',20.5,17.5,'描述','1-10',1,'2019-09-05 00:28:29',20,9),(32,'WIN2黑芝麻味脆果80g',59.5,49.5,'描述123123','1-10',1,'2019-09-05 00:48:05',44,10),(33,'WIN2七叶兰味脆果80g',59.5,49.5,'描述','1-10',1,'2019-09-05 00:28:29',20,1),(34,'WIN2巧克力味脆果80g',59.5,49.5,'描述','1-10',1,'2019-09-05 00:28:29',20,2),(35,'小荷糖果盒80g',20.5,17.5,'描述','1-10',1,'2019-09-05 00:28:29',20,3),(36,'卫士极甜心薯片',10.5,9.5,'描述','1-10',1,'2019-09-05 00:28:29',20,4),(37,'WIN2奶油味脆果80g',59.5,49.5,'描述123123','1-10',1,'2019-01-05 00:48:05',22,5),(38,'WIN2黑芝麻味脆果80g',59.5,49.5,'描述123123','1-10',1,'2019-09-05 00:48:05',44,6),(39,'WIN2七叶兰味软糖100g',20.9,18.5,'描述123123','1-10',1,'2019-09-05 00:48:05',44,7),(40,'WIN2七叶兰味甜甜圈80g',20.9,18.5,'描述123123','1-10',1,'2019-09-05 00:48:05',44,8),(41,'小荷糖果盒80g',20.5,17.5,'描述','1-10',1,'2019-09-05 00:28:29',20,9),(42,'WIN2黑芝麻味脆果80g',59.5,49.5,'描述123123','1-10',1,'2019-09-05 00:48:05',44,10),(43,'WIN2七叶兰味脆果80g',59.5,49.5,'描述','1-10',1,'2019-09-05 00:28:29',20,1),(44,'WIN2巧克力味脆果80g',59.5,49.5,'描述','1-10',1,'2019-09-05 00:28:29',20,2),(45,'小荷糖果盒80g',20.5,17.5,'描述','1-10',1,'2019-09-05 00:28:29',20,3),(46,'卫士极甜心薯片',10.5,9.5,'描述','1-10',1,'2019-09-05 00:28:29',20,4),(47,'WIN2奶油味脆果80g',59.5,49.5,'描述123123','1-10',1,'2019-01-05 00:48:05',22,5),(48,'WIN2黑芝麻味脆果80g',59.5,49.5,'描述123123','1-10',1,'2019-09-05 00:48:05',44,6),(49,'WIN2七叶兰味软糖100g',20.9,18.5,'描述123123','1-10',1,'2019-09-05 00:48:05',44,7),(50,'WIN2七叶兰味甜甜圈80g',20.9,18.5,'描述123123','1-10',1,'2019-09-05 00:48:05',44,8),(51,'小荷糖果盒80g',20.5,17.5,'描述','1-10',1,'2019-09-05 00:28:29',20,9),(52,'WIN2黑芝麻味脆果80g',59.5,49.5,'描述123123','1-10',1,'2019-09-05 00:48:05',44,10),(53,'WIN2七叶兰味脆果80g',59.5,49.5,'描述','1-10',1,'2019-09-05 00:28:29',20,1),(54,'WIN2巧克力味脆果80g',59.5,49.5,'描述','1-10',1,'2019-09-05 00:28:29',20,2),(55,'小荷糖果盒80g',20.5,17.5,'描述','1-10',1,'2019-09-05 00:28:29',20,3),(56,'卫士极甜心薯片',10.5,9.5,'描述','1-10',1,'2019-09-05 00:28:29',20,4),(57,'WIN2奶油味脆果80g',59.5,49.5,'描述123123','1-10',1,'2019-01-05 00:48:05',22,5),(58,'WIN2黑芝麻味脆果80g',59.5,49.5,'描述123123','1-10',1,'2019-09-05 00:48:05',44,6),(59,'WIN2七叶兰味软糖100g',20.9,18.5,'描述123123','1-10',1,'2019-09-05 00:48:05',44,7),(60,'WIN2七叶兰味甜甜圈80g',20.9,18.5,'描述123123','1-10',1,'2019-09-05 00:48:05',44,8),(61,'小荷糖果盒80g',20.5,17.5,'描述','1-10',1,'2019-09-05 00:28:29',20,9),(62,'WIN2黑芝麻味脆果80g',59.5,49.5,'描述123123','1-10',1,'2019-09-05 00:48:05',44,10),(63,'WIN2七叶兰味脆果80g',59.5,49.5,'描述','1-10',1,'2019-09-05 00:28:29',20,1),(64,'WIN2巧克力味脆果80g',59.5,49.5,'描述','1-10',1,'2019-09-05 00:28:29',20,2),(65,'小荷糖果盒80g',20.5,17.5,'描述','1-10',1,'2019-09-05 00:28:29',20,3),(66,'卫士极甜心薯片',10.5,9.5,'描述','1-10',1,'2019-09-05 00:28:29',20,4),(67,'WIN2奶油味脆果80g',59.5,49.5,'描述123123','1-10',1,'2019-01-05 00:48:05',22,5),(68,'WIN2黑芝麻味脆果80g',59.5,49.5,'描述123123','1-10',1,'2019-09-05 00:48:05',44,6),(69,'WIN2七叶兰味软糖100g',20.9,18.5,'描述123123','1-10',1,'2019-09-05 00:48:05',44,7),(70,'WIN2七叶兰味甜甜圈80g',20.9,18.5,'描述123123','1-10',1,'2019-09-05 00:48:05',44,8),(71,'小荷糖果盒80g',20.5,17.5,'描述','1-10',1,'2019-09-05 00:28:29',20,9),(72,'WIN2黑芝麻味脆果80g',59.5,49.5,'描述123123','1-10',1,'2019-09-05 00:48:05',44,10),(73,'WIN2七叶兰味脆果80g',59.5,49.5,'描述','1-10',1,'2019-09-05 00:28:29',20,1),(74,'WIN2巧克力味脆果80g',59.5,49.5,'描述','1-10',1,'2019-09-05 00:28:29',20,2),(75,'小荷糖果盒80g',20.5,17.5,'描述','1-10',1,'2019-09-05 00:28:29',20,3),(76,'卫士极甜心薯片',10.5,9.5,'描述','1-10',1,'2019-09-05 00:28:29',20,4),(77,'WIN2奶油味脆果80g',59.5,49.5,'描述123123','1-10',1,'2019-01-05 00:48:05',22,5),(78,'WIN2黑芝麻味脆果80g',59.5,49.5,'描述123123','1-10',1,'2019-09-05 00:48:05',44,6),(79,'WIN2七叶兰味软糖100g',20.9,18.5,'描述123123','1-10',1,'2019-09-05 00:48:05',44,7),(80,'WIN2七叶兰味甜甜圈80g',20.9,18.5,'描述123123','1-10',1,'2019-09-05 00:48:05',44,8),(81,'小荷糖果盒80g',20.5,17.5,'描述','1-10',1,'2019-09-05 00:28:29',20,9),(82,'WIN2黑芝麻味脆果80g',59.5,49.5,'描述123123','1-10',1,'2019-09-05 00:48:05',44,10),(83,'WIN2七叶兰味脆果80g',59.5,49.5,'描述','1-10',1,'2019-09-05 00:28:29',20,1),(84,'WIN2巧克力味脆果80g',59.5,49.5,'描述','1-10',1,'2019-09-05 00:28:29',20,2),(85,'小荷糖果盒80g',20.5,17.5,'描述','1-10',1,'2019-09-05 00:28:29',20,3),(86,'卫士极甜心薯片',10.5,9.5,'描述','1-10',1,'2019-09-05 00:28:29',20,4),(87,'WIN2奶油味脆果80g',59.5,49.5,'描述123123','1-10',1,'2019-01-05 00:48:05',22,5),(88,'WIN2黑芝麻味脆果80g',59.5,49.5,'描述123123','1-10',1,'2019-09-05 00:48:05',44,6),(89,'WIN2七叶兰味软糖100g',20.9,18.5,'描述123123','1-10',1,'2019-09-05 00:48:05',44,7),(90,'WIN2七叶兰味甜甜圈80g',20.9,18.5,'描述123123','1-10',1,'2019-09-05 00:48:05',44,8),(91,'小荷糖果盒80g',20.5,17.5,'描述','1-10',1,'2019-09-05 00:28:29',20,9),(92,'WIN2黑芝麻味脆果80g',59.5,49.5,'描述123123','1-10',1,'2019-09-05 00:48:05',44,10),(93,'WIN2七叶兰味脆果80g',59.5,49.5,'描述','1-10',1,'2019-09-05 00:28:29',20,1),(94,'WIN2巧克力味脆果80g',59.5,49.5,'描述','1-10',1,'2019-09-05 00:28:29',20,2),(95,'小荷糖果盒80g',20.5,17.5,'描述','1-10',1,'2019-09-05 00:28:29',20,3),(96,'卫士极甜心薯片',10.5,9.5,'描述','1-10',1,'2019-09-05 00:28:29',20,4),(97,'WIN2奶油味脆果80g',59.5,49.5,'描述123123','1-10',1,'2019-01-05 00:48:05',22,5),(98,'WIN2黑芝麻味脆果80g',59.5,49.5,'描述123123','1-10',0,'2019-09-05 00:48:05',44,6),(99,'WIN2七叶兰味软糖100g',20.9,18.5,'描述123123','1-10',1,'2019-09-05 00:48:05',44,7),(100,'WIN2七叶兰味甜甜圈80g',20.9,18.5,'描述123123','1-10',1,'2019-10-06 11:07:15',44,8),(101,'小荷糖果盒80g',20.5,17.5,'描述','1-10',0,'2019-10-06 11:01:50',20,9);

/*Table structure for table `product_picture` */

DROP TABLE IF EXISTS `product_picture`;

CREATE TABLE `product_picture` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `picName` varchar(40) DEFAULT NULL,
  `productId` int(10) unsigned DEFAULT NULL,
  `picAddr` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `productId` (`productId`),
  CONSTRAINT `product_picture_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8;

/*Data for the table `product_picture` */

insert  into `product_picture`(`id`,`picName`,`productId`,`picAddr`) values (1,'01.jpg',1,'img/01.jpg'),(2,'02.jpg',2,'img/02.jpg'),(3,'03.jpg',3,'img/03.jpg'),(4,'04.jpg',4,'img/04.jpg'),(5,'05.jpg',5,'img/05.jpg'),(6,'06.jpg',6,'img/06.jpg'),(7,'07.jpg',7,'img/07.jpg'),(8,'08.jpg',8,'img/08.jpg'),(9,'09.jpg',9,'img/09.jpg'),(10,'10.jpg',10,'img/10.jpg'),(11,'11.jpg',11,'img/11.jpg'),(12,'12.jpg',12,'img/12.jpg'),(13,'13.jpg',13,'img/13.jpg'),(14,'14.jpg',14,'img/14.jpg'),(15,'15.jpg',15,'img/15.jpg'),(16,'16.jpg',16,'img/16.jpg'),(17,'17.jpg',17,'img/17.jpg'),(18,'18.jpg',18,'img/18.jpg'),(19,'19.jpg',19,'img/19.jpg'),(20,'20.jpg',20,'img/20.jpg'),(21,'21.jpg',21,'img/21.jpg'),(22,'22.jpg',22,'img/22.jpg'),(23,'23.jpg',23,'img/23.jpg'),(24,'24.jpg',24,'img/24.jpg'),(25,'25.jpg',25,'img/25.jpg'),(26,'26.jpg',26,'img/26.jpg'),(27,'27.jpg',27,'img/27.jpg'),(28,'28.jpg',28,'img/28.jpg'),(29,'29.jpg',29,'img/29.jpg'),(30,'30.jpg',30,'img/30.jpg'),(31,'31.jpg',31,'img/31.jpg'),(32,'32.jpg',32,'img/32.jpg'),(33,'33.jpg',33,'img/33.jpg'),(34,'34.jpg',34,'img/34.jpg'),(35,'35.jpg',35,'img/35.jpg'),(36,'36.jpg',36,'img/36.jpg'),(37,'37.jpg',37,'img/37.jpg'),(38,'38.jpg',38,'img/38.jpg'),(39,'39.jpg',39,'img/39.jpg'),(40,'40.jpg',40,'img/40.jpg'),(41,'41.jpg',41,'img/41.jpg'),(42,'42.jpg',42,'img/42.jpg'),(43,'43.jpg',43,'img/43.jpg'),(44,'44.jpg',44,'img/44.jpg'),(45,'45.jpg',45,'img/45.jpg'),(46,'46.jpg',46,'img/46.jpg'),(47,'47.jpg',47,'img/47.jpg'),(48,'48.jpg',48,'img/48.jpg'),(49,'49.jpg',49,'img/49.jpg'),(50,'50.jpg',50,'img/50.jpg'),(51,'51.jpg',51,'img/51.jpg'),(52,'52.jpg',52,'img/52.jpg'),(53,'53.jpg',53,'img/53.jpg'),(54,'54.jpg',54,'img/54.jpg'),(55,'55.jpg',55,'img/55.jpg'),(56,'56.jpg',56,'img/56.jpg'),(57,'57.jpg',57,'img/57.jpg'),(58,'58.jpg',58,'img/58.jpg'),(59,'59.jpg',59,'img/59.jpg'),(60,'60.jpg',60,'img/60.jpg'),(61,'61.jpg',61,'img/61.jpg'),(62,'62.jpg',62,'img/62.jpg'),(63,'63.jpg',63,'img/63.jpg'),(64,'64.jpg',64,'img/64.jpg'),(65,'65.jpg',65,'img/65.jpg'),(66,'66.jpg',66,'img/66.jpg'),(67,'67.jpg',67,'img/67.jpg'),(68,'68.jpg',68,'img/68.jpg'),(69,'69.jpg',69,'img/69.jpg'),(70,'70.jpg',70,'img/70.jpg'),(71,'71.jpg',71,'img/71.jpg'),(72,'72.jpg',72,'img/72.jpg'),(73,'73.jpg',73,'img/73.jpg'),(74,'74.jpg',74,'img/74.jpg'),(75,'75.jpg',75,'img/75.jpg'),(76,'76.jpg',76,'img/76.jpg'),(77,'77.jpg',77,'img/77.jpg'),(78,'78.jpg',78,'img/78.jpg'),(79,'79.jpg',79,'img/79.jpg'),(80,'80.jpg',80,'img/80.jpg'),(81,'81.jpg',81,'img/81.jpg'),(82,'82.jpg',82,'img/82.jpg'),(83,'83.jpg',83,'img/83.jpg'),(84,'84.jpg',84,'img/84.jpg'),(85,'85.jpg',85,'img/85.jpg'),(86,'86.jpg',86,'img/86.jpg'),(87,'87.jpg',87,'img/87.jpg'),(88,'88.jpg',88,'img/88.jpg'),(89,'89.jpg',89,'img/89.jpg'),(90,'90.jpg',90,'img/90.jpg'),(91,'91.jpg',91,'img/91.jpg'),(92,'92.jpg',92,'img/92.jpg'),(93,'93.jpg',93,'img/93.jpg'),(94,'94.jpg',94,'img/94.jpg'),(95,'95.jpg',95,'img/95.jpg'),(96,'96.jpg',96,'img/96.jpg'),(97,'97.jpg',97,'img/97.jpg'),(98,'98.jpg',98,'img/98.jpg'),(99,'99.jpg',99,'img/99.jpg'),(100,'100.jpg',100,'img/100.jpg');

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `mobile` char(11) DEFAULT NULL,
  `isDelete` int(4) DEFAULT NULL,
  `u_birth` date DEFAULT NULL,
  `u_sex` int(1) DEFAULT NULL,
  `u_img` varchar(100) DEFAULT NULL,
  `u_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

/*Data for the table `user` */

insert  into `user`(`id`,`username`,`password`,`mobile`,`isDelete`,`u_birth`,`u_sex`,`u_img`,`u_name`) values (1,'itcast','123456','15102324243',0,NULL,NULL,NULL,NULL),(2,'13258298208','4QrcOUm6Wau+VuBX8g+IPg==','13258298208',1,'1997-05-14',1,'img/photo/file-1573630924654.jpg','龙宝宝'),(4,'15651133381','ghRO/2tCttkTl9IcGMHNOg==','15651133381',1,NULL,NULL,NULL,NULL),(5,'15651130909','4QrcOUm6Wau+VuBX8g+IPg==','15651130909',1,NULL,NULL,NULL,NULL),(6,'15651130303','4QrcOUm6Wau+VuBX8g+IPg==','15651130303',1,NULL,NULL,NULL,NULL),(10,'15555668899','4QrcOUm6Wau+VuBX8g+IPg==','15555668899',1,NULL,NULL,NULL,NULL),(11,'13258298200','4QrcOUm6Wau+VuBX8g+IPg==','13258298200',1,NULL,NULL,NULL,NULL),(12,'13281021716','4QrcOUm6Wau+VuBX8g+IPg==','13281021716',1,NULL,NULL,NULL,NULL),(14,'15680662952','4QrcOUm6Wau+VuBX8g+IPg==','15680662952',1,NULL,NULL,NULL,NULL);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
