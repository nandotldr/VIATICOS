-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: viaticos
-- ------------------------------------------------------
-- Server version	8.0.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `agenda`
--

DROP TABLE IF EXISTS `agenda`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `agenda` (
  `id` int NOT NULL AUTO_INCREMENT,
  `dia` date DEFAULT NULL,
  `hora_inicio` time(3) DEFAULT NULL,
  `hora_fin` time(3) DEFAULT NULL,
  `actividad` tinytext,
  `id_informe_actividades` int NOT NULL,
  PRIMARY KEY (`id`,`id_informe_actividades`),
  KEY `fk_agenda_informe_actividades1_idx` (`id_informe_actividades`),
  CONSTRAINT `fk_agenda_informe_actividades1` FOREIGN KEY (`id_informe_actividades`) REFERENCES `informe_actividades` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `area_adscripcion`
--

DROP TABLE IF EXISTS `area_adscripcion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `area_adscripcion` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `continente`
--

DROP TABLE IF EXISTS `continente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `continente` (
  `id` int NOT NULL,
  `nombre` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `estado`
--

DROP TABLE IF EXISTS `estado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estado` (
  `id` int NOT NULL,
  `nombre` varchar(40) NOT NULL COMMENT 'NOM_ENT - Nombre de la entidad'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='Estados de la República Mexicana';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `factura`
--

DROP TABLE IF EXISTS `factura`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `factura` (
  `id` int NOT NULL AUTO_INCREMENT,
  `archivo_url` varchar(45) DEFAULT NULL,
  `id_informe_actividades` int NOT NULL,
  PRIMARY KEY (`id`,`id_informe_actividades`),
  KEY `fk_factura_informe_actividades1_idx` (`id_informe_actividades`),
  CONSTRAINT `fk_factura_informe_actividades1` FOREIGN KEY (`id_informe_actividades`) REFERENCES `informe_actividades` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `gasto`
--

DROP TABLE IF EXISTS `gasto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gasto` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_solicitud_viatico` int NOT NULL,
  `dia` date NOT NULL,
  `rubro` varchar(45) NOT NULL,
  `cantidad` decimal(10,0) NOT NULL,
  `proyecto` varchar(45) NOT NULL,
  `estatus` int NOT NULL,
  `fecha_aceptado` date DEFAULT NULL,
  `nombre_aceptado` varchar(45) DEFAULT NULL,
  `fecha_revisado` date DEFAULT NULL,
  `nombre_revisado` varchar(45) DEFAULT NULL,
  `comentario_rechazo` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`,`id_solicitud_viatico`),
  KEY `fk_gastos_solicitud_viatico1_idx` (`id_solicitud_viatico`),
  CONSTRAINT `fk_gastos_solicitud_viatico1` FOREIGN KEY (`id_solicitud_viatico`) REFERENCES `solicitud_viatico` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `informe_actividades`
--

DROP TABLE IF EXISTS `informe_actividades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `informe_actividades` (
  `id` int NOT NULL AUTO_INCREMENT,
  `resultados` text,
  `observaciones` tinytext,
  `fecha_elaboracion` datetime DEFAULT NULL,
  `fecha_aprobacion` datetime DEFAULT NULL,
  `nombre_aprobacion` varchar(45) DEFAULT NULL,
  `id_usuario` int NOT NULL,
  `id_solicitud_comision` int NOT NULL,
  `status` int NOT NULL,
  `fecha_revisado` datetime DEFAULT NULL,
  `nombre_revisado` varchar(45) DEFAULT NULL,
  `constancia` tinytext,
  `comentario_rechazo` text,
  PRIMARY KEY (`id`,`id_usuario`,`id_solicitud_comision`),
  KEY `fk_informe_actividades_usuario1_idx` (`id_usuario`),
  KEY `fk_informe_actividades_solicitud_comision1_idx` (`id_solicitud_comision`),
  CONSTRAINT `fk_informe_actividades_solicitud_comision1` FOREIGN KEY (`id_solicitud_comision`) REFERENCES `solicitud_comision` (`id`),
  CONSTRAINT `fk_informe_actividades_usuario1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`codigo`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `itinerario`
--

DROP TABLE IF EXISTS `itinerario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `itinerario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `dia` datetime DEFAULT NULL,
  `origen` varchar(45) DEFAULT NULL,
  `destino` varchar(45) DEFAULT NULL,
  `id_informe_actividades` int NOT NULL,
  PRIMARY KEY (`id`,`id_informe_actividades`),
  KEY `fk_itinerario_informe_actividades1_idx` (`id_informe_actividades`),
  CONSTRAINT `fk_itinerario_informe_actividades1` FOREIGN KEY (`id_informe_actividades`) REFERENCES `informe_actividades` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `municipio`
--

DROP TABLE IF EXISTS `municipio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `municipio` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_estado` int DEFAULT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `zona` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2464 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pais`
--

DROP TABLE IF EXISTS `pais`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pais` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `id_continente` int DEFAULT NULL,
  `zona` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=184 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `programa_trabajo`
--

DROP TABLE IF EXISTS `programa_trabajo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `programa_trabajo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `dia` datetime DEFAULT NULL,
  `lugar_estancia` varchar(45) DEFAULT NULL,
  `tareas_realizar` text,
  `id_solicitud_comision` int NOT NULL,
  PRIMARY KEY (`id`,`id_solicitud_comision`),
  KEY `fk_programa_trabajo_solicitud_comision1_idx` (`id_solicitud_comision`),
  CONSTRAINT `fk_programa_trabajo_solicitud_comision1` FOREIGN KEY (`id_solicitud_comision`) REFERENCES `solicitud_comision` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `solicitud_comision`
--

DROP TABLE IF EXISTS `solicitud_comision`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `solicitud_comision` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fecha_solicitud` datetime DEFAULT NULL,
  `fecha_inicio` date DEFAULT NULL,
  `fecha_fin` date DEFAULT NULL,
  `tipo_comision` int NOT NULL,
  `id_pais` int DEFAULT NULL,
  `id_municipio` int DEFAULT NULL,
  `id_usuario` int NOT NULL,
  `justificacion` text,
  `status` int NOT NULL,
  `objetivo_trabajo` tinytext,
  `area_adscripcion` varchar(45) DEFAULT NULL,
  `nombre_comision` varchar(45) DEFAULT NULL,
  `comentario_rechazo` tinytext,
  `fecha_revisado` datetime DEFAULT NULL,
  `fecha_aceptado` datetime DEFAULT NULL,
  `nombre_revisado` varchar(45) DEFAULT NULL,
  `nombre_aceptado` varchar(45) DEFAULT NULL,
  `programa_evento` tinytext,
  `invitacion_evento` tinytext,
  `fecha_creacion` datetime NOT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  PRIMARY KEY (`id`,`id_usuario`),
  KEY `fk_solicitud_comision_pais_idx` (`id_pais`),
  KEY `fk_solicitud_comision_municipio1_idx` (`id_municipio`),
  KEY `fk_solicitud_comision_usuario1_idx` (`id_usuario`),
  CONSTRAINT `fk_solicitud_comision_municipio1` FOREIGN KEY (`id_municipio`) REFERENCES `municipio` (`id`),
  CONSTRAINT `fk_solicitud_comision_pais` FOREIGN KEY (`id_pais`) REFERENCES `pais` (`id`),
  CONSTRAINT `fk_solicitud_comision_usuario1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`codigo`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `solicitud_viatico`
--

DROP TABLE IF EXISTS `solicitud_viatico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `solicitud_viatico` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_solicitud_comision` int NOT NULL,
  `invitado_nombre` varchar(45) DEFAULT NULL,
  `fecha_solicitud` datetime DEFAULT NULL,
  `comentarios` varchar(45) DEFAULT NULL,
  `status` int NOT NULL,
  `comentario_rechazo` tinytext,
  `fecha_revisado` datetime DEFAULT NULL,
  `nombre_revisado` varchar(45) DEFAULT NULL,
  `fecha_aceptado` datetime DEFAULT NULL,
  `nombre_aceptado` varchar(45) DEFAULT NULL,
  `fecha_creacion` datetime NOT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  `id_usuario` int NOT NULL,
  PRIMARY KEY (`id`,`id_solicitud_comision`,`id_usuario`),
  KEY `fk_solicitud_viatico_solicitud_comision1_idx` (`id_solicitud_comision`),
  KEY `fk_solicitud_viatico_usuario1_idx` (`id_usuario`),
  CONSTRAINT `fk_solicitud_viatico_solicitud_comision1` FOREIGN KEY (`id_solicitud_comision`) REFERENCES `solicitud_comision` (`id`),
  CONSTRAINT `fk_solicitud_viatico_usuario1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`codigo`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `codigo` int NOT NULL,
  `nombres` varchar(45) NOT NULL,
  `apellidos` varchar(45) NOT NULL,
  `tipo_usuario` varchar(2) NOT NULL,
  `nip` varchar(200) NOT NULL,
  `area_adscripcion` varchar(45) NOT NULL,
  `plaza_laboral` varchar(45) NOT NULL,
  `fecha_creacion` datetime NOT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  `numero_social` varchar(45) NOT NULL,
  `area_adcripcion_revisa` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `viatico_proyecto`
--

DROP TABLE IF EXISTS `viatico_proyecto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `viatico_proyecto` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fecha_solicitud` datetime NOT NULL,
  `numero_proyecto` varchar(45) NOT NULL,
  `cantidad` decimal(10,2) DEFAULT NULL,
  `id_solicitud_viatico` int NOT NULL,
  `fecha_aceptado` datetime DEFAULT NULL,
  `nombre_aceptado` varchar(45) DEFAULT NULL,
  `status` int NOT NULL,
  PRIMARY KEY (`id`,`id_solicitud_viatico`),
  KEY `fk_proyecto_solicitud_viatico1_idx` (`id_solicitud_viatico`),
  CONSTRAINT `fk_proyecto_solicitud_viatico1` FOREIGN KEY (`id_solicitud_viatico`) REFERENCES `solicitud_viatico` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-04-02 15:46:58
