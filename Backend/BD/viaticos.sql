-- MySQL dump 10.13  Distrib 8.0.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: viaticos
-- ------------------------------------------------------
-- Server version	8.0.17

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
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dia` date DEFAULT NULL,
  `hora_inicio` time(3) DEFAULT NULL,
  `hora_fin` time(3) DEFAULT NULL,
  `actividad` tinytext,
  `id_informe_actividades` int(11) NOT NULL,
  PRIMARY KEY (`id`,`id_informe_actividades`),
  KEY `fk_agenda_informe_actividades1_idx` (`id_informe_actividades`),
  CONSTRAINT `fk_agenda_informe_actividades1` FOREIGN KEY (`id_informe_actividades`) REFERENCES `informe_actividades` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agenda`
--

LOCK TABLES `agenda` WRITE;
/*!40000 ALTER TABLE `agenda` DISABLE KEYS */;
/*!40000 ALTER TABLE `agenda` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `area_adscripcion`
--

DROP TABLE IF EXISTS `area_adscripcion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `area_adscripcion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `area_adscripcion`
--

LOCK TABLES `area_adscripcion` WRITE;
/*!40000 ALTER TABLE `area_adscripcion` DISABLE KEYS */;
INSERT INTO `area_adscripcion` VALUES (1,NULL),(2,'Departamento de Fisica'),(3,'Departamento de Matematicas'),(4,'Departamento de Quimica'),(5,'Departamento de Ingenieria Civil y Topografia'),(6,'Departamento de Ingenieria Industrial'),(7,'Departamento de Ingenieria Mecanica Electrica'),(8,'Departamento de Ingenieria de Proyectos'),(9,'Departamento de Ingenieria Quimica'),(10,'Departamento de Madera Celulosa y Papel'),(11,'Departamento de Ciencias Computacionales'),(12,'Departamento de Electronica');
/*!40000 ALTER TABLE `area_adscripcion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `continente`
--

DROP TABLE IF EXISTS `continente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `continente` (
  `id` int(11) NOT NULL,
  `nombre` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `continente`
--

LOCK TABLES `continente` WRITE;
/*!40000 ALTER TABLE `continente` DISABLE KEYS */;
INSERT INTO `continente` VALUES (1,'AMERICA'),(2,'EUROPA'),(3,'OCEANIA'),(4,'AFRICA'),(5,'ASIA');
/*!40000 ALTER TABLE `continente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estado`
--

DROP TABLE IF EXISTS `estado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estado` (
  `id` int(11) NOT NULL,
  `nombre` varchar(40) NOT NULL COMMENT 'NOM_ENT - Nombre de la entidad'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='Estados de la República Mexicana';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estado`
--

LOCK TABLES `estado` WRITE;
/*!40000 ALTER TABLE `estado` DISABLE KEYS */;
INSERT INTO `estado` VALUES (1,'Aguascalientes'),(2,'Baja California'),(3,'Baja California Sur'),(4,'Campeche'),(5,'Coahuila de Zaragoza'),(6,'Colima'),(7,'Chiapas'),(8,'Chihuahua'),(9,'Ciudad de México'),(10,'Durango'),(11,'Guanajuato'),(12,'Guerrero'),(13,'Hidalgo'),(14,'Jalisco'),(15,'México'),(16,'Michoacán de Ocampo'),(17,'Morelos'),(18,'Nayarit'),(19,'Nuevo León'),(20,'Oaxaca'),(21,'Puebla'),(22,'Querétaro'),(23,'Quintana Roo'),(24,'San Luis Potosí'),(25,'Sinaloa'),(26,'Sonora'),(27,'Tabasco'),(28,'Tamaulipas'),(29,'Tlaxcala'),(30,'Veracruz de Ignacio de la Llave'),(31,'Yucatán'),(32,'Zacatecas');
/*!40000 ALTER TABLE `estado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `factura`
--

DROP TABLE IF EXISTS `factura`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `factura` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `archivo_url` varchar(45) DEFAULT NULL,
  `id_informe_actividades` int(11) NOT NULL,
  PRIMARY KEY (`id`,`id_informe_actividades`),
  KEY `fk_factura_informe_actividades1_idx` (`id_informe_actividades`),
  CONSTRAINT `fk_factura_informe_actividades1` FOREIGN KEY (`id_informe_actividades`) REFERENCES `informe_actividades` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `factura`
--

LOCK TABLES `factura` WRITE;
/*!40000 ALTER TABLE `factura` DISABLE KEYS */;
/*!40000 ALTER TABLE `factura` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gasto`
--

DROP TABLE IF EXISTS `gasto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gasto` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dia` date DEFAULT NULL,
  `alimentacion` decimal(10,2) DEFAULT NULL,
  `hospedaje` decimal(10,2) DEFAULT NULL,
  `transporte_foraneo` decimal(10,2) DEFAULT NULL,
  `transporte_local` decimal(10,2) DEFAULT NULL,
  `combustible` decimal(10,2) DEFAULT NULL,
  `otros_conceptos` decimal(10,2) DEFAULT NULL,
  `id_solicitud_viatico` int(11) NOT NULL,
  PRIMARY KEY (`id`,`id_solicitud_viatico`),
  KEY `fk_gastos_solicitud_viatico1_idx` (`id_solicitud_viatico`),
  CONSTRAINT `fk_gastos_solicitud_viatico1` FOREIGN KEY (`id_solicitud_viatico`) REFERENCES `solicitud_viatico` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gasto`
--

LOCK TABLES `gasto` WRITE;
/*!40000 ALTER TABLE `gasto` DISABLE KEYS */;
/*!40000 ALTER TABLE `gasto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `informe_actividades`
--

DROP TABLE IF EXISTS `informe_actividades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `informe_actividades` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `resultados` text,
  `observaciones` tinytext,
  `fecha_elaboracion` datetime DEFAULT NULL,
  `fecha_aprobacion` datetime DEFAULT NULL,
  `nombre_aprobacion` varchar(45) DEFAULT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_solicitud_comision` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `fecha_revisado` datetime DEFAULT NULL,
  `nombre_revisado` varchar(45) DEFAULT NULL,
  `constancia` tinytext,
  `comentario_rechazo` text,
  PRIMARY KEY (`id`,`id_usuario`,`id_solicitud_comision`),
  KEY `fk_informe_actividades_usuario1_idx` (`id_usuario`),
  KEY `fk_informe_actividades_solicitud_comision1_idx` (`id_solicitud_comision`),
  CONSTRAINT `fk_informe_actividades_solicitud_comision1` FOREIGN KEY (`id_solicitud_comision`) REFERENCES `solicitud_comision` (`id`),
  CONSTRAINT `fk_informe_actividades_usuario1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`codigo`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `informe_actividades`
--

LOCK TABLES `informe_actividades` WRITE;
/*!40000 ALTER TABLE `informe_actividades` DISABLE KEYS */;
/*!40000 ALTER TABLE `informe_actividades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `itinerario`
--

DROP TABLE IF EXISTS `itinerario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `itinerario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dia` datetime DEFAULT NULL,
  `origen` varchar(45) DEFAULT NULL,
  `destino` varchar(45) DEFAULT NULL,
  `id_informe_actividades` int(11) NOT NULL,
  PRIMARY KEY (`id`,`id_informe_actividades`),
  KEY `fk_itinerario_informe_actividades1_idx` (`id_informe_actividades`),
  CONSTRAINT `fk_itinerario_informe_actividades1` FOREIGN KEY (`id_informe_actividades`) REFERENCES `informe_actividades` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `itinerario`
--

LOCK TABLES `itinerario` WRITE;
/*!40000 ALTER TABLE `itinerario` DISABLE KEYS */;
/*!40000 ALTER TABLE `itinerario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `municipio`
--

DROP TABLE IF EXISTS `municipio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `municipio` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_estado` int(11) DEFAULT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `zona` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2464 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `municipio`
--

LOCK TABLES `municipio` WRITE;
/*!40000 ALTER TABLE `municipio` DISABLE KEYS */;
INSERT INTO `municipio` VALUES (1,1,'Aguascalientes',2),(2,1,'Asientos',2),(3,1,'Calvillo',2),(4,1,'Cosío',2),(5,1,'Jesús María',2),(6,1,'Pabellón de Arteaga',2),(7,1,'Rincón de Romos',2),(8,1,'San José de Gracia',2),(9,1,'Tepezalá',2),(10,1,'El Llano',2),(11,1,'San Francisco de los Romo',2),(12,2,'Ensenada',4),(13,2,'Mexicali',4),(14,2,'Tecate',4),(15,2,'Tijuana',4),(16,2,'Playas de Rosarito',4),(17,3,'Comondú',3),(18,3,'Mulegé',4),(19,3,'La Paz',3),(20,3,'Los Cabos',4),(21,3,'Loreto',4),(22,4,'Calkiní',2),(23,4,'Campeche',2),(24,4,'Carmen',3),(25,4,'Champotón',2),(26,4,'Hecelchakán',2),(27,4,'Hopelchén',2),(28,4,'Palizada',2),(29,4,'Tenabo',2),(30,4,'Escárcega',2),(31,4,'Calakmul',2),(32,4,'Candelaria',2),(33,5,'Abasolo',2),(34,5,'Acuña',3),(35,5,'Allende',2),(36,5,'Arteaga',2),(37,5,'Candela',2),(38,5,'Castaños',2),(39,5,'Cuatro Ciénegas',2),(40,5,'Escobedo',2),(41,5,'Francisco I. Madero',2),(42,5,'Frontera',2),(43,5,'General Cepeda',2),(44,5,'Guerrero',2),(45,5,'Hidalgo',2),(46,5,'Jiménez',2),(47,5,'Juárez',2),(48,5,'Lamadrid',2),(49,5,'Matamoros',2),(50,5,'Monclova',2),(51,5,'Morelos',2),(52,5,'Múzquiz',2),(53,5,'Nadadores',2),(54,5,'Nava',2),(55,5,'Ocampo',2),(56,5,'Parras',2),(57,5,'Piedras Negras',3),(58,5,'Progreso',2),(59,5,'Ramos Arizpe',2),(60,5,'Sabinas',2),(61,5,'Sacramento',2),(62,5,'Saltillo',4),(63,5,'San Buenaventura',2),(64,5,'San Juan de Sabinas',2),(65,5,'San Pedro',2),(66,5,'Sierra Mojada',2),(67,5,'Torreón',2),(68,5,'Viesca',2),(69,5,'Villa Unión',2),(70,5,'Zaragoza',2),(71,6,'Armería',1),(72,6,'Colima',1),(73,6,'Comala',1),(74,6,'Coquimatlán',1),(75,6,'Cuauhtémoc',1),(76,6,'Ixtlahuacán',1),(77,6,'Manzanillo',4),(78,6,'Minatitlán',1),(79,6,'Tecomán',1),(80,6,'Villa de Álvarez',1),(81,7,'Acacoyagua',2),(82,7,'Acala',2),(83,7,'Acapetahua',2),(84,7,'Altamirano',2),(85,7,'Amatán',2),(86,7,'Amatenango de la Frontera',2),(87,7,'Amatenango del Valle',2),(88,7,'Angel Albino Corzo',2),(89,7,'Arriaga',2),(90,7,'Bejucal de Ocampo',2),(91,7,'Bella Vista',2),(92,7,'Berriozábal',2),(93,7,'Bochil',2),(94,7,'El Bosque',2),(95,7,'Cacahoatán',2),(96,7,'Catazajá',2),(97,7,'Cintalapa',2),(98,7,'Coapilla',2),(99,7,'Comitán de Domínguez',2),(100,7,'La Concordia',2),(101,7,'Copainalá',2),(102,7,'Chalchihuitán',2),(103,7,'Chamula',2),(104,7,'Chanal',2),(105,7,'Chapultenango',2),(106,7,'Chenalhó',2),(107,7,'Chiapa de Corzo',2),(108,7,'Chiapilla',2),(109,7,'Chicoasén',2),(110,7,'Chicomuselo',2),(111,7,'Chilón',2),(112,7,'Escuintla',2),(113,7,'Francisco León',2),(114,7,'Frontera Comalapa',2),(115,7,'Frontera Hidalgo',2),(116,7,'La Grandeza',2),(117,7,'Huehuetán',2),(118,7,'Huixtán',2),(119,7,'Huitiupán',2),(120,7,'Huixtla',2),(121,7,'La Independencia',2),(122,7,'Ixhuatán',2),(123,7,'Ixtacomitán',2),(124,7,'Ixtapa',2),(125,7,'Ixtapangajoya',2),(126,7,'Jiquipilas',2),(127,7,'Jitotol',2),(128,7,'Juárez',2),(129,7,'Larráinzar',2),(130,7,'La Libertad',2),(131,7,'Mapastepec',2),(132,7,'Las Margaritas',2),(133,7,'Mazapa de Madero',2),(134,7,'Mazatán',2),(135,7,'Metapa',2),(136,7,'Mitontic',2),(137,7,'Motozintla',2),(138,7,'Nicolás Ruíz',2),(139,7,'Ocosingo',2),(140,7,'Ocotepec',2),(141,7,'Ocozocoautla de Espinosa',2),(142,7,'Ostuacán',2),(143,7,'Osumacinta',2),(144,7,'Oxchuc',2),(145,7,'Palenque',2),(146,7,'Pantelhó',2),(147,7,'Pantepec',2),(148,7,'Pichucalco',2),(149,7,'Pijijiapan',2),(150,7,'El Porvenir',2),(151,7,'Villa Comaltitlán',2),(152,7,'Pueblo Nuevo Solistahuacán',2),(153,7,'Rayón',2),(154,7,'Reforma',2),(155,7,'Las Rosas',2),(156,7,'Sabanilla',2),(157,7,'Salto de Agua',2),(158,7,'San Cristóbal de las Casas',2),(159,7,'San Fernando',2),(160,7,'Siltepec',2),(161,7,'Simojovel',2),(162,7,'Sitalá',2),(163,7,'Socoltenango',2),(164,7,'Solosuchiapa',2),(165,7,'Soyaló',2),(166,7,'Suchiapa',2),(167,7,'Suchiate',2),(168,7,'Sunuapa',2),(169,7,'Tapachula',4),(170,7,'Tapalapa',2),(171,7,'Tapilula',2),(172,7,'Tecpatán',2),(173,7,'Tenejapa',2),(174,7,'Teopisca',2),(175,7,'Tila',2),(176,7,'Tonalá',2),(177,7,'Totolapa',2),(178,7,'La Trinitaria',2),(179,7,'Tumbalá',2),(180,7,'Tuxtla Gutiérrez',3),(181,7,'Tuxtla Chico',2),(182,7,'Tuzantán',2),(183,7,'Tzimol',2),(184,7,'Unión Juárez',2),(185,7,'Venustiano Carranza',2),(186,7,'Villa Corzo',2),(187,7,'Villaflores',2),(188,7,'Yajalón',2),(189,7,'San Lucas',2),(190,7,'Zinacantán',2),(191,7,'San Juan Cancuc',2),(192,7,'Aldama',2),(193,7,'Benemérito de las Américas',2),(194,7,'Maravilla Tenejapa',2),(195,7,'Marqués de Comillas',2),(196,7,'Montecristo de Guerrero',2),(197,7,'San Andrés Duraznal',2),(198,7,'Santiago el Pinar',2),(199,7,'Capitán Luis Ángel Vidal',2),(200,7,'Rincón Chamula San Pedro',2),(201,7,'El Parral',2),(202,7,'Emiliano Zapata',2),(203,7,'Mezcalapa',2),(204,8,'Ahumada',2),(205,8,'Aldama',2),(206,8,'Allende',2),(207,8,'Aquiles Serdán',2),(208,8,'Ascensión',2),(209,8,'Bachíniva',2),(210,8,'Balleza',2),(211,8,'Batopilas de Manuel Gómez Morín',2),(212,8,'Bocoyna',2),(213,8,'Buenaventura',2),(214,8,'Camargo',2),(215,8,'Carichí',2),(216,8,'Casas Grandes',2),(217,8,'Coronado',2),(218,8,'Coyame del Sotol',2),(219,8,'La Cruz',2),(220,8,'Cuauhtémoc',2),(221,8,'Cusihuiriachi',2),(222,8,'Chihuahua',2),(223,8,'Chínipas',2),(224,8,'Delicias',2),(225,8,'Dr. Belisario Domínguez',2),(226,8,'Galeana',2),(227,8,'Santa Isabel',2),(228,8,'Gómez Farías',2),(229,8,'Gran Morelos',2),(230,8,'Guachochi',2),(231,8,'Guadalupe',2),(232,8,'Guadalupe y Calvo',2),(233,8,'Guazapares',2),(234,8,'Guerrero',2),(235,8,'Hidalgo del Parral',2),(236,8,'Huejotitán',2),(237,8,'Ignacio Zaragoza',2),(238,8,'Janos',2),(239,8,'Jiménez',2),(240,8,'Juárez',4),(241,8,'Julimes',2),(242,8,'López',2),(243,8,'Madera',2),(244,8,'Maguarichi',2),(245,8,'Manuel Benavides',2),(246,8,'Matachí',2),(247,8,'Matamoros',2),(248,8,'Meoqui',2),(249,8,'Morelos',2),(250,8,'Moris',2),(251,8,'Namiquipa',2),(252,8,'Nonoava',2),(253,8,'Nuevo Casas Grandes',2),(254,8,'Ocampo',2),(255,8,'Ojinaga',2),(256,8,'Praxedis G. Guerrero',2),(257,8,'Riva Palacio',2),(258,8,'Rosales',2),(259,8,'Rosario',2),(260,8,'San Francisco de Borja',2),(261,8,'San Francisco de Conchos',2),(262,8,'San Francisco del Oro',2),(263,8,'Santa Bárbara',2),(264,8,'Satevó',2),(265,8,'Saucillo',2),(266,8,'Temósachic',2),(267,8,'El Tule',2),(268,8,'Urique',2),(269,8,'Uruachi',2),(270,8,'Valle de Zaragoza',2),(271,9,'Azcapotzalco',3),(272,9,'Coyoacán',3),(273,9,'Cuajimalpa de Morelos',3),(274,9,'Gustavo A. Madero',3),(275,9,'Iztacalco',3),(276,9,'Iztapalapa',3),(277,9,'La Magdalena Contreras',3),(278,9,'Milpa Alta',3),(279,9,'Álvaro Obregón',3),(280,9,'Tláhuac',3),(281,9,'Tlalpan',3),(282,9,'Xochimilco',3),(283,9,'Benito Juárez',3),(284,9,'Cuauhtémoc',3),(285,9,'Miguel Hidalgo',3),(286,9,'Venustiano Carranza',3),(287,10,'Canatlán',2),(288,10,'Canelas',2),(289,10,'Coneto de Comonfort',2),(290,10,'Cuencamé',2),(291,10,'Durango',2),(292,10,'General Simón Bolívar',2),(293,10,'Gómez Palacio',2),(294,10,'Guadalupe Victoria',2),(295,10,'Guanaceví',2),(296,10,'Hidalgo',2),(297,10,'Indé',2),(298,10,'Lerdo',2),(299,10,'Mapimí',2),(300,10,'Mezquital',2),(301,10,'Nazas',2),(302,10,'Nombre de Dios',2),(303,10,'Ocampo',2),(304,10,'El Oro',2),(305,10,'Otáez',2),(306,10,'Pánuco de Coronado',2),(307,10,'Peñón Blanco',2),(308,10,'Poanas',2),(309,10,'Pueblo Nuevo',2),(310,10,'Rodeo',2),(311,10,'San Bernardo',2),(312,10,'San Dimas',2),(313,10,'San Juan de Guadalupe',2),(314,10,'San Juan del Río',2),(315,10,'San Luis del Cordero',2),(316,10,'San Pedro del Gallo',2),(317,10,'Santa Clara',2),(318,10,'Santiago Papasquiaro',2),(319,10,'Súchil',2),(320,10,'Tamazula',2),(321,10,'Tepehuanes',2),(322,10,'Tlahualilo',2),(323,10,'Topia',2),(324,10,'Vicente Guerrero',2),(325,10,'Nuevo Ideal',2),(326,11,'Abasolo',2),(327,11,'Acámbaro',2),(328,11,'San Miguel de Allende',3),(329,11,'Apaseo el Alto',2),(330,11,'Apaseo el Grande',2),(331,11,'Atarjea',2),(332,11,'Celaya',2),(333,11,'Manuel Doblado',2),(334,11,'Comonfort',2),(335,11,'Coroneo',2),(336,11,'Cortazar',2),(337,11,'Cuerámaro',2),(338,11,'Doctor Mora',2),(339,11,'Dolores Hidalgo Cuna de la Independencia Nacional',2),(340,11,'Guanajuato',3),(341,11,'Huanímaro',2),(342,11,'Irapuato',2),(343,11,'Jaral del Progreso',2),(344,11,'Jerécuaro',2),(345,11,'León',3),(346,11,'Moroleón',2),(347,11,'Ocampo',2),(348,11,'Pénjamo',2),(349,11,'Pueblo Nuevo',2),(350,11,'Purísima del Rincón',2),(351,11,'Romita',2),(352,11,'Salamanca',2),(353,11,'Salvatierra',2),(354,11,'San Diego de la Unión',2),(355,11,'San Felipe',2),(356,11,'San Francisco del Rincón',2),(357,11,'San José Iturbide',2),(358,11,'San Luis de la Paz',2),(359,11,'Santa Catarina',2),(360,11,'Santa Cruz de Juventino Rosas',2),(361,11,'Santiago Maravatío',2),(362,11,'Silao de la Victoria',2),(363,11,'Tarandacuao',2),(364,11,'Tarimoro',2),(365,11,'Tierra Blanca',2),(366,11,'Uriangato',2),(367,11,'Valle de Santiago',2),(368,11,'Victoria',2),(369,11,'Villagrán',2),(370,11,'Xichú',2),(371,11,'Yuriria',2),(372,12,'Acapulco de Juárez',4),(373,12,'Ahuacuotzingo',1),(374,12,'Ajuchitlán del Progreso',1),(375,12,'Alcozauca de Guerrero',1),(376,12,'Alpoyeca',1),(377,12,'Apaxtla',1),(378,12,'Arcelia',1),(379,12,'Atenango del Río',1),(380,12,'Atlamajalcingo del Monte',1),(381,12,'Atlixtac',1),(382,12,'Atoyac de Álvarez',1),(383,12,'Ayutla de los Libres',1),(384,12,'Azoyú',1),(385,12,'Benito Juárez',1),(386,12,'Buenavista de Cuéllar',1),(387,12,'Coahuayutla de José María Izazaga',1),(388,12,'Cocula',1),(389,12,'Copala',1),(390,12,'Copalillo',1),(391,12,'Copanatoyac',1),(392,12,'Coyuca de Benítez',1),(393,12,'Coyuca de Catalán',1),(394,12,'Cuajinicuilapa',1),(395,12,'Cualác',1),(396,12,'Cuautepec',1),(397,12,'Cuetzala del Progreso',1),(398,12,'Cutzamala de Pinzón',1),(399,12,'Chilapa de Álvarez',1),(400,12,'Chilpancingo de los Bravo',1),(401,12,'Florencio Villarreal',1),(402,12,'General Canuto A. Neri',1),(403,12,'General Heliodoro Castillo',1),(404,12,'Huamuxtitlán',1),(405,12,'Huitzuco de los Figueroa',1),(406,12,'Iguala de la Independencia',1),(407,12,'Igualapa',1),(408,12,'Ixcateopan de Cuauhtémoc',1),(409,12,'Zihuatanejo de Azueta',4),(410,12,'Juan R. Escudero',1),(411,12,'Leonardo Bravo',1),(412,12,'Malinaltepec',1),(413,12,'Mártir de Cuilapan',1),(414,12,'Metlatónoc',1),(415,12,'Mochitlán',1),(416,12,'Olinalá',1),(417,12,'Ometepec',1),(418,12,'Pedro Ascencio Alquisiras',1),(419,12,'Petatlán',1),(420,12,'Pilcaya',1),(421,12,'Pungarabato',1),(422,12,'Quechultenango',1),(423,12,'San Luis Acatlán',1),(424,12,'San Marcos',1),(425,12,'San Miguel Totolapan',1),(426,12,'Taxco de Alarcón',3),(427,12,'Tecoanapa',1),(428,12,'Técpan de Galeana',1),(429,12,'Teloloapan',1),(430,12,'Tepecoacuilco de Trujano',1),(431,12,'Tetipac',1),(432,12,'Tixtla de Guerrero',1),(433,12,'Tlacoachistlahuaca',1),(434,12,'Tlacoapa',1),(435,12,'Tlalchapa',1),(436,12,'Tlalixtaquilla de Maldonado',1),(437,12,'Tlapa de Comonfort',1),(438,12,'Tlapehuala',1),(439,12,'La Unión de Isidoro Montes de Oca',1),(440,12,'Xalpatláhuac',1),(441,12,'Xochihuehuetlán',1),(442,12,'Xochistlahuaca',1),(443,12,'Zapotitlán Tablas',1),(444,12,'Zirándaro',1),(445,12,'Zitlala',1),(446,12,'Eduardo Neri',1),(447,12,'Acatepec',1),(448,12,'Marquelia',1),(449,12,'Cochoapa el Grande',1),(450,12,'José Joaquín de Herrera',1),(451,12,'Juchitán',1),(452,12,'Iliatenco',1),(453,13,'Acatlán',1),(454,13,'Acaxochitlán',1),(455,13,'Actopan',1),(456,13,'Agua Blanca de Iturbide',1),(457,13,'Ajacuba',1),(458,13,'Alfajayucan',1),(459,13,'Almoloya',1),(460,13,'Apan',1),(461,13,'El Arenal',1),(462,13,'Atitalaquia',1),(463,13,'Atlapexco',1),(464,13,'Atotonilco el Grande',1),(465,13,'Atotonilco de Tula',1),(466,13,'Calnali',1),(467,13,'Cardonal',1),(468,13,'Cuautepec de Hinojosa',1),(469,13,'Chapantongo',1),(470,13,'Chapulhuacán',1),(471,13,'Chilcuautla',1),(472,13,'Eloxochitlán',1),(473,13,'Emiliano Zapata',1),(474,13,'Epazoyucan',1),(475,13,'Francisco I. Madero',1),(476,13,'Huasca de Ocampo',1),(477,13,'Huautla',1),(478,13,'Huazalingo',1),(479,13,'Huehuetla',1),(480,13,'Huejutla de Reyes',1),(481,13,'Huichapan',1),(482,13,'Ixmiquilpan',1),(483,13,'Jacala de Ledezma',1),(484,13,'Jaltocán',1),(485,13,'Juárez Hidalgo',1),(486,13,'Lolotla',1),(487,13,'Metepec',1),(488,13,'San Agustín Metzquititlán',1),(489,13,'Metztitlán',1),(490,13,'Mineral del Chico',1),(491,13,'Mineral del Monte',1),(492,13,'La Misión',1),(493,13,'Mixquiahuala de Juárez',1),(494,13,'Molango de Escamilla',1),(495,13,'Nicolás Flores',1),(496,13,'Nopala de Villagrán',1),(497,13,'Omitlán de Juárez',1),(498,13,'San Felipe Orizatlán',1),(499,13,'Pacula',1),(500,13,'Pachuca de Soto',1),(501,13,'Pisaflores',1),(502,13,'Progreso de Obregón',1),(503,13,'Mineral de la Reforma',1),(504,13,'San Agustín Tlaxiaca',1),(505,13,'San Bartolo Tutotepec',1),(506,13,'San Salvador',1),(507,13,'Santiago de Anaya',1),(508,13,'Santiago Tulantepec de Lugo Guerrero',1),(509,13,'Singuilucan',1),(510,13,'Tasquillo',1),(511,13,'Tecozautla',1),(512,13,'Tenango de Doria',1),(513,13,'Tepeapulco',1),(514,13,'Tepehuacán de Guerrero',1),(515,13,'Tepeji del Río de Ocampo',1),(516,13,'Tepetitlán',1),(517,13,'Tetepango',1),(518,13,'Villa de Tezontepec',1),(519,13,'Tezontepec de Aldama',1),(520,13,'Tianguistengo',1),(521,13,'Tizayuca',1),(522,13,'Tlahuelilpan',1),(523,13,'Tlahuiltepa',1),(524,13,'Tlanalapa',1),(525,13,'Tlanchinol',1),(526,13,'Tlaxcoapan',1),(527,13,'Tolcayuca',1),(528,13,'Tula de Allende',1),(529,13,'Tulancingo de Bravo',1),(530,13,'Xochiatipan',1),(531,13,'Xochicoatlán',1),(532,13,'Yahualica',1),(533,13,'Zacualtipán de Ángeles',1),(534,13,'Zapotlán de Juárez',1),(535,13,'Zempoala',1),(536,13,'Zimapán',1),(537,14,'Acatic',1),(538,14,'Acatlán de Juárez',1),(539,14,'Ahualulco de Mercado',1),(540,14,'Amacueca',1),(541,14,'Amatitán',1),(542,14,'Ameca',1),(543,14,'San Juanito de Escobedo',1),(544,14,'Arandas',1),(545,14,'El Arenal',1),(546,14,'Atemajac de Brizuela',1),(547,14,'Atengo',1),(548,14,'Atenguillo',1),(549,14,'Atotonilco el Alto',1),(550,14,'Atoyac',1),(551,14,'Autlán de Navarro',1),(552,14,'Ayotlán',1),(553,14,'Ayutla',1),(554,14,'La Barca',1),(555,14,'Bolaños',1),(556,14,'Cabo Corrientes',1),(557,14,'Casimiro Castillo',1),(558,14,'Cihuatlán',1),(559,14,'Zapotlán el Grande',1),(560,14,'Cocula',1),(561,14,'Colotlán',1),(562,14,'Concepción de Buenos Aires',1),(563,14,'Cuautitlán de García Barragán',1),(564,14,'Cuautla',1),(565,14,'Cuquío',1),(566,14,'Chapala',1),(567,14,'Chimaltitán',1),(568,14,'Chiquilistlán',1),(569,14,'Degollado',1),(570,14,'Ejutla',1),(571,14,'Encarnación de Díaz',1),(572,14,'Etzatlán',1),(573,14,'El Grullo',1),(574,14,'Guachinango',1),(575,14,'Guadalajara',1),(576,14,'Hostotipaquillo',1),(577,14,'Huejúcar',1),(578,14,'Huejuquilla el Alto',1),(579,14,'La Huerta',1),(580,14,'Ixtlahuacán de los Membrillos',1),(581,14,'Ixtlahuacán del Río',1),(582,14,'Jalostotitlán',1),(583,14,'Jamay',1),(584,14,'Jesús María',1),(585,14,'Jilotlán de los Dolores',1),(586,14,'Jocotepec',1),(587,14,'Juanacatlán',1),(588,14,'Juchitlán',1),(589,14,'Lagos de Moreno',1),(590,14,'El Limón',1),(591,14,'Magdalena',1),(592,14,'Santa María del Oro',1),(593,14,'La Manzanilla de la Paz',1),(594,14,'Mascota',1),(595,14,'Mazamitla',1),(596,14,'Mexticacán',1),(597,14,'Mezquitic',1),(598,14,'Mixtlán',1),(599,14,'Ocotlán',1),(600,14,'Ojuelos de Jalisco',1),(601,14,'Pihuamo',1),(602,14,'Poncitlán',1),(603,14,'Puerto Vallarta',1),(604,14,'Villa Purificación',1),(605,14,'Quitupan',1),(606,14,'El Salto',1),(607,14,'San Cristóbal de la Barranca',1),(608,14,'San Diego de Alejandría',1),(609,14,'San Juan de los Lagos',1),(610,14,'San Julián',1),(611,14,'San Marcos',1),(612,14,'San Martín de Bolaños',1),(613,14,'San Martín Hidalgo',1),(614,14,'San Miguel el Alto',1),(615,14,'Gómez Farías',1),(616,14,'San Sebastián del Oeste',1),(617,14,'Santa María de los Ángeles',1),(618,14,'Sayula',1),(619,14,'Tala',1),(620,14,'Talpa de Allende',1),(621,14,'Tamazula de Gordiano',1),(622,14,'Tapalpa',1),(623,14,'Tecalitlán',1),(624,14,'Tecolotlán',1),(625,14,'Techaluta de Montenegro',1),(626,14,'Tenamaxtlán',1),(627,14,'Teocaltiche',1),(628,14,'Teocuitatlán de Corona',1),(629,14,'Tepatitlán de Morelos',1),(630,14,'Tequila',1),(631,14,'Teuchitlán',1),(632,14,'Tizapán el Alto',1),(633,14,'Tlajomulco de Zúñiga',1),(634,14,'San Pedro Tlaquepaque',1),(635,14,'Tolimán',1),(636,14,'Tomatlán',1),(637,14,'Tonalá',1),(638,14,'Tonaya',1),(639,14,'Tonila',1),(640,14,'Totatiche',1),(641,14,'Tototlán',1),(642,14,'Tuxcacuesco',1),(643,14,'Tuxcueca',1),(644,14,'Tuxpan',1),(645,14,'Unión de San Antonio',1),(646,14,'Unión de Tula',1),(647,14,'Valle de Guadalupe',1),(648,14,'Valle de Juárez',1),(649,14,'San Gabriel',1),(650,14,'Villa Corona',1),(651,14,'Villa Guerrero',1),(652,14,'Villa Hidalgo',1),(653,14,'Cañadas de Obregón',1),(654,14,'Yahualica de González Gallo',1),(655,14,'Zacoalco de Torres',1),(656,14,'Zapopan',1),(657,14,'Zapotiltic',1),(658,14,'Zapotitlán de Vadillo',1),(659,14,'Zapotlán del Rey',1),(660,14,'Zapotlanejo',1),(661,14,'San Ignacio Cerro Gordo',1),(662,15,'Acambay de Ruíz Castañeda',1),(663,15,'Acolman',1),(664,15,'Aculco',1),(665,15,'Almoloya de Alquisiras',1),(666,15,'Almoloya de Juárez',1),(667,15,'Almoloya del Río',1),(668,15,'Amanalco',1),(669,15,'Amatepec',1),(670,15,'Amecameca',1),(671,15,'Apaxco',1),(672,15,'Atenco',1),(673,15,'Atizapán',1),(674,15,'Atizapán de Zaragoza',3),(675,15,'Atlacomulco',1),(676,15,'Atlautla',1),(677,15,'Axapusco',1),(678,15,'Ayapango',1),(679,15,'Calimaya',1),(680,15,'Capulhuac',1),(681,15,'Coacalco de Berriozábal',3),(682,15,'Coatepec Harinas',1),(683,15,'Cocotitlán',1),(684,15,'Coyotepec',1),(685,15,'Cuautitlán',3),(686,15,'Chalco',1),(687,15,'Chapa de Mota',1),(688,15,'Chapultepec',1),(689,15,'Chiautla',1),(690,15,'Chicoloapan',1),(691,15,'Chiconcuac',1),(692,15,'Chimalhuacán',1),(693,15,'Donato Guerra',1),(694,15,'Ecatepec de Morelos',3),(695,15,'Ecatzingo',1),(696,15,'Huehuetoca',1),(697,15,'Hueypoxtla',1),(698,15,'Huixquilucan',1),(699,15,'Isidro Fabela',1),(700,15,'Ixtapaluca',1),(701,15,'Ixtapan de la Sal',1),(702,15,'Ixtapan del Oro',1),(703,15,'Ixtlahuaca',1),(704,15,'Xalatlaco',1),(705,15,'Jaltenco',1),(706,15,'Jilotepec',1),(707,15,'Jilotzingo',1),(708,15,'Jiquipilco',1),(709,15,'Jocotitlán',1),(710,15,'Joquicingo',1),(711,15,'Juchitepec',1),(712,15,'Lerma',1),(713,15,'Malinalco',1),(714,15,'Melchor Ocampo',1),(715,15,'Metepec',1),(716,15,'Mexicaltzingo',1),(717,15,'Morelos',1),(718,15,'Naucalpan de Juárez',3),(719,15,'Nezahualcóyotl',3),(720,15,'Nextlalpan',1),(721,15,'Nicolás Romero',1),(722,15,'Nopaltepec',1),(723,15,'Ocoyoacac',1),(724,15,'Ocuilan',1),(725,15,'El Oro',1),(726,15,'Otumba',1),(727,15,'Otzoloapan',1),(728,15,'Otzolotepec',1),(729,15,'Ozumba',1),(730,15,'Papalotla',1),(731,15,'La Paz',1),(732,15,'Polotitlán',1),(733,15,'Rayón',1),(734,15,'San Antonio la Isla',1),(735,15,'San Felipe del Progreso',1),(736,15,'San Martín de las Pirámides',1),(737,15,'San Mateo Atenco',1),(738,15,'San Simón de Guerrero',1),(739,15,'Santo Tomás',1),(740,15,'Soyaniquilpan de Juárez',1),(741,15,'Sultepec',1),(742,15,'Tecámac',1),(743,15,'Tejupilco',1),(744,15,'Temamatla',1),(745,15,'Temascalapa',1),(746,15,'Temascalcingo',1),(747,15,'Temascaltepec',1),(748,15,'Temoaya',1),(749,15,'Tenancingo',1),(750,15,'Tenango del Aire',1),(751,15,'Tenango del Valle',1),(752,15,'Teoloyucan',1),(753,15,'Teotihuacán',1),(754,15,'Tepetlaoxtoc',1),(755,15,'Tepetlixpa',1),(756,15,'Tepotzotlán',1),(757,15,'Tequixquiac',1),(758,15,'Texcaltitlán',1),(759,15,'Texcalyacac',1),(760,15,'Texcoco',1),(761,15,'Tezoyuca',1),(762,15,'Tianguistenco',1),(763,15,'Timilpan',1),(764,15,'Tlalmanalco',1),(765,15,'Tlalnepantla de Baz',3),(766,15,'Tlatlaya',1),(767,15,'Toluca',1),(768,15,'Tonatico',1),(769,15,'Tultepec',1),(770,15,'Tultitlán',3),(771,15,'Valle de Bravo',1),(772,15,'Villa de Allende',1),(773,15,'Villa del Carbón',1),(774,15,'Villa Guerrero',1),(775,15,'Villa Victoria',1),(776,15,'Xonacatlán',1),(777,15,'Zacazonapan',1),(778,15,'Zacualpan',1),(779,15,'Zinacantepec',1),(780,15,'Zumpahuacán',1),(781,15,'Zumpango',1),(782,15,'Cuautitlán Izcalli',3),(783,15,'Valle de Chalco Solidaridad',1),(784,15,'Luvianos',1),(785,15,'San José del Rincón',1),(786,15,'Tonanitla',1),(787,16,'Acuitzio',1),(788,16,'Aguililla',1),(789,16,'Álvaro Obregón',1),(790,16,'Angamacutiro',1),(791,16,'Angangueo',1),(792,16,'Apatzingán',1),(793,16,'Aporo',1),(794,16,'Aquila',1),(795,16,'Ario',1),(796,16,'Arteaga',1),(797,16,'Briseñas',1),(798,16,'Buenavista',1),(799,16,'Carácuaro',1),(800,16,'Coahuayana',1),(801,16,'Coalcomán de Vázquez Pallares',1),(802,16,'Coeneo',1),(803,16,'Contepec',1),(804,16,'Copándaro',1),(805,16,'Cotija',1),(806,16,'Cuitzeo',1),(807,16,'Charapan',1),(808,16,'Charo',1),(809,16,'Chavinda',1),(810,16,'Cherán',1),(811,16,'Chilchota',1),(812,16,'Chinicuila',1),(813,16,'Chucándiro',1),(814,16,'Churintzio',1),(815,16,'Churumuco',1),(816,16,'Ecuandureo',1),(817,16,'Epitacio Huerta',1),(818,16,'Erongarícuaro',1),(819,16,'Gabriel Zamora',1),(820,16,'Hidalgo',1),(821,16,'La Huacana',1),(822,16,'Huandacareo',1),(823,16,'Huaniqueo',1),(824,16,'Huetamo',1),(825,16,'Huiramba',1),(826,16,'Indaparapeo',1),(827,16,'Irimbo',1),(828,16,'Ixtlán',1),(829,16,'Jacona',1),(830,16,'Jiménez',1),(831,16,'Jiquilpan',1),(832,16,'Juárez',1),(833,16,'Jungapeo',1),(834,16,'Lagunillas',1),(835,16,'Madero',1),(836,16,'Maravatío',1),(837,16,'Marcos Castellanos',1),(838,16,'Lázaro Cárdenas',2),(839,16,'Morelia',2),(840,16,'Morelos',1),(841,16,'Múgica',1),(842,16,'Nahuatzen',1),(843,16,'Nocupétaro',1),(844,16,'Nuevo Parangaricutiro',1),(845,16,'Nuevo Urecho',1),(846,16,'Numarán',1),(847,16,'Ocampo',1),(848,16,'Pajacuarán',1),(849,16,'Panindícuaro',1),(850,16,'Parácuaro',1),(851,16,'Paracho',1),(852,16,'Pátzcuaro',1),(853,16,'Penjamillo',1),(854,16,'Peribán',1),(855,16,'La Piedad',1),(856,16,'Purépero',1),(857,16,'Puruándiro',1),(858,16,'Queréndaro',1),(859,16,'Quiroga',1),(860,16,'Cojumatlán de Régules',1),(861,16,'Los Reyes',1),(862,16,'Sahuayo',1),(863,16,'San Lucas',1),(864,16,'Santa Ana Maya',1),(865,16,'Salvador Escalante',1),(866,16,'Senguio',1),(867,16,'Susupuato',1),(868,16,'Tacámbaro',1),(869,16,'Tancítaro',1),(870,16,'Tangamandapio',1),(871,16,'Tangancícuaro',1),(872,16,'Tanhuato',1),(873,16,'Taretan',1),(874,16,'Tarímbaro',1),(875,16,'Tepalcatepec',1),(876,16,'Tingambato',1),(877,16,'Tingüindín',1),(878,16,'Tiquicheo de Nicolás Romero',1),(879,16,'Tlalpujahua',1),(880,16,'Tlazazalca',1),(881,16,'Tocumbo',1),(882,16,'Tumbiscatío',1),(883,16,'Turicato',1),(884,16,'Tuxpan',1),(885,16,'Tuzantla',1),(886,16,'Tzintzuntzan',1),(887,16,'Tzitzio',1),(888,16,'Uruapan',2),(889,16,'Venustiano Carranza',1),(890,16,'Villamar',1),(891,16,'Vista Hermosa',1),(892,16,'Yurécuaro',1),(893,16,'Zacapu',1),(894,16,'Zamora',1),(895,16,'Zináparo',1),(896,16,'Zinapécuaro',1),(897,16,'Ziracuaretiro',1),(898,16,'Zitácuaro',1),(899,16,'José Sixto Verduzco',1),(900,17,'Amacuzac',1),(901,17,'Atlatlahucan',1),(902,17,'Axochiapan',1),(903,17,'Ayala',1),(904,17,'Coatlán del Río',1),(905,17,'Cuautla',1),(906,17,'Cuernavaca',2),(907,17,'Emiliano Zapata',1),(908,17,'Huitzilac',1),(909,17,'Jantetelco',1),(910,17,'Jiutepec',1),(911,17,'Jojutla',1),(912,17,'Jonacatepec de Leandro Valle',1),(913,17,'Mazatepec',1),(914,17,'Miacatlán',1),(915,17,'Ocuituco',1),(916,17,'Puente de Ixtla',1),(917,17,'Temixco',1),(918,17,'Tepalcingo',1),(919,17,'Tepoztlán',1),(920,17,'Tetecala',1),(921,17,'Tetela del Volcán',1),(922,17,'Tlalnepantla',1),(923,17,'Tlaltizapán de Zapata',1),(924,17,'Tlaquiltenango',1),(925,17,'Tlayacapan',1),(926,17,'Totolapan',1),(927,17,'Xochitepec',1),(928,17,'Yautepec',1),(929,17,'Yecapixtla',1),(930,17,'Zacatepec',1),(931,17,'Zacualpan de Amilpas',1),(932,17,'Temoac',1),(933,18,'Acaponeta',1),(934,18,'Ahuacatlán',1),(935,18,'Amatlán de Cañas',1),(936,18,'Compostela',1),(937,18,'Huajicori',1),(938,18,'Ixtlán del Río',1),(939,18,'Jala',1),(940,18,'Xalisco',1),(941,18,'Del Nayar',1),(942,18,'Rosamorada',1),(943,18,'Ruíz',1),(944,18,'San Blas',3),(945,18,'San Pedro Lagunillas',1),(946,18,'Santa María del Oro',1),(947,18,'Santiago Ixcuintla',1),(948,18,'Tecuala',1),(949,18,'Tepic',1),(950,18,'Tuxpan',1),(951,18,'La Yesca',1),(952,18,'Bahía de Banderas',1),(953,19,'Abasolo',2),(954,19,'Agualeguas',2),(955,19,'Los Aldamas',2),(956,19,'Allende',2),(957,19,'Anáhuac',2),(958,19,'Apodaca',3),(959,19,'Aramberri',2),(960,19,'Bustamante',2),(961,19,'Cadereyta Jiménez',2),(962,19,'El Carmen',2),(963,19,'Cerralvo',2),(964,19,'Ciénega de Flores',2),(965,19,'China',2),(966,19,'Doctor Arroyo',2),(967,19,'Doctor Coss',2),(968,19,'Doctor González',2),(969,19,'Galeana',2),(970,19,'García',2),(971,19,'San Pedro Garza García',3),(972,19,'General Bravo',2),(973,19,'General Escobedo',3),(974,19,'General Terán',2),(975,19,'General Treviño',2),(976,19,'General Zaragoza',2),(977,19,'General Zuazua',2),(978,19,'Guadalupe',3),(979,19,'Los Herreras',2),(980,19,'Higueras',2),(981,19,'Hualahuises',2),(982,19,'Iturbide',2),(983,19,'Juárez',2),(984,19,'Lampazos de Naranjo',2),(985,19,'Linares',2),(986,19,'Marín',2),(987,19,'Melchor Ocampo',2),(988,19,'Mier y Noriega',2),(989,19,'Mina',2),(990,19,'Montemorelos',2),(991,19,'Monterrey',3),(992,19,'Parás',2),(993,19,'Pesquería',2),(994,19,'Los Ramones',2),(995,19,'Rayones',2),(996,19,'Sabinas Hidalgo',2),(997,19,'Salinas Victoria',2),(998,19,'San Nicolás de los Garza',3),(999,19,'Hidalgo',2),(1000,19,'Santa Catarina',3),(1001,19,'Santiago',2),(1002,19,'Vallecillo',2),(1003,19,'Villaldama',2),(1004,20,'Abejones',1),(1005,20,'Acatlán de Pérez Figueroa',1),(1006,20,'Asunción Cacalotepec',1),(1007,20,'Asunción Cuyotepeji',1),(1008,20,'Asunción Ixtaltepec',1),(1009,20,'Asunción Nochixtlán',1),(1010,20,'Asunción Ocotlán',1),(1011,20,'Asunción Tlacolulita',1),(1012,20,'Ayotzintepec',1),(1013,20,'El Barrio de la Soledad',1),(1014,20,'Calihualá',1),(1015,20,'Candelaria Loxicha',1),(1016,20,'Ciénega de Zimatlán',1),(1017,20,'Ciudad Ixtepec',1),(1018,20,'Coatecas Altas',1),(1019,20,'Coicoyán de las Flores',1),(1020,20,'La Compañía',1),(1021,20,'Concepción Buenavista',1),(1022,20,'Concepción Pápalo',1),(1023,20,'Constancia del Rosario',1),(1024,20,'Cosolapa',1),(1025,20,'Cosoltepec',1),(1026,20,'Cuilápam de Guerrero',1),(1027,20,'Cuyamecalco Villa de Zaragoza',1),(1028,20,'Chahuites',1),(1029,20,'Chalcatongo de Hidalgo',1),(1030,20,'Chiquihuitlán de Benito Juárez',1),(1031,20,'Heroica Ciudad de Ejutla de Crespo',1),(1032,20,'Eloxochitlán de Flores Magón',1),(1033,20,'El Espinal',1),(1034,20,'Tamazulápam del Espíritu Santo',1),(1035,20,'Fresnillo de Trujano',1),(1036,20,'Guadalupe Etla',1),(1037,20,'Guadalupe de Ramírez',1),(1038,20,'Guelatao de Juárez',1),(1039,20,'Guevea de Humboldt',1),(1040,20,'Mesones Hidalgo',1),(1041,20,'Villa Hidalgo',1),(1042,20,'Heroica Ciudad de Huajuapan de León',1),(1043,20,'Huautepec',1),(1044,20,'Huautla de Jiménez',1),(1045,20,'Ixtlán de Juárez',1),(1046,20,'Heroica Ciudad de Juchitán de Zaragoza',1),(1047,20,'Loma Bonita',1),(1048,20,'Magdalena Apasco',1),(1049,20,'Magdalena Jaltepec',1),(1050,20,'Santa Magdalena Jicotlán',1),(1051,20,'Magdalena Mixtepec',1),(1052,20,'Magdalena Ocotlán',1),(1053,20,'Magdalena Peñasco',1),(1054,20,'Magdalena Teitipac',1),(1055,20,'Magdalena Tequisistlán',1),(1056,20,'Magdalena Tlacotepec',1),(1057,20,'Magdalena Zahuatlán',1),(1058,20,'Mariscala de Juárez',1),(1059,20,'Mártires de Tacubaya',1),(1060,20,'Matías Romero Avendaño',1),(1061,20,'Mazatlán Villa de Flores',1),(1062,20,'Miahuatlán de Porfirio Díaz',1),(1063,20,'Mixistlán de la Reforma',1),(1064,20,'Monjas',1),(1065,20,'Natividad',1),(1066,20,'Nazareno Etla',1),(1067,20,'Nejapa de Madero',1),(1068,20,'Ixpantepec Nieves',1),(1069,20,'Santiago Niltepec',1),(1070,20,'Oaxaca de Juárez',3),(1071,20,'Ocotlán de Morelos',1),(1072,20,'La Pe',1),(1073,20,'Pinotepa de Don Luis',1),(1074,20,'Pluma Hidalgo',1),(1075,20,'San José del Progreso',1),(1076,20,'Putla Villa de Guerrero',1),(1077,20,'Santa Catarina Quioquitani',1),(1078,20,'Reforma de Pineda',1),(1079,20,'La Reforma',1),(1080,20,'Reyes Etla',1),(1081,20,'Rojas de Cuauhtémoc',1),(1082,20,'Salina Cruz',2),(1083,20,'San Agustín Amatengo',1),(1084,20,'San Agustín Atenango',1),(1085,20,'San Agustín Chayuco',1),(1086,20,'San Agustín de las Juntas',1),(1087,20,'San Agustín Etla',1),(1088,20,'San Agustín Loxicha',1),(1089,20,'San Agustín Tlacotepec',1),(1090,20,'San Agustín Yatareni',1),(1091,20,'San Andrés Cabecera Nueva',1),(1092,20,'San Andrés Dinicuiti',1),(1093,20,'San Andrés Huaxpaltepec',1),(1094,20,'San Andrés Huayápam',1),(1095,20,'San Andrés Ixtlahuaca',1),(1096,20,'San Andrés Lagunas',1),(1097,20,'San Andrés Nuxiño',1),(1098,20,'San Andrés Paxtlán',1),(1099,20,'San Andrés Sinaxtla',1),(1100,20,'San Andrés Solaga',1),(1101,20,'San Andrés Teotilálpam',1),(1102,20,'San Andrés Tepetlapa',1),(1103,20,'San Andrés Yaá',1),(1104,20,'San Andrés Zabache',1),(1105,20,'San Andrés Zautla',1),(1106,20,'San Antonino Castillo Velasco',1),(1107,20,'San Antonino el Alto',1),(1108,20,'San Antonino Monte Verde',1),(1109,20,'San Antonio Acutla',1),(1110,20,'San Antonio de la Cal',1),(1111,20,'San Antonio Huitepec',1),(1112,20,'San Antonio Nanahuatípam',1),(1113,20,'San Antonio Sinicahua',1),(1114,20,'San Antonio Tepetlapa',1),(1115,20,'San Baltazar Chichicápam',1),(1116,20,'San Baltazar Loxicha',1),(1117,20,'San Baltazar Yatzachi el Bajo',1),(1118,20,'San Bartolo Coyotepec',1),(1119,20,'San Bartolomé Ayautla',1),(1120,20,'San Bartolomé Loxicha',1),(1121,20,'San Bartolomé Quialana',1),(1122,20,'San Bartolomé Yucuañe',1),(1123,20,'San Bartolomé Zoogocho',1),(1124,20,'San Bartolo Soyaltepec',1),(1125,20,'San Bartolo Yautepec',1),(1126,20,'San Bernardo Mixtepec',1),(1127,20,'San Blas Atempa',1),(1128,20,'San Carlos Yautepec',1),(1129,20,'San Cristóbal Amatlán',1),(1130,20,'San Cristóbal Amoltepec',1),(1131,20,'San Cristóbal Lachirioag',1),(1132,20,'San Cristóbal Suchixtlahuaca',1),(1133,20,'San Dionisio del Mar',1),(1134,20,'San Dionisio Ocotepec',1),(1135,20,'San Dionisio Ocotlán',1),(1136,20,'San Esteban Atatlahuca',1),(1137,20,'San Felipe Jalapa de Díaz',1),(1138,20,'San Felipe Tejalápam',1),(1139,20,'San Felipe Usila',1),(1140,20,'San Francisco Cahuacuá',1),(1141,20,'San Francisco Cajonos',1),(1142,20,'San Francisco Chapulapa',1),(1143,20,'San Francisco Chindúa',1),(1144,20,'San Francisco del Mar',1),(1145,20,'San Francisco Huehuetlán',1),(1146,20,'San Francisco Ixhuatán',1),(1147,20,'San Francisco Jaltepetongo',1),(1148,20,'San Francisco Lachigoló',1),(1149,20,'San Francisco Logueche',1),(1150,20,'San Francisco Nuxaño',1),(1151,20,'San Francisco Ozolotepec',1),(1152,20,'San Francisco Sola',1),(1153,20,'San Francisco Telixtlahuaca',1),(1154,20,'San Francisco Teopan',1),(1155,20,'San Francisco Tlapancingo',1),(1156,20,'San Gabriel Mixtepec',1),(1157,20,'San Ildefonso Amatlán',1),(1158,20,'San Ildefonso Sola',1),(1159,20,'San Ildefonso Villa Alta',1),(1160,20,'San Jacinto Amilpas',1),(1161,20,'San Jacinto Tlacotepec',1),(1162,20,'San Jerónimo Coatlán',1),(1163,20,'San Jerónimo Silacayoapilla',1),(1164,20,'San Jerónimo Sosola',1),(1165,20,'San Jerónimo Taviche',1),(1166,20,'San Jerónimo Tecóatl',1),(1167,20,'San Jorge Nuchita',1),(1168,20,'San José Ayuquila',1),(1169,20,'San José Chiltepec',1),(1170,20,'San José del Peñasco',1),(1171,20,'San José Estancia Grande',1),(1172,20,'San José Independencia',1),(1173,20,'San José Lachiguiri',1),(1174,20,'San José Tenango',1),(1175,20,'San Juan Achiutla',1),(1176,20,'San Juan Atepec',1),(1177,20,'Ánimas Trujano',1),(1178,20,'San Juan Bautista Atatlahuca',1),(1179,20,'San Juan Bautista Coixtlahuaca',1),(1180,20,'San Juan Bautista Cuicatlán',1),(1181,20,'San Juan Bautista Guelache',1),(1182,20,'San Juan Bautista Jayacatlán',1),(1183,20,'San Juan Bautista Lo de Soto',1),(1184,20,'San Juan Bautista Suchitepec',1),(1185,20,'San Juan Bautista Tlacoatzintepec',1),(1186,20,'San Juan Bautista Tlachichilco',1),(1187,20,'San Juan Bautista Tuxtepec',1),(1188,20,'San Juan Cacahuatepec',1),(1189,20,'San Juan Cieneguilla',1),(1190,20,'San Juan Coatzóspam',1),(1191,20,'San Juan Colorado',1),(1192,20,'San Juan Comaltepec',1),(1193,20,'San Juan Cotzocón',1),(1194,20,'San Juan Chicomezúchil',1),(1195,20,'San Juan Chilateca',1),(1196,20,'San Juan del Estado',1),(1197,20,'San Juan del Río',1),(1198,20,'San Juan Diuxi',1),(1199,20,'San Juan Evangelista Analco',1),(1200,20,'San Juan Guelavía',1),(1201,20,'San Juan Guichicovi',1),(1202,20,'San Juan Ihualtepec',1),(1203,20,'San Juan Juquila Mixes',1),(1204,20,'San Juan Juquila Vijanos',1),(1205,20,'San Juan Lachao',1),(1206,20,'San Juan Lachigalla',1),(1207,20,'San Juan Lajarcia',1),(1208,20,'San Juan Lalana',1),(1209,20,'San Juan de los Cués',1),(1210,20,'San Juan Mazatlán',1),(1211,20,'San Juan Mixtepec',1),(1212,20,'San Juan Mixtepec',1),(1213,20,'San Juan Ñumí',1),(1214,20,'San Juan Ozolotepec',1),(1215,20,'San Juan Petlapa',1),(1216,20,'San Juan Quiahije',1),(1217,20,'San Juan Quiotepec',1),(1218,20,'San Juan Sayultepec',1),(1219,20,'San Juan Tabaá',1),(1220,20,'San Juan Tamazola',1),(1221,20,'San Juan Teita',1),(1222,20,'San Juan Teitipac',1),(1223,20,'San Juan Tepeuxila',1),(1224,20,'San Juan Teposcolula',1),(1225,20,'San Juan Yaeé',1),(1226,20,'San Juan Yatzona',1),(1227,20,'San Juan Yucuita',1),(1228,20,'San Lorenzo',1),(1229,20,'San Lorenzo Albarradas',1),(1230,20,'San Lorenzo Cacaotepec',1),(1231,20,'San Lorenzo Cuaunecuiltitla',1),(1232,20,'San Lorenzo Texmelúcan',1),(1233,20,'San Lorenzo Victoria',1),(1234,20,'San Lucas Camotlán',1),(1235,20,'San Lucas Ojitlán',1),(1236,20,'San Lucas Quiaviní',1),(1237,20,'San Lucas Zoquiápam',1),(1238,20,'San Luis Amatlán',1),(1239,20,'San Marcial Ozolotepec',1),(1240,20,'San Marcos Arteaga',1),(1241,20,'San Martín de los Cansecos',1),(1242,20,'San Martín Huamelúlpam',1),(1243,20,'San Martín Itunyoso',1),(1244,20,'San Martín Lachilá',1),(1245,20,'San Martín Peras',1),(1246,20,'San Martín Tilcajete',1),(1247,20,'San Martín Toxpalan',1),(1248,20,'San Martín Zacatepec',1),(1249,20,'San Mateo Cajonos',1),(1250,20,'Capulálpam de Méndez',1),(1251,20,'San Mateo del Mar',1),(1252,20,'San Mateo Yoloxochitlán',1),(1253,20,'San Mateo Etlatongo',1),(1254,20,'San Mateo Nejápam',1),(1255,20,'San Mateo Peñasco',1),(1256,20,'San Mateo Piñas',1),(1257,20,'San Mateo Río Hondo',1),(1258,20,'San Mateo Sindihui',1),(1259,20,'San Mateo Tlapiltepec',1),(1260,20,'San Melchor Betaza',1),(1261,20,'San Miguel Achiutla',1),(1262,20,'San Miguel Ahuehuetitlán',1),(1263,20,'San Miguel Aloápam',1),(1264,20,'San Miguel Amatitlán',1),(1265,20,'San Miguel Amatlán',1),(1266,20,'San Miguel Coatlán',1),(1267,20,'San Miguel Chicahua',1),(1268,20,'San Miguel Chimalapa',1),(1269,20,'San Miguel del Puerto',1),(1270,20,'San Miguel del Río',1),(1271,20,'San Miguel Ejutla',1),(1272,20,'San Miguel el Grande',1),(1273,20,'San Miguel Huautla',1),(1274,20,'San Miguel Mixtepec',1),(1275,20,'San Miguel Panixtlahuaca',1),(1276,20,'San Miguel Peras',1),(1277,20,'San Miguel Piedras',1),(1278,20,'San Miguel Quetzaltepec',1),(1279,20,'San Miguel Santa Flor',1),(1280,20,'Villa Sola de Vega',1),(1281,20,'San Miguel Soyaltepec',1),(1282,20,'San Miguel Suchixtepec',1),(1283,20,'Villa Talea de Castro',1),(1284,20,'San Miguel Tecomatlán',1),(1285,20,'San Miguel Tenango',1),(1286,20,'San Miguel Tequixtepec',1),(1287,20,'San Miguel Tilquiápam',1),(1288,20,'San Miguel Tlacamama',1),(1289,20,'San Miguel Tlacotepec',1),(1290,20,'San Miguel Tulancingo',1),(1291,20,'San Miguel Yotao',1),(1292,20,'San Nicolás',1),(1293,20,'San Nicolás Hidalgo',1),(1294,20,'San Pablo Coatlán',1),(1295,20,'San Pablo Cuatro Venados',1),(1296,20,'San Pablo Etla',1),(1297,20,'San Pablo Huitzo',1),(1298,20,'San Pablo Huixtepec',1),(1299,20,'San Pablo Macuiltianguis',1),(1300,20,'San Pablo Tijaltepec',1),(1301,20,'San Pablo Villa de Mitla',1),(1302,20,'San Pablo Yaganiza',1),(1303,20,'San Pedro Amuzgos',1),(1304,20,'San Pedro Apóstol',1),(1305,20,'San Pedro Atoyac',1),(1306,20,'San Pedro Cajonos',1),(1307,20,'San Pedro Coxcaltepec Cántaros',1),(1308,20,'San Pedro Comitancillo',1),(1309,20,'San Pedro el Alto',1),(1310,20,'San Pedro Huamelula',1),(1311,20,'San Pedro Huilotepec',1),(1312,20,'San Pedro Ixcatlán',1),(1313,20,'San Pedro Ixtlahuaca',1),(1314,20,'San Pedro Jaltepetongo',1),(1315,20,'San Pedro Jicayán',1),(1316,20,'San Pedro Jocotipac',1),(1317,20,'San Pedro Juchatengo',1),(1318,20,'San Pedro Mártir',1),(1319,20,'San Pedro Mártir Quiechapa',1),(1320,20,'San Pedro Mártir Yucuxaco',1),(1321,20,'San Pedro Mixtepec',2),(1322,20,'San Pedro Mixtepec',2),(1323,20,'San Pedro Molinos',1),(1324,20,'San Pedro Nopala',1),(1325,20,'San Pedro Ocopetatillo',1),(1326,20,'San Pedro Ocotepec',1),(1327,20,'San Pedro Pochutla',2),(1328,20,'San Pedro Quiatoni',1),(1329,20,'San Pedro Sochiápam',1),(1330,20,'San Pedro Tapanatepec',1),(1331,20,'San Pedro Taviche',1),(1332,20,'San Pedro Teozacoalco',1),(1333,20,'San Pedro Teutila',1),(1334,20,'San Pedro Tidaá',1),(1335,20,'San Pedro Topiltepec',1),(1336,20,'San Pedro Totolápam',1),(1337,20,'Villa de Tututepec',1),(1338,20,'San Pedro Yaneri',1),(1339,20,'San Pedro Yólox',1),(1340,20,'San Pedro y San Pablo Ayutla',1),(1341,20,'Villa de Etla',1),(1342,20,'San Pedro y San Pablo Teposcolula',1),(1343,20,'San Pedro y San Pablo Tequixtepec',1),(1344,20,'San Pedro Yucunama',1),(1345,20,'San Raymundo Jalpan',1),(1346,20,'San Sebastián Abasolo',1),(1347,20,'San Sebastián Coatlán',1),(1348,20,'San Sebastián Ixcapa',1),(1349,20,'San Sebastián Nicananduta',1),(1350,20,'San Sebastián Río Hondo',1),(1351,20,'San Sebastián Tecomaxtlahuaca',1),(1352,20,'San Sebastián Teitipac',1),(1353,20,'San Sebastián Tutla',1),(1354,20,'San Simón Almolongas',1),(1355,20,'San Simón Zahuatlán',1),(1356,20,'Santa Ana',1),(1357,20,'Santa Ana Ateixtlahuaca',1),(1358,20,'Santa Ana Cuauhtémoc',1),(1359,20,'Santa Ana del Valle',1),(1360,20,'Santa Ana Tavela',1),(1361,20,'Santa Ana Tlapacoyan',1),(1362,20,'Santa Ana Yareni',1),(1363,20,'Santa Ana Zegache',1),(1364,20,'Santa Catalina Quierí',1),(1365,20,'Santa Catarina Cuixtla',1),(1366,20,'Santa Catarina Ixtepeji',1),(1367,20,'Santa Catarina Juquila',1),(1368,20,'Santa Catarina Lachatao',1),(1369,20,'Santa Catarina Loxicha',1),(1370,20,'Santa Catarina Mechoacán',1),(1371,20,'Santa Catarina Minas',1),(1372,20,'Santa Catarina Quiané',1),(1373,20,'Santa Catarina Tayata',1),(1374,20,'Santa Catarina Ticuá',1),(1375,20,'Santa Catarina Yosonotú',1),(1376,20,'Santa Catarina Zapoquila',1),(1377,20,'Santa Cruz Acatepec',1),(1378,20,'Santa Cruz Amilpas',1),(1379,20,'Santa Cruz de Bravo',1),(1380,20,'Santa Cruz Itundujia',1),(1381,20,'Santa Cruz Mixtepec',1),(1382,20,'Santa Cruz Nundaco',1),(1383,20,'Santa Cruz Papalutla',1),(1384,20,'Santa Cruz Tacache de Mina',1),(1385,20,'Santa Cruz Tacahua',1),(1386,20,'Santa Cruz Tayata',1),(1387,20,'Santa Cruz Xitla',1),(1388,20,'Santa Cruz Xoxocotlán',1),(1389,20,'Santa Cruz Zenzontepec',1),(1390,20,'Santa Gertrudis',1),(1391,20,'Santa Inés del Monte',1),(1392,20,'Santa Inés Yatzeche',1),(1393,20,'Santa Lucía del Camino',1),(1394,20,'Santa Lucía Miahuatlán',1),(1395,20,'Santa Lucía Monteverde',1),(1396,20,'Santa Lucía Ocotlán',1),(1397,20,'Santa María Alotepec',1),(1398,20,'Santa María Apazco',1),(1399,20,'Santa María la Asunción',1),(1400,20,'Heroica Ciudad de Tlaxiaco',1),(1401,20,'Ayoquezco de Aldama',1),(1402,20,'Santa María Atzompa',1),(1403,20,'Santa María Camotlán',1),(1404,20,'Santa María Colotepec',1),(1405,20,'Santa María Cortijo',1),(1406,20,'Santa María Coyotepec',1),(1407,20,'Santa María Chachoápam',1),(1408,20,'Villa de Chilapa de Díaz',1),(1409,20,'Santa María Chilchotla',1),(1410,20,'Santa María Chimalapa',1),(1411,20,'Santa María del Rosario',1),(1412,20,'Santa María del Tule',1),(1413,20,'Santa María Ecatepec',1),(1414,20,'Santa María Guelacé',1),(1415,20,'Santa María Guienagati',1),(1416,20,'Santa María Huatulco',4),(1417,20,'Santa María Huazolotitlán',1),(1418,20,'Santa María Ipalapa',1),(1419,20,'Santa María Ixcatlán',1),(1420,20,'Santa María Jacatepec',1),(1421,20,'Santa María Jalapa del Marqués',1),(1422,20,'Santa María Jaltianguis',1),(1423,20,'Santa María Lachixío',1),(1424,20,'Santa María Mixtequilla',1),(1425,20,'Santa María Nativitas',1),(1426,20,'Santa María Nduayaco',1),(1427,20,'Santa María Ozolotepec',1),(1428,20,'Santa María Pápalo',1),(1429,20,'Santa María Peñoles',1),(1430,20,'Santa María Petapa',1),(1431,20,'Santa María Quiegolani',1),(1432,20,'Santa María Sola',1),(1433,20,'Santa María Tataltepec',1),(1434,20,'Santa María Tecomavaca',1),(1435,20,'Santa María Temaxcalapa',1),(1436,20,'Santa María Temaxcaltepec',1),(1437,20,'Santa María Teopoxco',1),(1438,20,'Santa María Tepantlali',1),(1439,20,'Santa María Texcatitlán',1),(1440,20,'Santa María Tlahuitoltepec',1),(1441,20,'Santa María Tlalixtac',1),(1442,20,'Santa María Tonameca',1),(1443,20,'Santa María Totolapilla',1),(1444,20,'Santa María Xadani',1),(1445,20,'Santa María Yalina',1),(1446,20,'Santa María Yavesía',1),(1447,20,'Santa María Yolotepec',1),(1448,20,'Santa María Yosoyúa',1),(1449,20,'Santa María Yucuhiti',1),(1450,20,'Santa María Zacatepec',1),(1451,20,'Santa María Zaniza',1),(1452,20,'Santa María Zoquitlán',1),(1453,20,'Santiago Amoltepec',1),(1454,20,'Santiago Apoala',1),(1455,20,'Santiago Apóstol',1),(1456,20,'Santiago Astata',1),(1457,20,'Santiago Atitlán',1),(1458,20,'Santiago Ayuquililla',1),(1459,20,'Santiago Cacaloxtepec',1),(1460,20,'Santiago Camotlán',1),(1461,20,'Santiago Comaltepec',1),(1462,20,'Santiago Chazumba',1),(1463,20,'Santiago Choápam',1),(1464,20,'Santiago del Río',1),(1465,20,'Santiago Huajolotitlán',1),(1466,20,'Santiago Huauclilla',1),(1467,20,'Santiago Ihuitlán Plumas',1),(1468,20,'Santiago Ixcuintepec',1),(1469,20,'Santiago Ixtayutla',1),(1470,20,'Santiago Jamiltepec',1),(1471,20,'Santiago Jocotepec',1),(1472,20,'Santiago Juxtlahuaca',1),(1473,20,'Santiago Lachiguiri',1),(1474,20,'Santiago Lalopa',1),(1475,20,'Santiago Laollaga',1),(1476,20,'Santiago Laxopa',1),(1477,20,'Santiago Llano Grande',1),(1478,20,'Santiago Matatlán',1),(1479,20,'Santiago Miltepec',1),(1480,20,'Santiago Minas',1),(1481,20,'Santiago Nacaltepec',1),(1482,20,'Santiago Nejapilla',1),(1483,20,'Santiago Nundiche',1),(1484,20,'Santiago Nuyoó',1),(1485,20,'Santiago Pinotepa Nacional',1),(1486,20,'Santiago Suchilquitongo',1),(1487,20,'Santiago Tamazola',1),(1488,20,'Santiago Tapextla',1),(1489,20,'Villa Tejúpam de la Unión',1),(1490,20,'Santiago Tenango',1),(1491,20,'Santiago Tepetlapa',1),(1492,20,'Santiago Tetepec',1),(1493,20,'Santiago Texcalcingo',1),(1494,20,'Santiago Textitlán',1),(1495,20,'Santiago Tilantongo',1),(1496,20,'Santiago Tillo',1),(1497,20,'Santiago Tlazoyaltepec',1),(1498,20,'Santiago Xanica',1),(1499,20,'Santiago Xiacuí',1),(1500,20,'Santiago Yaitepec',1),(1501,20,'Santiago Yaveo',1),(1502,20,'Santiago Yolomécatl',1),(1503,20,'Santiago Yosondúa',1),(1504,20,'Santiago Yucuyachi',1),(1505,20,'Santiago Zacatepec',1),(1506,20,'Santiago Zoochila',1),(1507,20,'Nuevo Zoquiápam',1),(1508,20,'Santo Domingo Ingenio',1),(1509,20,'Santo Domingo Albarradas',1),(1510,20,'Santo Domingo Armenta',1),(1511,20,'Santo Domingo Chihuitán',1),(1512,20,'Santo Domingo de Morelos',1),(1513,20,'Santo Domingo Ixcatlán',1),(1514,20,'Santo Domingo Nuxaá',1),(1515,20,'Santo Domingo Ozolotepec',1),(1516,20,'Santo Domingo Petapa',1),(1517,20,'Santo Domingo Roayaga',1),(1518,20,'Santo Domingo Tehuantepec',1),(1519,20,'Santo Domingo Teojomulco',1),(1520,20,'Santo Domingo Tepuxtepec',1),(1521,20,'Santo Domingo Tlatayápam',1),(1522,20,'Santo Domingo Tomaltepec',1),(1523,20,'Santo Domingo Tonalá',1),(1524,20,'Santo Domingo Tonaltepec',1),(1525,20,'Santo Domingo Xagacía',1),(1526,20,'Santo Domingo Yanhuitlán',1),(1527,20,'Santo Domingo Yodohino',1),(1528,20,'Santo Domingo Zanatepec',1),(1529,20,'Santos Reyes Nopala',1),(1530,20,'Santos Reyes Pápalo',1),(1531,20,'Santos Reyes Tepejillo',1),(1532,20,'Santos Reyes Yucuná',1),(1533,20,'Santo Tomás Jalieza',1),(1534,20,'Santo Tomás Mazaltepec',1),(1535,20,'Santo Tomás Ocotepec',1),(1536,20,'Santo Tomás Tamazulapan',1),(1537,20,'San Vicente Coatlán',1),(1538,20,'San Vicente Lachixío',1),(1539,20,'San Vicente Nuñú',1),(1540,20,'Silacayoápam',1),(1541,20,'Sitio de Xitlapehua',1),(1542,20,'Soledad Etla',1),(1543,20,'Villa de Tamazulápam del Progreso',1),(1544,20,'Tanetze de Zaragoza',1),(1545,20,'Taniche',1),(1546,20,'Tataltepec de Valdés',1),(1547,20,'Teococuilco de Marcos Pérez',1),(1548,20,'Teotitlán de Flores Magón',1),(1549,20,'Teotitlán del Valle',1),(1550,20,'Teotongo',1),(1551,20,'Tepelmeme Villa de Morelos',1),(1552,20,'Heroica Villa Tezoatlán de Segura y Luna, Cuna de la Independencia de Oaxaca',1),(1553,20,'San Jerónimo Tlacochahuaya',1),(1554,20,'Tlacolula de Matamoros',1),(1555,20,'Tlacotepec Plumas',1),(1556,20,'Tlalixtac de Cabrera',1),(1557,20,'Totontepec Villa de Morelos',1),(1558,20,'Trinidad Zaachila',1),(1559,20,'La Trinidad Vista Hermosa',1),(1560,20,'Unión Hidalgo',1),(1561,20,'Valerio Trujano',1),(1562,20,'San Juan Bautista Valle Nacional',1),(1563,20,'Villa Díaz Ordaz',1),(1564,20,'Yaxe',1),(1565,20,'Magdalena Yodocono de Porfirio Díaz',1),(1566,20,'Yogana',1),(1567,20,'Yutanduchi de Guerrero',1),(1568,20,'Villa de Zaachila',1),(1569,20,'San Mateo Yucutindoo',1),(1570,20,'Zapotitlán Lagunas',1),(1571,20,'Zapotitlán Palmas',1),(1572,20,'Santa Inés de Zaragoza',1),(1573,20,'Zimatlán de Álvarez',1),(1574,21,'Acajete',1),(1575,21,'Acateno',1),(1576,21,'Acatlán',1),(1577,21,'Acatzingo',1),(1578,21,'Acteopan',1),(1579,21,'Ahuacatlán',1),(1580,21,'Ahuatlán',1),(1581,21,'Ahuazotepec',1),(1582,21,'Ahuehuetitla',1),(1583,21,'Ajalpan',1),(1584,21,'Albino Zertuche',1),(1585,21,'Aljojuca',1),(1586,21,'Altepexi',1),(1587,21,'Amixtlán',1),(1588,21,'Amozoc',1),(1589,21,'Aquixtla',1),(1590,21,'Atempan',1),(1591,21,'Atexcal',1),(1592,21,'Atlixco',1),(1593,21,'Atoyatempan',1),(1594,21,'Atzala',1),(1595,21,'Atzitzihuacán',1),(1596,21,'Atzitzintla',1),(1597,21,'Axutla',1),(1598,21,'Ayotoxco de Guerrero',1),(1599,21,'Calpan',1),(1600,21,'Caltepec',1),(1601,21,'Camocuautla',1),(1602,21,'Caxhuacan',1),(1603,21,'Coatepec',1),(1604,21,'Coatzingo',1),(1605,21,'Cohetzala',1),(1606,21,'Cohuecan',1),(1607,21,'Coronango',1),(1608,21,'Coxcatlán',1),(1609,21,'Coyomeapan',1),(1610,21,'Coyotepec',1),(1611,21,'Cuapiaxtla de Madero',1),(1612,21,'Cuautempan',1),(1613,21,'Cuautinchán',1),(1614,21,'Cuautlancingo',1),(1615,21,'Cuayuca de Andrade',1),(1616,21,'Cuetzalan del Progreso',1),(1617,21,'Cuyoaco',1),(1618,21,'Chalchicomula de Sesma',1),(1619,21,'Chapulco',1),(1620,21,'Chiautla',1),(1621,21,'Chiautzingo',1),(1622,21,'Chiconcuautla',1),(1623,21,'Chichiquila',1),(1624,21,'Chietla',1),(1625,21,'Chigmecatitlán',1),(1626,21,'Chignahuapan',1),(1627,21,'Chignautla',1),(1628,21,'Chila',1),(1629,21,'Chila de la Sal',1),(1630,21,'Honey',1),(1631,21,'Chilchotla',1),(1632,21,'Chinantla',1),(1633,21,'Domingo Arenas',1),(1634,21,'Eloxochitlán',1),(1635,21,'Epatlán',1),(1636,21,'Esperanza',1),(1637,21,'Francisco Z. Mena',1),(1638,21,'General Felipe Ángeles',1),(1639,21,'Guadalupe',1),(1640,21,'Guadalupe Victoria',1),(1641,21,'Hermenegildo Galeana',1),(1642,21,'Huaquechula',1),(1643,21,'Huatlatlauca',1),(1644,21,'Huauchinango',1),(1645,21,'Huehuetla',1),(1646,21,'Huehuetlán el Chico',1),(1647,21,'Huejotzingo',1),(1648,21,'Hueyapan',1),(1649,21,'Hueytamalco',1),(1650,21,'Hueytlalpan',1),(1651,21,'Huitzilan de Serdán',1),(1652,21,'Huitziltepec',1),(1653,21,'Atlequizayan',1),(1654,21,'Ixcamilpa de Guerrero',1),(1655,21,'Ixcaquixtla',1),(1656,21,'Ixtacamaxtitlán',1),(1657,21,'Ixtepec',1),(1658,21,'Izúcar de Matamoros',1),(1659,21,'Jalpan',1),(1660,21,'Jolalpan',1),(1661,21,'Jonotla',1),(1662,21,'Jopala',1),(1663,21,'Juan C. Bonilla',1),(1664,21,'Juan Galindo',1),(1665,21,'Juan N. Méndez',1),(1666,21,'Lafragua',1),(1667,21,'Libres',1),(1668,21,'La Magdalena Tlatlauquitepec',1),(1669,21,'Mazapiltepec de Juárez',1),(1670,21,'Mixtla',1),(1671,21,'Molcaxac',1),(1672,21,'Cañada Morelos',1),(1673,21,'Naupan',1),(1674,21,'Nauzontla',1),(1675,21,'Nealtican',1),(1676,21,'Nicolás Bravo',1),(1677,21,'Nopalucan',1),(1678,21,'Ocotepec',1),(1679,21,'Ocoyucan',1),(1680,21,'Olintla',1),(1681,21,'Oriental',1),(1682,21,'Pahuatlán',1),(1683,21,'Palmar de Bravo',1),(1684,21,'Pantepec',1),(1685,21,'Petlalcingo',1),(1686,21,'Piaxtla',1),(1687,21,'Puebla',2),(1688,21,'Quecholac',1),(1689,21,'Quimixtlán',1),(1690,21,'Rafael Lara Grajales',1),(1691,21,'Los Reyes de Juárez',1),(1692,21,'San Andrés Cholula',1),(1693,21,'San Antonio Cañada',1),(1694,21,'San Diego la Mesa Tochimiltzingo',1),(1695,21,'San Felipe Teotlalcingo',1),(1696,21,'San Felipe Tepatlán',1),(1697,21,'San Gabriel Chilac',1),(1698,21,'San Gregorio Atzompa',1),(1699,21,'San Jerónimo Tecuanipan',1),(1700,21,'San Jerónimo Xayacatlán',1),(1701,21,'San José Chiapa',1),(1702,21,'San José Miahuatlán',1),(1703,21,'San Juan Atenco',1),(1704,21,'San Juan Atzompa',1),(1705,21,'San Martín Texmelucan',1),(1706,21,'San Martín Totoltepec',1),(1707,21,'San Matías Tlalancaleca',1),(1708,21,'San Miguel Ixitlán',1),(1709,21,'San Miguel Xoxtla',1),(1710,21,'San Nicolás Buenos Aires',1),(1711,21,'San Nicolás de los Ranchos',1),(1712,21,'San Pablo Anicano',1),(1713,21,'San Pedro Cholula',1),(1714,21,'San Pedro Yeloixtlahuaca',1),(1715,21,'San Salvador el Seco',1),(1716,21,'San Salvador el Verde',1),(1717,21,'San Salvador Huixcolotla',1),(1718,21,'San Sebastián Tlacotepec',1),(1719,21,'Santa Catarina Tlaltempan',1),(1720,21,'Santa Inés Ahuatempan',1),(1721,21,'Santa Isabel Cholula',1),(1722,21,'Santiago Miahuatlán',1),(1723,21,'Huehuetlán el Grande',1),(1724,21,'Santo Tomás Hueyotlipan',1),(1725,21,'Soltepec',1),(1726,21,'Tecali de Herrera',1),(1727,21,'Tecamachalco',1),(1728,21,'Tecomatlán',1),(1729,21,'Tehuacán',2),(1730,21,'Tehuitzingo',1),(1731,21,'Tenampulco',1),(1732,21,'Teopantlán',1),(1733,21,'Teotlalco',1),(1734,21,'Tepanco de López',1),(1735,21,'Tepango de Rodríguez',1),(1736,21,'Tepatlaxco de Hidalgo',1),(1737,21,'Tepeaca',1),(1738,21,'Tepemaxalco',1),(1739,21,'Tepeojuma',1),(1740,21,'Tepetzintla',1),(1741,21,'Tepexco',1),(1742,21,'Tepexi de Rodríguez',1),(1743,21,'Tepeyahualco',1),(1744,21,'Tepeyahualco de Cuauhtémoc',1),(1745,21,'Tetela de Ocampo',1),(1746,21,'Teteles de Avila Castillo',1),(1747,21,'Teziutlán',1),(1748,21,'Tianguismanalco',1),(1749,21,'Tilapa',1),(1750,21,'Tlacotepec de Benito Juárez',1),(1751,21,'Tlacuilotepec',1),(1752,21,'Tlachichuca',1),(1753,21,'Tlahuapan',1),(1754,21,'Tlaltenango',1),(1755,21,'Tlanepantla',1),(1756,21,'Tlaola',1),(1757,21,'Tlapacoya',1),(1758,21,'Tlapanalá',1),(1759,21,'Tlatlauquitepec',1),(1760,21,'Tlaxco',1),(1761,21,'Tochimilco',1),(1762,21,'Tochtepec',1),(1763,21,'Totoltepec de Guerrero',1),(1764,21,'Tulcingo',1),(1765,21,'Tuzamapan de Galeana',1),(1766,21,'Tzicatlacoyan',1),(1767,21,'Venustiano Carranza',1),(1768,21,'Vicente Guerrero',1),(1769,21,'Xayacatlán de Bravo',1),(1770,21,'Xicotepec',1),(1771,21,'Xicotlán',1),(1772,21,'Xiutetelco',1),(1773,21,'Xochiapulco',1),(1774,21,'Xochiltepec',1),(1775,21,'Xochitlán de Vicente Suárez',1),(1776,21,'Xochitlán Todos Santos',1),(1777,21,'Yaonáhuac',1),(1778,21,'Yehualtepec',1),(1779,21,'Zacapala',1),(1780,21,'Zacapoaxtla',1),(1781,21,'Zacatlán',1),(1782,21,'Zapotitlán',1),(1783,21,'Zapotitlán de Méndez',1),(1784,21,'Zaragoza',1),(1785,21,'Zautla',1),(1786,21,'Zihuateutla',1),(1787,21,'Zinacatepec',1),(1788,21,'Zongozotla',1),(1789,21,'Zoquiapan',1),(1790,21,'Zoquitlán',1),(1791,22,'Amealco de Bonfil',2),(1792,22,'Pinal de Amoles',2),(1793,22,'Arroyo Seco',2),(1794,22,'Cadereyta de Montes',2),(1795,22,'Colón',2),(1796,22,'Corregidora',2),(1797,22,'Ezequiel Montes',2),(1798,22,'Huimilpan',2),(1799,22,'Jalpan de Serra',2),(1800,22,'Landa de Matamoros',2),(1801,22,'El Marqués',2),(1802,22,'Pedro Escobedo',2),(1803,22,'Peñamiller',2),(1804,22,'Querétaro',2),(1805,22,'San Joaquín',2),(1806,22,'San Juan del Río',2),(1807,22,'Tequisquiapan',2),(1808,22,'Tolimán',2),(1809,23,'Cozumel',4),(1810,23,'Felipe Carrillo Puerto',3),(1811,23,'Isla Mujeres',3),(1812,23,'Othón P. Blanco',3),(1813,23,'Benito Juárez',4),(1814,23,'José María Morelos',3),(1815,23,'Lázaro Cárdenas',3),(1816,23,'Solidaridad',3),(1817,23,'Tulum',3),(1818,23,'Bacalar',3),(1819,23,'Puerto Morelos',3),(1820,24,'Ahualulco',1),(1821,24,'Alaquines',1),(1822,24,'Aquismón',1),(1823,24,'Armadillo de los Infante',1),(1824,24,'Cárdenas',1),(1825,24,'Catorce',1),(1826,24,'Cedral',1),(1827,24,'Cerritos',1),(1828,24,'Cerro de San Pedro',1),(1829,24,'Ciudad del Maíz',1),(1830,24,'Ciudad Fernández',1),(1831,24,'Tancanhuitz',1),(1832,24,'Ciudad Valles',1),(1833,24,'Coxcatlán',1),(1834,24,'Charcas',1),(1835,24,'Ebano',1),(1836,24,'Guadalcázar',1),(1837,24,'Huehuetlán',1),(1838,24,'Lagunillas',1),(1839,24,'Matehuala',1),(1840,24,'Mexquitic de Carmona',1),(1841,24,'Moctezuma',1),(1842,24,'Rayón',1),(1843,24,'Rioverde',1),(1844,24,'Salinas',1),(1845,24,'San Antonio',1),(1846,24,'San Ciro de Acosta',1),(1847,24,'San Luis Potosí',1),(1848,24,'San Martín Chalchicuautla',1),(1849,24,'San Nicolás Tolentino',1),(1850,24,'Santa Catarina',1),(1851,24,'Santa María del Río',1),(1852,24,'Santo Domingo',1),(1853,24,'San Vicente Tancuayalab',1),(1854,24,'Soledad de Graciano Sánchez',1),(1855,24,'Tamasopo',1),(1856,24,'Tamazunchale',1),(1857,24,'Tampacán',1),(1858,24,'Tampamolón Corona',1),(1859,24,'Tamuín',1),(1860,24,'Tanlajás',1),(1861,24,'Tanquián de Escobedo',1),(1862,24,'Tierra Nueva',1),(1863,24,'Vanegas',1),(1864,24,'Venado',1),(1865,24,'Villa de Arriaga',1),(1866,24,'Villa de Guadalupe',1),(1867,24,'Villa de la Paz',1),(1868,24,'Villa de Ramos',1),(1869,24,'Villa de Reyes',1),(1870,24,'Villa Hidalgo',1),(1871,24,'Villa Juárez',1),(1872,24,'Axtla de Terrazas',1),(1873,24,'Xilitla',1),(1874,24,'Zaragoza',1),(1875,24,'Villa de Arista',1),(1876,24,'Matlapa',1),(1877,24,'El Naranjo',1),(1878,25,'Ahome',2),(1879,25,'Angostura',2),(1880,25,'Badiraguato',2),(1881,25,'Concordia',2),(1882,25,'Cosalá',2),(1883,25,'Culiacán',2),(1884,25,'Choix',2),(1885,25,'Elota',2),(1886,25,'Escuinapa',2),(1887,25,'El Fuerte',2),(1888,25,'Guasave',2),(1889,25,'Mazatlán',4),(1890,25,'Mocorito',2),(1891,25,'Rosario',2),(1892,25,'Salvador Alvarado',2),(1893,25,'San Ignacio',2),(1894,25,'Sinaloa',2),(1895,25,'Navolato',2),(1896,26,'Aconchi',2),(1897,26,'Agua Prieta',3),(1898,26,'Alamos',2),(1899,26,'Altar',2),(1900,26,'Arivechi',2),(1901,26,'Arizpe',2),(1902,26,'Atil',2),(1903,26,'Bacadéhuachi',2),(1904,26,'Bacanora',2),(1905,26,'Bacerac',2),(1906,26,'Bacoachi',2),(1907,26,'Bácum',2),(1908,26,'Banámichi',2),(1909,26,'Baviácora',2),(1910,26,'Bavispe',2),(1911,26,'Benjamín Hill',2),(1912,26,'Caborca',2),(1913,26,'Cajeme',3),(1914,26,'Cananea',3),(1915,26,'Carbó',2),(1916,26,'La Colorada',2),(1917,26,'Cucurpe',2),(1918,26,'Cumpas',2),(1919,26,'Divisaderos',2),(1920,26,'Empalme',2),(1921,26,'Etchojoa',2),(1922,26,'Fronteras',2),(1923,26,'Granados',2),(1924,26,'Guaymas',3),(1925,26,'Hermosillo',3),(1926,26,'Huachinera',2),(1927,26,'Huásabas',2),(1928,26,'Huatabampo',2),(1929,26,'Huépac',2),(1930,26,'Imuris',2),(1931,26,'Magdalena',2),(1932,26,'Mazatán',2),(1933,26,'Moctezuma',2),(1934,26,'Naco',3),(1935,26,'Nácori Chico',2),(1936,26,'Nacozari de García',2),(1937,26,'Navojoa',2),(1938,26,'Nogales',3),(1939,26,'Onavas',2),(1940,26,'Opodepe',2),(1941,26,'Oquitoa',2),(1942,26,'Pitiquito',2),(1943,26,'Puerto Peñasco',2),(1944,26,'Quiriego',2),(1945,26,'Rayón',2),(1946,26,'Rosario',2),(1947,26,'Sahuaripa',2),(1948,26,'San Felipe de Jesús',2),(1949,26,'San Javier',2),(1950,26,'San Luis Río Colorado',3),(1951,26,'San Miguel de Horcasitas',2),(1952,26,'San Pedro de la Cueva',2),(1953,26,'Santa Ana',2),(1954,26,'Santa Cruz',2),(1955,26,'Sáric',2),(1956,26,'Soyopa',2),(1957,26,'Suaqui Grande',2),(1958,26,'Tepache',2),(1959,26,'Trincheras',2),(1960,26,'Tubutama',2),(1961,26,'Ures',2),(1962,26,'Villa Hidalgo',2),(1963,26,'Villa Pesqueira',2),(1964,26,'Yécora',2),(1965,26,'General Plutarco Elías Calles',2),(1966,26,'Benito Juárez',2),(1967,26,'San Ignacio Río Muerto',2),(1968,27,'Balancán',3),(1969,27,'Cárdenas',3),(1970,27,'Centla',3),(1971,27,'Centro',3),(1972,27,'Comalcalco',3),(1973,27,'Cunduacán',3),(1974,27,'Emiliano Zapata',3),(1975,27,'Huimanguillo',3),(1976,27,'Jalapa',3),(1977,27,'Jalpa de Méndez',3),(1978,27,'Jonuta',3),(1979,27,'Macuspana',3),(1980,27,'Nacajuca',3),(1981,27,'Paraíso',3),(1982,27,'Tacotalpa',3),(1983,27,'Teapa',3),(1984,27,'Tenosique',3),(1985,28,'Abasolo',2),(1986,28,'Aldama',2),(1987,28,'Altamira',2),(1988,28,'Antiguo Morelos',2),(1989,28,'Burgos',2),(1990,28,'Bustamante',2),(1991,28,'Camargo',2),(1992,28,'Casas',2),(1993,28,'Ciudad Madero',2),(1994,28,'Cruillas',2),(1995,28,'Gómez Farías',2),(1996,28,'González',2),(1997,28,'Güémez',2),(1998,28,'Guerrero',2),(1999,28,'Gustavo Díaz Ordaz',2),(2000,28,'Hidalgo',2),(2001,28,'Jaumave',2),(2002,28,'Jiménez',2),(2003,28,'Llera',2),(2004,28,'Mainero',2),(2005,28,'El Mante',2),(2006,28,'Matamoros',3),(2007,28,'Méndez',2),(2008,28,'Mier',2),(2009,28,'Miguel Alemán',2),(2010,28,'Miquihuana',2),(2011,28,'Nuevo Laredo',3),(2012,28,'Nuevo Morelos',2),(2013,28,'Ocampo',2),(2014,28,'Padilla',2),(2015,28,'Palmillas',2),(2016,28,'Reynosa',3),(2017,28,'Río Bravo',2),(2018,28,'San Carlos',2),(2019,28,'San Fernando',2),(2020,28,'San Nicolás',2),(2021,28,'Soto la Marina',2),(2022,28,'Tampico',3),(2023,28,'Tula',2),(2024,28,'Valle Hermoso',2),(2025,28,'Victoria',4),(2026,28,'Villagrán',2),(2027,28,'Xicoténcatl',2),(2028,29,'Amaxac de Guerrero',1),(2029,29,'Apetatitlán de Antonio Carvajal',1),(2030,29,'Atlangatepec',1),(2031,29,'Atltzayanca',1),(2032,29,'Apizaco',1),(2033,29,'Calpulalpan',1),(2034,29,'El Carmen Tequexquitla',1),(2035,29,'Cuapiaxtla',1),(2036,29,'Cuaxomulco',1),(2037,29,'Chiautempan',1),(2038,29,'Muñoz de Domingo Arenas',1),(2039,29,'Españita',1),(2040,29,'Huamantla',1),(2041,29,'Hueyotlipan',1),(2042,29,'Ixtacuixtla de Mariano Matamoros',1),(2043,29,'Ixtenco',1),(2044,29,'Mazatecochco de José María Morelos',1),(2045,29,'Contla de Juan Cuamatzi',1),(2046,29,'Tepetitla de Lardizábal',1),(2047,29,'Sanctórum de Lázaro Cárdenas',1),(2048,29,'Nanacamilpa de Mariano Arista',1),(2049,29,'Acuamanala de Miguel Hidalgo',1),(2050,29,'Natívitas',1),(2051,29,'Panotla',1),(2052,29,'San Pablo del Monte',1),(2053,29,'Santa Cruz Tlaxcala',1),(2054,29,'Tenancingo',1),(2055,29,'Teolocholco',1),(2056,29,'Tepeyanco',1),(2057,29,'Terrenate',1),(2058,29,'Tetla de la Solidaridad',1),(2059,29,'Tetlatlahuca',1),(2060,29,'Tlaxcala',1),(2061,29,'Tlaxco',1),(2062,29,'Tocatlán',1),(2063,29,'Totolac',1),(2064,29,'Ziltlaltépec de Trinidad Sánchez Santos',1),(2065,29,'Tzompantepec',1),(2066,29,'Xaloztoc',1),(2067,29,'Xaltocan',1),(2068,29,'Papalotla de Xicohténcatl',1),(2069,29,'Xicohtzinco',1),(2070,29,'Yauhquemehcan',1),(2071,29,'Zacatelco',1),(2072,29,'Benito Juárez',1),(2073,29,'Emiliano Zapata',1),(2074,29,'Lázaro Cárdenas',1),(2075,29,'La Magdalena Tlaltelulco',1),(2076,29,'San Damián Texóloc',1),(2077,29,'San Francisco Tetlanohcan',1),(2078,29,'San Jerónimo Zacualpan',1),(2079,29,'San José Teacalco',1),(2080,29,'San Juan Huactzinco',1),(2081,29,'San Lorenzo Axocomanitla',1),(2082,29,'San Lucas Tecopilco',1),(2083,29,'Santa Ana Nopalucan',1),(2084,29,'Santa Apolonia Teacalco',1),(2085,29,'Santa Catarina Ayometla',1),(2086,29,'Santa Cruz Quilehtla',1),(2087,29,'Santa Isabel Xiloxoxtla',1),(2088,30,'Acajete',1),(2089,30,'Acatlán',1),(2090,30,'Acayucan',1),(2091,30,'Actopan',1),(2092,30,'Acula',1),(2093,30,'Acultzingo',1),(2094,30,'Camarón de Tejeda',1),(2095,30,'Alpatláhuac',1),(2096,30,'Alto Lucero de Gutiérrez Barrios',1),(2097,30,'Altotonga',1),(2098,30,'Alvarado',1),(2099,30,'Amatitlán',1),(2100,30,'Naranjos Amatlán',1),(2101,30,'Amatlán de los Reyes',1),(2102,30,'Angel R. Cabada',1),(2103,30,'La Antigua',1),(2104,30,'Apazapan',1),(2105,30,'Aquila',1),(2106,30,'Astacinga',1),(2107,30,'Atlahuilco',1),(2108,30,'Atoyac',1),(2109,30,'Atzacan',1),(2110,30,'Atzalan',1),(2111,30,'Tlaltetela',1),(2112,30,'Ayahualulco',1),(2113,30,'Banderilla',1),(2114,30,'Benito Juárez',1),(2115,30,'Boca del Río',1),(2116,30,'Calcahualco',1),(2117,30,'Camerino Z. Mendoza',1),(2118,30,'Carrillo Puerto',1),(2119,30,'Catemaco',1),(2120,30,'Cazones de Herrera',1),(2121,30,'Cerro Azul',1),(2122,30,'Citlaltépetl',1),(2123,30,'Coacoatzintla',1),(2124,30,'Coahuitlán',1),(2125,30,'Coatepec',1),(2126,30,'Coatzacoalcos',3),(2127,30,'Coatzintla',1),(2128,30,'Coetzala',1),(2129,30,'Colipa',1),(2130,30,'Comapa',1),(2131,30,'Córdoba',1),(2132,30,'Cosamaloapan de Carpio',1),(2133,30,'Cosautlán de Carvajal',1),(2134,30,'Coscomatepec',1),(2135,30,'Cosoleacaque',1),(2136,30,'Cotaxtla',1),(2137,30,'Coxquihui',1),(2138,30,'Coyutla',1),(2139,30,'Cuichapa',1),(2140,30,'Cuitláhuac',1),(2141,30,'Chacaltianguis',1),(2142,30,'Chalma',1),(2143,30,'Chiconamel',1),(2144,30,'Chiconquiaco',1),(2145,30,'Chicontepec',1),(2146,30,'Chinameca',1),(2147,30,'Chinampa de Gorostiza',1),(2148,30,'Las Choapas',1),(2149,30,'Chocamán',1),(2150,30,'Chontla',1),(2151,30,'Chumatlán',1),(2152,30,'Emiliano Zapata',1),(2153,30,'Espinal',1),(2154,30,'Filomeno Mata',1),(2155,30,'Fortín',1),(2156,30,'Gutiérrez Zamora',1),(2157,30,'Hidalgotitlán',1),(2158,30,'Huatusco',1),(2159,30,'Huayacocotla',1),(2160,30,'Hueyapan de Ocampo',1),(2161,30,'Huiloapan de Cuauhtémoc',1),(2162,30,'Ignacio de la Llave',1),(2163,30,'Ilamatlán',1),(2164,30,'Isla',1),(2165,30,'Ixcatepec',1),(2166,30,'Ixhuacán de los Reyes',1),(2167,30,'Ixhuatlán del Café',1),(2168,30,'Ixhuatlancillo',1),(2169,30,'Ixhuatlán del Sureste',1),(2170,30,'Ixhuatlán de Madero',1),(2171,30,'Ixmatlahuacan',1),(2172,30,'Ixtaczoquitlán',1),(2173,30,'Jalacingo',1),(2174,30,'Xalapa',1),(2175,30,'Jalcomulco',1),(2176,30,'Jáltipan',1),(2177,30,'Jamapa',1),(2178,30,'Jesús Carranza',1),(2179,30,'Xico',1),(2180,30,'Jilotepec',1),(2181,30,'Juan Rodríguez Clara',1),(2182,30,'Juchique de Ferrer',1),(2183,30,'Landero y Coss',1),(2184,30,'Lerdo de Tejada',1),(2185,30,'Magdalena',1),(2186,30,'Maltrata',1),(2187,30,'Manlio Fabio Altamirano',1),(2188,30,'Mariano Escobedo',1),(2189,30,'Martínez de la Torre',1),(2190,30,'Mecatlán',1),(2191,30,'Mecayapan',1),(2192,30,'Medellín de Bravo',1),(2193,30,'Miahuatlán',1),(2194,30,'Las Minas',1),(2195,30,'Minatitlán',3),(2196,30,'Misantla',1),(2197,30,'Mixtla de Altamirano',1),(2198,30,'Moloacán',1),(2199,30,'Naolinco',1),(2200,30,'Naranjal',1),(2201,30,'Nautla',1),(2202,30,'Nogales',1),(2203,30,'Oluta',1),(2204,30,'Omealca',1),(2205,30,'Orizaba',1),(2206,30,'Otatitlán',1),(2207,30,'Oteapan',1),(2208,30,'Ozuluama de Mascareñas',1),(2209,30,'Pajapan',1),(2210,30,'Pánuco',1),(2211,30,'Papantla',1),(2212,30,'Paso del Macho',1),(2213,30,'Paso de Ovejas',1),(2214,30,'La Perla',1),(2215,30,'Perote',1),(2216,30,'Platón Sánchez',1),(2217,30,'Playa Vicente',1),(2218,30,'Poza Rica de Hidalgo',2),(2219,30,'Las Vigas de Ramírez',1),(2220,30,'Pueblo Viejo',1),(2221,30,'Puente Nacional',1),(2222,30,'Rafael Delgado',1),(2223,30,'Rafael Lucio',1),(2224,30,'Los Reyes',1),(2225,30,'Río Blanco',1),(2226,30,'Saltabarranca',1),(2227,30,'San Andrés Tenejapan',1),(2228,30,'San Andrés Tuxtla',1),(2229,30,'San Juan Evangelista',1),(2230,30,'Santiago Tuxtla',1),(2231,30,'Sayula de Alemán',1),(2232,30,'Soconusco',1),(2233,30,'Sochiapa',1),(2234,30,'Soledad Atzompa',1),(2235,30,'Soledad de Doblado',1),(2236,30,'Soteapan',1),(2237,30,'Tamalín',1),(2238,30,'Tamiahua',1),(2239,30,'Tampico Alto',1),(2240,30,'Tancoco',1),(2241,30,'Tantima',1),(2242,30,'Tantoyuca',1),(2243,30,'Tatatila',1),(2244,30,'Castillo de Teayo',1),(2245,30,'Tecolutla',1),(2246,30,'Tehuipango',1),(2247,30,'Álamo Temapache',1),(2248,30,'Tempoal',1),(2249,30,'Tenampa',1),(2250,30,'Tenochtitlán',1),(2251,30,'Teocelo',1),(2252,30,'Tepatlaxco',1),(2253,30,'Tepetlán',1),(2254,30,'Tepetzintla',1),(2255,30,'Tequila',1),(2256,30,'José Azueta',1),(2257,30,'Texcatepec',1),(2258,30,'Texhuacán',1),(2259,30,'Texistepec',1),(2260,30,'Tezonapa',1),(2261,30,'Tierra Blanca',1),(2262,30,'Tihuatlán',1),(2263,30,'Tlacojalpan',1),(2264,30,'Tlacolulan',1),(2265,30,'Tlacotalpan',1),(2266,30,'Tlacotepec de Mejía',1),(2267,30,'Tlachichilco',1),(2268,30,'Tlalixcoyan',1),(2269,30,'Tlalnelhuayocan',1),(2270,30,'Tlapacoyan',1),(2271,30,'Tlaquilpa',1),(2272,30,'Tlilapan',1),(2273,30,'Tomatlán',1),(2274,30,'Tonayán',1),(2275,30,'Totutla',1),(2276,30,'Tuxpan',2),(2277,30,'Tuxtilla',1),(2278,30,'Ursulo Galván',1),(2279,30,'Vega de Alatorre',1),(2280,30,'Veracruz',2),(2281,30,'Villa Aldama',1),(2282,30,'Xoxocotla',1),(2283,30,'Yanga',1),(2284,30,'Yecuatla',1),(2285,30,'Zacualpan',1),(2286,30,'Zaragoza',1),(2287,30,'Zentla',1),(2288,30,'Zongolica',1),(2289,30,'Zontecomatlán de López y Fuentes',1),(2290,30,'Zozocolco de Hidalgo',1),(2291,30,'Agua Dulce',1),(2292,30,'El Higo',1),(2293,30,'Nanchital de Lázaro Cárdenas del Río',1),(2294,30,'Tres Valles',1),(2295,30,'Carlos A. Carrillo',1),(2296,30,'Tatahuicapan de Juárez',1),(2297,30,'Uxpanapa',1),(2298,30,'San Rafael',1),(2299,30,'Santiago Sochiapan',1),(2300,31,'Abalá',2),(2301,31,'Acanceh',2),(2302,31,'Akil',2),(2303,31,'Baca',2),(2304,31,'Bokobá',2),(2305,31,'Buctzotz',2),(2306,31,'Cacalchén',2),(2307,31,'Calotmul',2),(2308,31,'Cansahcab',2),(2309,31,'Cantamayec',2),(2310,31,'Celestún',2),(2311,31,'Cenotillo',2),(2312,31,'Conkal',2),(2313,31,'Cuncunul',2),(2314,31,'Cuzamá',2),(2315,31,'Chacsinkín',2),(2316,31,'Chankom',2),(2317,31,'Chapab',2),(2318,31,'Chemax',2),(2319,31,'Chicxulub Pueblo',2),(2320,31,'Chichimilá',2),(2321,31,'Chikindzonot',2),(2322,31,'Chocholá',2),(2323,31,'Chumayel',2),(2324,31,'Dzán',2),(2325,31,'Dzemul',2),(2326,31,'Dzidzantún',2),(2327,31,'Dzilam de Bravo',2),(2328,31,'Dzilam González',2),(2329,31,'Dzitás',2),(2330,31,'Dzoncauich',2),(2331,31,'Espita',2),(2332,31,'Halachó',2),(2333,31,'Hocabá',2),(2334,31,'Hoctún',2),(2335,31,'Homún',2),(2336,31,'Huhí',2),(2337,31,'Hunucmá',2),(2338,31,'Ixil',2),(2339,31,'Izamal',2),(2340,31,'Kanasín',2),(2341,31,'Kantunil',2),(2342,31,'Kaua',2),(2343,31,'Kinchil',2),(2344,31,'Kopomá',2),(2345,31,'Mama',2),(2346,31,'Maní',2),(2347,31,'Maxcanú',2),(2348,31,'Mayapán',2),(2349,31,'Mérida',3),(2350,31,'Mocochá',2),(2351,31,'Motul',2),(2352,31,'Muna',2),(2353,31,'Muxupip',2),(2354,31,'Opichén',2),(2355,31,'Oxkutzcab',2),(2356,31,'Panabá',2),(2357,31,'Peto',2),(2358,31,'Progreso',2),(2359,31,'Quintana Roo',2),(2360,31,'Río Lagartos',2),(2361,31,'Sacalum',2),(2362,31,'Samahil',2),(2363,31,'Sanahcat',2),(2364,31,'San Felipe',2),(2365,31,'Santa Elena',2),(2366,31,'Seyé',2),(2367,31,'Sinanché',2),(2368,31,'Sotuta',2),(2369,31,'Sucilá',2),(2370,31,'Sudzal',2),(2371,31,'Suma',2),(2372,31,'Tahdziú',2),(2373,31,'Tahmek',2),(2374,31,'Teabo',2),(2375,31,'Tecoh',2),(2376,31,'Tekal de Venegas',2),(2377,31,'Tekantó',2),(2378,31,'Tekax',2),(2379,31,'Tekit',2),(2380,31,'Tekom',2),(2381,31,'Telchac Pueblo',2),(2382,31,'Telchac Puerto',2),(2383,31,'Temax',2),(2384,31,'Temozón',2),(2385,31,'Tepakán',2),(2386,31,'Tetiz',2),(2387,31,'Teya',2),(2388,31,'Ticul',2),(2389,31,'Timucuy',2),(2390,31,'Tinum',2),(2391,31,'Tixcacalcupul',2),(2392,31,'Tixkokob',2),(2393,31,'Tixmehuac',2),(2394,31,'Tixpéhual',2),(2395,31,'Tizimín',2),(2396,31,'Tunkás',2),(2397,31,'Tzucacab',2),(2398,31,'Uayma',2),(2399,31,'Ucú',2),(2400,31,'Umán',2),(2401,31,'Valladolid',2),(2402,31,'Xocchel',2),(2403,31,'Yaxcabá',2),(2404,31,'Yaxkukul',2),(2405,31,'Yobaín',2),(2406,32,'Apozol',1),(2407,32,'Apulco',1),(2408,32,'Atolinga',1),(2409,32,'Benito Juárez',1),(2410,32,'Calera',1),(2411,32,'Cañitas de Felipe Pescador',1),(2412,32,'Concepción del Oro',1),(2413,32,'Cuauhtémoc',1),(2414,32,'Chalchihuites',1),(2415,32,'Fresnillo',1),(2416,32,'Trinidad García de la Cadena',1),(2417,32,'Genaro Codina',1),(2418,32,'General Enrique Estrada',1),(2419,32,'General Francisco R. Murguía',1),(2420,32,'El Plateado de Joaquín Amaro',1),(2421,32,'General Pánfilo Natera',1),(2422,32,'Guadalupe',1),(2423,32,'Huanusco',1),(2424,32,'Jalpa',1),(2425,32,'Jerez',1),(2426,32,'Jiménez del Teul',1),(2427,32,'Juan Aldama',1),(2428,32,'Juchipila',1),(2429,32,'Loreto',1),(2430,32,'Luis Moya',1),(2431,32,'Mazapil',1),(2432,32,'Melchor Ocampo',1),(2433,32,'Mezquital del Oro',1),(2434,32,'Miguel Auza',1),(2435,32,'Momax',1),(2436,32,'Monte Escobedo',1),(2437,32,'Morelos',1),(2438,32,'Moyahua de Estrada',1),(2439,32,'Nochistlán de Mejía',1),(2440,32,'Noria de Ángeles',1),(2441,32,'Ojocaliente',1),(2442,32,'Pánuco',1),(2443,32,'Pinos',1),(2444,32,'Río Grande',1),(2445,32,'Sain Alto',1),(2446,32,'El Salvador',1),(2447,32,'Sombrerete',1),(2448,32,'Susticacán',1),(2449,32,'Tabasco',1),(2450,32,'Tepechitlán',1),(2451,32,'Tepetongo',1),(2452,32,'Teúl de González Ortega',1),(2453,32,'Tlaltenango de Sánchez Román',1),(2454,32,'Valparaíso',1),(2455,32,'Vetagrande',1),(2456,32,'Villa de Cos',1),(2457,32,'Villa García',1),(2458,32,'Villa González Ortega',1),(2459,32,'Villa Hidalgo',1),(2460,32,'Villanueva',1),(2461,32,'Zacatecas',2),(2462,32,'Trancoso',1),(2463,32,'Santa María de la Paz',1);
/*!40000 ALTER TABLE `municipio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pais`
--

DROP TABLE IF EXISTS `pais`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pais` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `id_continente` int(11) DEFAULT NULL,
  `zona` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=184 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pais`
--

LOCK TABLES `pais` WRITE;
/*!40000 ALTER TABLE `pais` DISABLE KEYS */;
INSERT INTO `pais` VALUES (1,'BELICE',1,1),(2,'COSTA RICA',1,1),(3,'CUBA',1,1),(4,'CHILE',1,1),(5,'REPUBLICA DOMINICANA',1,1),(6,'GUATEMALA',1,1),(7,'JAMAICA',1,1),(8,'NICARAGUA',1,1),(9,'PANAMA',1,1),(10,'PUERTO RICO',1,1),(11,'VENEZUELA',1,1),(12,'ANTILLAS MENORES',1,2),(13,'ARGENTINA',1,2),(14,'BAHAMAS',1,2),(15,'COLOMBIA',1,2),(16,'EL SALVADOR',1,2),(17,'HONDURAS',1,2),(18,'SURINAM',1,2),(19,'BERMUDAS',1,2),(20,'BOLIVIA',1,3),(21,'BRASIL',1,3),(22,'CANADA',1,3),(23,'ECUADOR',1,3),(24,'ESTADOS UNIDOS DE AMERICA',1,3),(25,'GUYANA',1,3),(26,'HAITI',1,3),(27,'PARAGUAY',1,3),(28,'PERU',1,3),(29,'URUGUAY',1,3),(30,'ALBANIA',2,1),(31,'ANDORRA',2,1),(32,'BULGARIA',2,1),(33,'MONACO',2,1),(34,'POLONIA',2,1),(35,'REPUBLICA CHECA',2,1),(36,'TERRITORIO YUGOSLAVO',2,1),(37,'ESLOVAQUIA',2,1),(38,'UCRANIA',2,1),(39,'BELARUS',2,1),(40,'LIECHTENSTEIN',2,1),(41,'MOLDOVA',2,1),(42,'AUSTRIA',2,2),(43,'DINAMARCA',2,2),(44,'HUNGRIA',2,2),(45,'REPUBLICA DE IRLANDA',2,2),(46,'ISLANDIA',2,2),(47,'PAISES BALTICOS',2,2),(48,'LUXEMBURGO',2,2),(49,'NORUEGA',2,2),(50,'RUSIA',2,2),(51,'TURKMENISTAN',2,2),(52,'ARMENIA',2,2),(53,'AZERBAIYAN',2,2),(54,'GEORGIA',2,2),(55,'AFGANISTAN',2,2),(56,'KAZAJSTAN',2,2),(57,'KIRGUISTAN',2,2),(58,'TAYIKISTAN',2,2),(59,'UZBEKISTAN',2,2),(60,'ALEMANIA',2,3),(61,'BELGICA',2,3),(62,'ESPANA',2,3),(63,'FINLANDIA',2,3),(64,'FRANCIA',2,3),(65,'ALEMANIA',2,3),(66,'REINO UNIDO',2,3),(67,'GRECIA',2,3),(68,'PAISES BAJOS',2,3),(69,'ITALIA',2,3),(70,'MALTA',2,3),(71,'PORTUGAL',2,3),(72,'SAN MARINO',2,3),(73,'SUECIA',2,3),(74,'SUIZA',2,3),(75,'AUSTRALIA',3,2),(76,'FIYI',3,2),(77,'KIRIBATI',3,2),(78,'ISLAS MARSHALL',3,2),(79,'ISLAS SALOMON',3,2),(80,'MICRONESIA',3,2),(81,'NAURU',3,2),(82,'NUEVA ZELANDA',3,2),(83,'PALAOS',3,2),(84,'PAPUA NUEVA GUINEA',3,2),(85,'SAMOA',3,2),(86,'TONGA',3,2),(87,'TUVALU',3,2),(88,'VANUATU',3,2),(89,'ZAMBIA',4,1),(90,'SUDAFRICA',4,1),(91,'MAURITANIA',4,1),(92,'GABON',4,1),(93,'LIBIA',4,1),(94,'ANGOLA',4,1),(95,'DJIBOUTI',4,1),(96,'GAMBIA',4,1),(97,'LESOTHO',4,1),(98,'NAMIBIA',4,1),(99,'SOMALIA',4,1),(100,'TOGO',4,1),(101,'ZIMBABWE',4,1),(102,'SAMBIA',4,1),(103,'ARGELIA',4,2),(104,'ETIOPIA',4,2),(105,'SENEGAL',4,2),(106,'EGIPTO',4,2),(107,'MARRUECOS',4,2),(108,'MOZAMBIQUE',4,2),(109,'KENIA',4,2),(110,'SUDAN',4,2),(111,'COSTA DE MARFIL',4,2),(112,'GUINEA ECUATORIAL',4,2),(113,'SANTO TOME Y PRINCIPE',4,2),(114,'SUAZILANDIA',4,2),(115,'TUNEZ',4,2),(116,'ERITREA',4,2),(117,'GHANA',4,3),(118,'MALI',4,3),(119,'TANZANIA',4,3),(120,'SIERRA LEONA',4,3),(121,'BURKINA FASO',4,3),(122,'SEYCHELLES',4,3),(123,'BOTSWANA',4,3),(124,'BURUNDI',4,3),(125,'CABO VERDE',4,3),(126,'CAMERUN',4,3),(127,'REPUBLICA CENTRO AFRICANA',4,3),(128,'ISLAS COMORAS',4,3),(129,'REPUBLICA DEL CONGO',4,3),(130,'CHAD',4,3),(131,'GUINEA',4,3),(132,'GUINEA BISSAU',4,3),(133,'LIBERIA',4,3),(134,'MADAGASCAR',4,3),(135,'MALAWI',4,3),(136,'MAURICIO',4,3),(137,'NIGER',4,3),(138,'NIGERIA',4,3),(139,'RUANDA',4,3),(140,'BENIN',4,3),(141,'REPUBLICA DEMOCRATICA DEL CONGO',4,3),(142,'UGANDA',4,3),(143,'AFGANISTAN',5,1),(144,'BANGLADESH',5,1),(145,'BRUNEI',5,1),(146,'COREA DEL SUR',5,1),(147,'CHIPRE',5,1),(148,'CAPITAL DE SIRIA',5,1),(149,'INDIA',5,1),(150,'INDONESIA',5,1),(151,'IRAK',5,1),(152,'JORDANIA',5,1),(153,'KUWAIT',5,1),(154,'LIBANO',5,1),(155,'NEPAL',5,1),(156,'PAKISTAN',5,1),(157,'SINGAPUR',5,1),(158,'ARABIA SAUDITA',5,2),(159,'BUTAN',5,2),(160,'COREA DEL NORTE',5,2),(161,'REPUBLICA POPULAR DE CHINA',5,2),(162,'HONG KONG',5,2),(163,'MALDIVAS',5,2),(164,'MONGOLIA',5,2),(165,'REPUBLICA DE CHINA',5,2),(166,'VIETNAM',5,2),(167,'BAHREIN',5,3),(168,'MYANMAR',5,3),(169,'EMIRATOS ARABES UNIDOS',5,3),(170,'FILIPINAS',5,3),(171,'IRAN',5,3),(172,'ISRAEL',5,3),(173,'JAPON',5,3),(174,'CAMBOYA',5,3),(175,'QATAR',5,3),(176,'LAOS',5,3),(177,'MALASIA',5,3),(178,'OMAN',5,3),(179,'SIRIA',5,3),(180,'SRI LANKA',5,3),(181,'TAILANDIA',5,3),(182,'TURQUIA',5,3),(183,'YEMEN',5,3);
/*!40000 ALTER TABLE `pais` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `programa_trabajo`
--

DROP TABLE IF EXISTS `programa_trabajo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `programa_trabajo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dia` datetime DEFAULT NULL,
  `lugar_estancia` varchar(45) DEFAULT NULL,
  `tareas_realizar` text,
  `id_solicitud_comision` int(11) NOT NULL,
  PRIMARY KEY (`id`,`id_solicitud_comision`),
  KEY `fk_programa_trabajo_solicitud_comision1_idx` (`id_solicitud_comision`),
  CONSTRAINT `fk_programa_trabajo_solicitud_comision1` FOREIGN KEY (`id_solicitud_comision`) REFERENCES `solicitud_comision` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `programa_trabajo`
--

LOCK TABLES `programa_trabajo` WRITE;
/*!40000 ALTER TABLE `programa_trabajo` DISABLE KEYS */;
/*!40000 ALTER TABLE `programa_trabajo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `solicitud_comision`
--

DROP TABLE IF EXISTS `solicitud_comision`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `solicitud_comision` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha_solicitud` datetime DEFAULT NULL,
  `fecha_inicio` date DEFAULT NULL,
  `fecha_fin` date DEFAULT NULL,
  `tipo_comision` int(11) NOT NULL,
  `id_pais` int(11) DEFAULT NULL,
  `id_municipio` int(11) DEFAULT NULL,
  `id_usuario` int(11) NOT NULL,
  `justificacion` text,
  `status` int(11) NOT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `solicitud_comision`
--

LOCK TABLES `solicitud_comision` WRITE;
/*!40000 ALTER TABLE `solicitud_comision` DISABLE KEYS */;
/*!40000 ALTER TABLE `solicitud_comision` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `solicitud_viatico`
--

DROP TABLE IF EXISTS `solicitud_viatico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `solicitud_viatico` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_solicitud_comision` int(11) NOT NULL,
  `invitado_nombre` varchar(45) DEFAULT NULL,
  `fecha_solicitud` datetime DEFAULT NULL,
  `comentarios` varchar(45) DEFAULT NULL,
  `status` int(11) NOT NULL,
  `comentario_rechazo` tinytext,
  `fecha_revisado` datetime DEFAULT NULL,
  `nombre_revisado` varchar(45) DEFAULT NULL,
  `fecha_aceptado` datetime DEFAULT NULL,
  `nombre_aceptado` varchar(45) DEFAULT NULL,
  `fecha_creacion` datetime NOT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  `id_usuario` int(11) NOT NULL,
  PRIMARY KEY (`id`,`id_solicitud_comision`,`id_usuario`),
  KEY `fk_solicitud_viatico_solicitud_comision1_idx` (`id_solicitud_comision`),
  KEY `fk_solicitud_viatico_usuario1_idx` (`id_usuario`),
  CONSTRAINT `fk_solicitud_viatico_solicitud_comision1` FOREIGN KEY (`id_solicitud_comision`) REFERENCES `solicitud_comision` (`id`),
  CONSTRAINT `fk_solicitud_viatico_usuario1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`codigo`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `solicitud_viatico`
--

LOCK TABLES `solicitud_viatico` WRITE;
/*!40000 ALTER TABLE `solicitud_viatico` DISABLE KEYS */;
/*!40000 ALTER TABLE `solicitud_viatico` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `codigo` int(11) NOT NULL,
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
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (4636,'RUTH','PADILLA MUÑOZ','A','$2a$09$ZkmcLMALbpHgPU3O4A7DOOMIFJAKXnMN5swAYpPfhEUj6Pvb7ICh6','RECTORIA','RECTORA DE CENTRO','2020-03-04 14:48:02',NULL,'1234',NULL);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `viatico_proyecto`
--

DROP TABLE IF EXISTS `viatico_proyecto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `viatico_proyecto` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha_solicitud` datetime NOT NULL,
  `numero_proyecto` varchar(45) NOT NULL,
  `cantidad` decimal(10,2) DEFAULT NULL,
  `id_solicitud_viatico` int(11) NOT NULL,
  `fecha_aceptado` datetime DEFAULT NULL,
  `nombre_aceptado` varchar(45) DEFAULT NULL,
  `status` int(11) NOT NULL,
  PRIMARY KEY (`id`,`id_solicitud_viatico`),
  KEY `fk_proyecto_solicitud_viatico1_idx` (`id_solicitud_viatico`),
  CONSTRAINT `fk_proyecto_solicitud_viatico1` FOREIGN KEY (`id_solicitud_viatico`) REFERENCES `solicitud_viatico` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `viatico_proyecto`
--

LOCK TABLES `viatico_proyecto` WRITE;
/*!40000 ALTER TABLE `viatico_proyecto` DISABLE KEYS */;
/*!40000 ALTER TABLE `viatico_proyecto` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-03-04 14:53:40
