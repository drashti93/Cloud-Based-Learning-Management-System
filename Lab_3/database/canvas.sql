CREATE DATABASE  IF NOT EXISTS `canvas_lab1` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `canvas_lab1`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: canvas_lab1
-- ------------------------------------------------------
-- Server version	5.7.19-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `announcements`
--

DROP TABLE IF EXISTS `announcements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `announcements` (
  `idannouncements` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `course_id` int(11) DEFAULT NULL,
  `announcement_title` varchar(60) DEFAULT NULL,
  `announcement_details` varchar(150) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  PRIMARY KEY (`idannouncements`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `announcements`
--

LOCK TABLES `announcements` WRITE;
/*!40000 ALTER TABLE `announcements` DISABLE KEYS */;
INSERT INTO `announcements` VALUES (1,125,202,'Lorem Ipsum','Lorem Ipsum',NULL),(2,125,202,'Lorem Ipsum Ipsum','Lorem Ipsum Ipsum',NULL),(3,125,202,'Lorem Ipsum Ipsum Ipsum','Lorem Ipsum Ipsum Ipsum',NULL);
/*!40000 ALTER TABLE `announcements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `assignments`
--

DROP TABLE IF EXISTS `assignments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `assignments` (
  `assignment_id` int(11) NOT NULL,
  `course_id` int(11) DEFAULT NULL,
  `assignment_name` varchar(45) DEFAULT NULL,
  `assignment_desc` varchar(45) DEFAULT NULL,
  `assignment_dept` varchar(45) DEFAULT NULL,
  `assignment_file` varchar(45) DEFAULT NULL,
  `due` datetime DEFAULT NULL,
  PRIMARY KEY (`assignment_id`),
  KEY `assignments_ibfk_1` (`course_id`),
  CONSTRAINT `assignments_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assignments`
--

LOCK TABLES `assignments` WRITE;
/*!40000 ALTER TABLE `assignments` DISABLE KEYS */;
INSERT INTO `assignments` VALUES (1,202,'Do this homework for Machine Learning','description','comp engg','/sample path','2019-05-23 00:00:00');
/*!40000 ALTER TABLE `assignments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `courses` (
  `course_id` int(11) NOT NULL,
  `course_name` varchar(45) NOT NULL,
  `course_description` varchar(45) DEFAULT NULL,
  `course_department` varchar(50) DEFAULT NULL,
  `student_capacity` int(11) DEFAULT NULL,
  `waitlist_capacity` int(11) DEFAULT NULL,
  `room_number` varchar(20) DEFAULT NULL,
  `course_term` varchar(45) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `user_name` varchar(45) DEFAULT NULL,
  `enrollment_count` int(11) DEFAULT NULL,
  PRIMARY KEY (`course_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` VALUES (202,'Software Design','Software Design','30',50,10,'Engg 337','',NULL,NULL,NULL),(205,'Test Course','Test Course','Engineering',40,10,'337','Spring 2019',12345678,'undefined',NULL),(207,'New Course','New Course','Engineering',2,1,'400','Spring 2019',12345678,'',1),(213,'dgadf','sadSDSA','saDASd',23,2,'ADAds','dsfdaf',12345678,'Shim',NULL),(272,'Software Overview','Software Overview','30',50,10,'Engg 189','',NULL,NULL,NULL),(274,'Big Data','Big Data','Engineering',30,10,'BBC 204','Spring 2019',12345678,'Shim',NULL),(281,'Cloud Techniques','Cloud Techniques','30',50,10,'Engg 337','',NULL,NULL,NULL);
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `files`
--

DROP TABLE IF EXISTS `files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `files` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `course_id` int(11) DEFAULT NULL,
  `file_name` varchar(500) DEFAULT NULL,
  `location` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `files`
--

LOCK TABLES `files` WRITE;
/*!40000 ALTER TABLE `files` DISABLE KEYS */;
INSERT INTO `files` VALUES (1,202,'test.pdf','Downloads/Blah'),(2,202,'Sample File 2','Downloads/Blah');
/*!40000 ALTER TABLE `files` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quizzes`
--

DROP TABLE IF EXISTS `quizzes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `quizzes` (
  `quiz_id` int(11) NOT NULL AUTO_INCREMENT,
  `quiz_title` varchar(45) DEFAULT NULL,
  `quiz_due` datetime DEFAULT NULL,
  `quiz_instructions` varchar(500) DEFAULT NULL,
  `quiz_type` varchar(45) DEFAULT NULL,
  `course_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`quiz_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quizzes`
--

LOCK TABLES `quizzes` WRITE;
/*!40000 ALTER TABLE `quizzes` DISABLE KEYS */;
INSERT INTO `quizzes` VALUES (1,'Quiz 1',NULL,'Quiz 1 details','Graded',202),(2,'Quiz 3',NULL,'Quiz 1 details','Graded',202),(3,'Quiz 2',NULL,'Quiz 2 details','Graded',202);
/*!40000 ALTER TABLE `quizzes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('DV5_DCZmII8kqnXJBDuhV1y4o99pLZe8',1557817303,'{\"cookie\":{\"originalMaxAge\":5184000000,\"expires\":\"2019-05-14T03:50:59.217Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":\"0987\",\"isStudent\":\"on\"}'),('HFg4cVuYl9VhU3u849BpCBOewsfXoHcY',1557788727,'{\"cookie\":{\"originalMaxAge\":5184000000,\"expires\":\"2019-05-13T23:04:40.461Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":\"12345678\",\"isStudent\":\"off\"}'),('I6Oabkbjia0kXeE2X6Wztg5By0ZFcc-h',1557788653,'{\"cookie\":{\"originalMaxAge\":5184000000,\"expires\":\"2019-05-13T22:37:36.428Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":\"0987\",\"isStudent\":\"on\"}'),('OZc17Ba-LiC9Tpa9tGIVyuqQ4QVEb0K_',1557794082,'{\"cookie\":{\"originalMaxAge\":5184000000,\"expires\":\"2019-05-13T23:05:46.607Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":\"0987\",\"isStudent\":\"on\"}'),('ZOaGlduJJH2GtC9qE6aDWpQk_X9pSuq4',1557901962,'{\"cookie\":{\"originalMaxAge\":5184000000,\"expires\":\"2019-05-14T22:27:18.165Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":\"0987\",\"isStudent\":\"on\"}'),('sLcC0lO9VKJyll_5S8xUKYqcg4lPV7DH',1557786981,'{\"cookie\":{\"originalMaxAge\":5184000000,\"expires\":\"2019-05-13T08:09:28.728Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":\"0987\",\"isStudent\":\"on\"}');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `submission`
--

DROP TABLE IF EXISTS `submission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `submission` (
  `submission_id` int(11) NOT NULL,
  `assignment_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `isSubmitted` tinyint(4) DEFAULT NULL,
  `grade` int(11) DEFAULT NULL,
  `from_grade` int(11) DEFAULT NULL,
  PRIMARY KEY (`submission_id`),
  KEY `assignment_id` (`assignment_id`),
  CONSTRAINT `submission_ibfk_1` FOREIGN KEY (`assignment_id`) REFERENCES `assignments` (`assignment_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `submission`
--

LOCK TABLES `submission` WRITE;
/*!40000 ALTER TABLE `submission` DISABLE KEYS */;
INSERT INTO `submission` VALUES (1,1,12345,0,8,10);
/*!40000 ALTER TABLE `submission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_course`
--

DROP TABLE IF EXISTS `user_course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_course` (
  `s_c_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `course_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`s_c_id`),
  KEY `user_id_idx` (`user_id`),
  KEY `course_id_idx` (`course_id`),
  CONSTRAINT `course_id` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_course`
--

LOCK TABLES `user_course` WRITE;
/*!40000 ALTER TABLE `user_course` DISABLE KEYS */;
INSERT INTO `user_course` VALUES (25,12345678,274),(26,12345678,205),(27,987,202),(28,987,205),(30,987,202),(31,987,202),(32,987,202),(33,987,202),(34,987,202),(35,987,202),(36,987,202),(37,987,202),(38,987,202),(39,987,202),(40,987,202),(41,987,202),(42,987,202),(43,987,202),(44,12345678,207),(48,987,207);
/*!40000 ALTER TABLE `user_course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(200) NOT NULL,
  `profile_img` varchar(45) DEFAULT NULL,
  `phone_number` int(11) DEFAULT NULL,
  `about_me` varchar(150) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `country` varchar(45) DEFAULT NULL,
  `company` varchar(45) DEFAULT NULL,
  `school` varchar(45) DEFAULT NULL,
  `hometown` varchar(45) DEFAULT NULL,
  `languages` varchar(45) DEFAULT NULL,
  `gender` varchar(45) DEFAULT NULL,
  `isStudent` varchar(10) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'aa','a@a.com','$2a$10$gbmKft52WQGWgOjC0p8ELOmzReb7xxuFn0DvGMd5gtl3R/AkI3SVy',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'off'),(2,'1','a@a.com','$2a$10$wKPcirx7wnaaa7Gu.OQD/eFKdqZpxxvKUIvVgbDQb0YlJ137Do.Xi',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'off'),(123,'aa','amano','$2a$10$xQ.P6nGIfZyG2I1xAG6WvesWC7Q9MJsqhpMPH/FTFZxo1JR5RxPNK',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'off'),(125,'Drusti','dra','12345',NULL,113,'asdas','asdda','asdsada','asdasd','adasd','asddas','adsdasd','M','on'),(789,'undefined','r.greene@gmail.com','$2a$10$Kwn5ffa1NLRu5f53nHh7Geqo0WmB.FioiFK.WOCA77OmLVhYht6s6',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'undefined'),(987,'Drusti Thakkar','d.thakkar@gmail.com','$2a$10$dOeORGeWvNxFwOU1j5nIEunhxz/fjiQPFKV/zh0zanC/cfqfaRlEi',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'on'),(1234,'qq','amano','$2a$10$/Y90qjH21avqAfRbf80Hzu2b1FNFGcQCL4SmytSZBO1a0xKuffR5m',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'off'),(12345,'qq','amano','$2a$10$/.oV2nMsM8P.r9qYu.3Wn.62nn7/l0VNR3xZfHAEj7m1xygcp/hJK',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'on'),(12345678,'Drusti','d.thakkar@sjsu.edu','$2a$10$dsiTz8IdMsuMkxsGjYatPeAJrR/qNdi/YPaPf2/edLDySWvwgmeMS',NULL,1234567890,'Teacher','San Jose','US','SJSU','SJSU','New York','null','null','off');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `waitlist`
--

DROP TABLE IF EXISTS `waitlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `waitlist` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `course_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `permission_code` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `waitlist`
--

LOCK TABLES `waitlist` WRITE;
/*!40000 ALTER TABLE `waitlist` DISABLE KEYS */;
INSERT INTO `waitlist` VALUES (1,272,987,NULL),(2,213,987,NULL);
/*!40000 ALTER TABLE `waitlist` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
-- Dump completed on 2019-03-15  0:54:59
