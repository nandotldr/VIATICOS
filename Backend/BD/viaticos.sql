-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 31-01-2020 a las 22:27:36
-- Versión del servidor: 10.1.36-MariaDB
-- Versión de PHP: 7.2.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `viaticos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `agenda`
--

CREATE TABLE `agenda` (
  `id` int(11) NOT NULL,
  `dia` date DEFAULT NULL,
  `hora_inicio` time(3) DEFAULT NULL,
  `hora_fin` time(3) DEFAULT NULL,
  `actividad` tinytext,
  `id_informe_actividades` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `factura`
--

CREATE TABLE `factura` (
  `id` int(11) NOT NULL,
  `archivo_url` varchar(45) DEFAULT NULL,
  `id_informe_actividades` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gasto`
--

CREATE TABLE `gasto` (
  `id` int(11) NOT NULL,
  `dia` date DEFAULT NULL,
  `alimentacion` decimal(10,2) DEFAULT NULL,
  `hospedaje` decimal(10,2) DEFAULT NULL,
  `transporte_foraneo` decimal(10,2) DEFAULT NULL,
  `transporte_local` decimal(10,2) DEFAULT NULL,
  `combustible` decimal(10,2) DEFAULT NULL,
  `otros_conceptos` decimal(10,2) DEFAULT NULL,
  `id_solicitud_viatico` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `informe_actividades`
--

CREATE TABLE `informe_actividades` (
  `id` int(11) NOT NULL,
  `resultados` text,
  `observaciones` tinytext,
  `fecha_elaboracion` datetime DEFAULT NULL,
  `fecha_aprobacion` datetime DEFAULT NULL,
  `nombre_aprobacion` varchar(45) DEFAULT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_solicitud_comision` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `itinerario`
--

CREATE TABLE `itinerario` (
  `id` int(11) NOT NULL,
  `dia` datetime DEFAULT NULL,
  `origen` varchar(45) DEFAULT NULL,
  `destino` varchar(45) DEFAULT NULL,
  `id_informe_actividades` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `municipio`
--

CREATE TABLE `municipio` (
  `id` int(11) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `zona` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `municipio`
--

INSERT INTO `municipio` (`id`, `nombre`, `zona`) VALUES
(1, 'zapopan', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pais`
--

CREATE TABLE `pais` (
  `id` int(11) NOT NULL,
  `zona` int(11) DEFAULT NULL,
  `nombre` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `pais`
--

INSERT INTO `pais` (`id`, `zona`, `nombre`) VALUES
(1, 2, 'chile');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `programa_trabajo`
--

CREATE TABLE `programa_trabajo` (
  `id` int(11) NOT NULL,
  `dia` datetime DEFAULT NULL,
  `lugar_estancia` varchar(45) DEFAULT NULL,
  `tareas_realizar` text,
  `id_solicitud_comision` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `programa_trabajo`
--

INSERT INTO `programa_trabajo` (`id`, `dia`, `lugar_estancia`, `tareas_realizar`, `id_solicitud_comision`) VALUES
(1, '2020-02-12 00:00:00', 'zapopan', 'exponer', 2),
(2, '2020-02-13 00:00:00', 'guadalajara', 'exponer', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitud_comision`
--

CREATE TABLE `solicitud_comision` (
  `id` int(11) NOT NULL,
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
  `fecha_modificacion` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `solicitud_comision`
--

INSERT INTO `solicitud_comision` (`id`, `fecha_solicitud`, `fecha_inicio`, `fecha_fin`, `tipo_comision`, `id_pais`, `id_municipio`, `id_usuario`, `justificacion`, `status`, `objetivo_trabajo`, `area_adscripcion`, `nombre_comision`, `comentario_rechazo`, `fecha_revisado`, `fecha_aceptado`, `nombre_revisado`, `nombre_aceptado`, `programa_evento`, `invitacion_evento`, `fecha_creacion`, `fecha_modificacion`) VALUES
(2, '2020-01-28 16:35:29', '2020-02-12', '2020-02-15', 1, NULL, 1, 210545544, 'necesito saber', 6, 'saber it', NULL, 'tecnologias', '', NULL, '2020-01-30 03:22:47', NULL, 'Jairo Jahaziel Gonzalez Casillas', 'programatecno', 'intacioneve', '2020-01-28 16:35:29', '2020-01-30 03:22:47'),
(3, '2020-01-28 16:40:03', '2020-02-12', '2020-02-15', 1, NULL, 1, 210545544, 'necesito saber', 6, 'saber it', NULL, 'tecnologias', NULL, NULL, NULL, NULL, NULL, 'programatecno', 'intacioneve', '2020-01-28 16:40:03', NULL),
(4, '2020-01-28 16:41:05', '2020-02-12', '2020-02-15', 1, NULL, 1, 210545544, 'necesito saber', -1, 'saber it', NULL, 'tecnologias', NULL, NULL, NULL, NULL, NULL, 'programatecno', 'intacioneve', '2020-01-28 16:41:05', NULL),
(5, '2020-01-28 16:42:35', '2020-02-12', '2020-02-15', 1, NULL, 1, 2828001, 'necesito saber', 1, 'saber it', NULL, 'tecnologias', NULL, NULL, NULL, NULL, NULL, 'programatecno', 'intacioneve', '2020-01-28 16:42:35', NULL),
(6, '2020-01-28 16:43:58', '2020-02-12', '2020-02-15', 1, NULL, 1, 2828001, 'necesito saber', 4, 'saber it', NULL, 'tecnologias', NULL, NULL, NULL, NULL, NULL, 'programatecno', 'intacioneve', '2020-01-28 16:43:58', NULL),
(8, '2020-01-28 17:19:24', '2020-02-12', '2020-02-15', 0, 1, NULL, 2828001, 'necesito saber', 1, 'saber it', NULL, 'tecnologias', '', '2020-01-30 03:02:36', '2020-01-30 03:04:04', NULL, NULL, 'programatecno', 'intacioneve', '2020-01-28 17:19:24', '2020-01-30 03:04:04'),
(9, '2020-01-28 17:20:25', '2020-02-12', '2020-02-15', 1, NULL, 1, 2828001, 'necesito saber', 5, 'saber it', NULL, 'tecnologias', '', '2020-01-30 03:24:09', '2020-01-30 03:24:55', 'Octavio Romo Romo', 'Jairo Jahaziel Gonzalez Casillas', 'programatecno', 'intacioneve', '2020-01-28 17:20:25', '2020-01-30 03:24:55'),
(10, '2020-01-28 22:30:27', '2020-03-12', '2020-03-25', 0, 1, NULL, 2828001, 'necesito ', 3, 'saber ang', NULL, 'tecnologia', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2020-01-28 22:30:27', NULL),
(12, '2020-01-29 23:16:40', '2020-02-29', '0000-00-00', 0, 1, NULL, 210545544, 'Quiero ir a una conferencia.', 6, 'Aprender cosas y traer regalos.', NULL, 'Comic-Con Estambul 2019', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2020-01-29 23:16:40', NULL),
(13, '2020-01-30 19:29:28', '2020-04-04', '2020-04-07', 0, 1, NULL, 210545544, 'Quiero ir a una .', 0, 'Aprender cosas.', NULL, ' Madrid 2020', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2020-01-29 23:20:18', '2020-01-30 19:29:28'),
(14, '2020-01-29 23:22:37', '2020-03-04', '2020-03-07', 1, NULL, 1, 210545544, 'Quiero ir a una conferencia.', 6, 'Aprender cosas y traer regalos.', NULL, 'Comic-Con Estambul 2019', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2020-01-29 23:22:37', NULL),
(15, '2020-01-29 23:27:42', '2020-03-04', '2020-03-07', 1, NULL, 1, 210545544, 'Quiero ir a una conferencia.', 6, 'Aprender cosas y traer regalos.', NULL, 'Comic-Con Estambul 2019', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2020-01-29 23:27:42', NULL),
(16, '2020-01-29 23:28:12', '2020-03-04', '2020-03-07', 1, NULL, 1, 210545544, 'Quiero ir a una conferencia.', 5, 'Aprender cosas y traer regalos.', NULL, 'Comic-Con Estambul 2019', '', '2020-01-30 22:40:49', NULL, 'Octavio  Romo', NULL, NULL, NULL, '2020-01-29 23:28:12', '2020-01-30 22:40:49'),
(17, '2020-01-30 19:18:22', '2020-03-04', '2020-03-07', 1, NULL, 1, 210545544, 'Quiero ir a una conferencia.', 0, 'Aprender cosas y traer regalos.', NULL, 'Comic-Con Estambul 2019', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2020-01-30 19:18:22', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitud_viatico`
--

CREATE TABLE `solicitud_viatico` (
  `id` int(11) NOT NULL,
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
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `solicitud_viatico`
--

INSERT INTO `solicitud_viatico` (`id`, `id_solicitud_comision`, `invitado_nombre`, `fecha_solicitud`, `comentarios`, `status`, `comentario_rechazo`, `fecha_revisado`, `nombre_revisado`, `fecha_aceptado`, `nombre_aceptado`, `fecha_creacion`, `fecha_modificacion`, `id_usuario`) VALUES
(1, 16, NULL, '2020-01-30 23:51:00', 'verificar factura', 5, NULL, '2020-01-30 23:51:00', 'OCTAVIO ROMO', '2020-01-30 23:51:00', 'JAIRO GONZALEZ', '2020-01-30 23:51:00', NULL, 210545544);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

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
  `area_adcripcion_revisa` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`codigo`, `nombres`, `apellidos`, `tipo_usuario`, `nip`, `area_adscripcion`, `plaza_laboral`, `fecha_creacion`, `fecha_modificacion`, `numero_social`, `area_adcripcion_revisa`) VALUES
(3, 'jose', 'ramirez', 'J', '$12$OTK/E10mpkjrs/78j7w3Ie6XLlW44OnuGeqEJMyy8E9v1nfnxY2vq', 'QUIMICA', 'Investigador', '2020-01-30 03:43:00', NULL, '9288282828', NULL),
(88271, 'PATTY', 'Gonzalez Casillas', 'J', '$2a$09$WBCsQa.yAccnuaKn5ktgDeFRcgrULfifmvz0UWn3twmDhNoB9yIxy', 'Informatica', 'Maestro', '2020-01-30 22:26:52', NULL, '1234', NULL),
(2828001, 'Jario ', 'Gonzalez', 'P', '\r\n$2y$12$OTK/E10mpkjrs/78j7w3Ie6XLlW44OnuGeqEJMyy8E9v1nfnxY2vq\r\n', 'INFORMATICA', 'Investigador', '2020-01-28 12:13:47', NULL, '99939392993', NULL),
(21169376, 'Octavio ', 'Romo', 'J', '$2a$09$FaPQTHMHmix2UStVDp2ODekH14SM9NqBsSI8e04ELVJgV8ka6Veg2', 'QUIMICA', 'Maestro', '2020-01-30 22:33:39', NULL, '1234', NULL),
(78020819, 'ALEJANDRO ', 'GONZALEZ', 'P', '$2a$09$XuBWzoOJYpM6kyY2IqIAGeCh7mLjv2kzw2LFN4wOIeeZOwzRS0246', 'ELECTRONICA', 'MAESTRO', '2020-01-30 23:06:17', NULL, '1234', NULL),
(210545544, 'Monserrat Elizabeth', 'Guerrero Garcia', 'P', '$2y$12$pb.nwfTsME7POgW5SVz5jev0nVFY7nqhgm96aIemqPS2gmvjAkGn6', 'QUIMICA', 'Estudiante', '2020-01-28 11:49:00', '2020-01-30 01:52:55', '8837020188839', NULL),
(211707262, 'Jairo Jahaziel', 'Gonzalez Casillas', 'A', '\r\n$2y$12$OTK/E10mpkjrs/78j7w3Ie6XLlW44OnuGeqEJMyy8E9v1nfnxY2vq\r\n', 'INFORMATICA', 'Maestro', '2020-01-29 01:50:35', NULL, '1234', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `viatico_proyecto`
--

CREATE TABLE `viatico_proyecto` (
  `id` int(11) NOT NULL,
  `fecha_solicitud` datetime NOT NULL,
  `numero_proyecto` varchar(45) NOT NULL,
  `cantidad` decimal(10,2) DEFAULT NULL,
  `id_solicitud_viatico` int(11) NOT NULL,
  `fecha_aceptado` datetime DEFAULT NULL,
  `nombre_aceptado` varchar(45) DEFAULT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `agenda`
--
ALTER TABLE `agenda`
  ADD PRIMARY KEY (`id`,`id_informe_actividades`),
  ADD KEY `fk_agenda_informe_actividades1_idx` (`id_informe_actividades`);

--
-- Indices de la tabla `factura`
--
ALTER TABLE `factura`
  ADD PRIMARY KEY (`id`,`id_informe_actividades`),
  ADD KEY `fk_factura_informe_actividades1_idx` (`id_informe_actividades`);

--
-- Indices de la tabla `gasto`
--
ALTER TABLE `gasto`
  ADD PRIMARY KEY (`id`,`id_solicitud_viatico`),
  ADD KEY `fk_gastos_solicitud_viatico1_idx` (`id_solicitud_viatico`);

--
-- Indices de la tabla `informe_actividades`
--
ALTER TABLE `informe_actividades`
  ADD PRIMARY KEY (`id`,`id_usuario`,`id_solicitud_comision`),
  ADD KEY `fk_informe_actividades_usuario1_idx` (`id_usuario`),
  ADD KEY `fk_informe_actividades_solicitud_comision1_idx` (`id_solicitud_comision`);

--
-- Indices de la tabla `itinerario`
--
ALTER TABLE `itinerario`
  ADD PRIMARY KEY (`id`,`id_informe_actividades`),
  ADD KEY `fk_itinerario_informe_actividades1_idx` (`id_informe_actividades`);

--
-- Indices de la tabla `municipio`
--
ALTER TABLE `municipio`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `pais`
--
ALTER TABLE `pais`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `programa_trabajo`
--
ALTER TABLE `programa_trabajo`
  ADD PRIMARY KEY (`id`,`id_solicitud_comision`),
  ADD KEY `fk_programa_trabajo_solicitud_comision1_idx` (`id_solicitud_comision`);

--
-- Indices de la tabla `solicitud_comision`
--
ALTER TABLE `solicitud_comision`
  ADD PRIMARY KEY (`id`,`id_usuario`),
  ADD KEY `fk_solicitud_comision_pais_idx` (`id_pais`),
  ADD KEY `fk_solicitud_comision_municipio1_idx` (`id_municipio`),
  ADD KEY `fk_solicitud_comision_usuario1_idx` (`id_usuario`);

--
-- Indices de la tabla `solicitud_viatico`
--
ALTER TABLE `solicitud_viatico`
  ADD PRIMARY KEY (`id`,`id_solicitud_comision`,`id_usuario`),
  ADD KEY `fk_solicitud_viatico_solicitud_comision1_idx` (`id_solicitud_comision`),
  ADD KEY `fk_solicitud_viatico_usuario1_idx` (`id_usuario`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`codigo`);

--
-- Indices de la tabla `viatico_proyecto`
--
ALTER TABLE `viatico_proyecto`
  ADD PRIMARY KEY (`id`,`id_solicitud_viatico`),
  ADD KEY `fk_proyecto_solicitud_viatico1_idx` (`id_solicitud_viatico`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `agenda`
--
ALTER TABLE `agenda`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `factura`
--
ALTER TABLE `factura`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `gasto`
--
ALTER TABLE `gasto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `informe_actividades`
--
ALTER TABLE `informe_actividades`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `itinerario`
--
ALTER TABLE `itinerario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `municipio`
--
ALTER TABLE `municipio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `pais`
--
ALTER TABLE `pais`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `programa_trabajo`
--
ALTER TABLE `programa_trabajo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `solicitud_comision`
--
ALTER TABLE `solicitud_comision`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `solicitud_viatico`
--
ALTER TABLE `solicitud_viatico`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `viatico_proyecto`
--
ALTER TABLE `viatico_proyecto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `agenda`
--
ALTER TABLE `agenda`
  ADD CONSTRAINT `fk_agenda_informe_actividades1` FOREIGN KEY (`id_informe_actividades`) REFERENCES `informe_actividades` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `factura`
--
ALTER TABLE `factura`
  ADD CONSTRAINT `fk_factura_informe_actividades1` FOREIGN KEY (`id_informe_actividades`) REFERENCES `informe_actividades` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `gasto`
--
ALTER TABLE `gasto`
  ADD CONSTRAINT `fk_gastos_solicitud_viatico1` FOREIGN KEY (`id_solicitud_viatico`) REFERENCES `solicitud_viatico` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `informe_actividades`
--
ALTER TABLE `informe_actividades`
  ADD CONSTRAINT `fk_informe_actividades_solicitud_comision1` FOREIGN KEY (`id_solicitud_comision`) REFERENCES `solicitud_comision` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_informe_actividades_usuario1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`codigo`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `itinerario`
--
ALTER TABLE `itinerario`
  ADD CONSTRAINT `fk_itinerario_informe_actividades1` FOREIGN KEY (`id_informe_actividades`) REFERENCES `informe_actividades` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `programa_trabajo`
--
ALTER TABLE `programa_trabajo`
  ADD CONSTRAINT `fk_programa_trabajo_solicitud_comision1` FOREIGN KEY (`id_solicitud_comision`) REFERENCES `solicitud_comision` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `solicitud_comision`
--
ALTER TABLE `solicitud_comision`
  ADD CONSTRAINT `fk_solicitud_comision_municipio1` FOREIGN KEY (`id_municipio`) REFERENCES `municipio` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_solicitud_comision_pais` FOREIGN KEY (`id_pais`) REFERENCES `pais` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_solicitud_comision_usuario1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`codigo`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `solicitud_viatico`
--
ALTER TABLE `solicitud_viatico`
  ADD CONSTRAINT `fk_solicitud_viatico_solicitud_comision1` FOREIGN KEY (`id_solicitud_comision`) REFERENCES `solicitud_comision` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_solicitud_viatico_usuario1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`codigo`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `viatico_proyecto`
--
ALTER TABLE `viatico_proyecto`
  ADD CONSTRAINT `fk_proyecto_solicitud_viatico1` FOREIGN KEY (`id_solicitud_viatico`) REFERENCES `solicitud_viatico` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
