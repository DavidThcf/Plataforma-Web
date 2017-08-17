--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.3
-- Dumped by pg_dump version 9.6.3

-- Started on 2017-08-17 16:54:22 -05

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 1 (class 3079 OID 12394)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2279 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

--
-- TOC entry 201 (class 1255 OID 16919)
-- Name: createuser(bigint, character varying, boolean, character varying, character varying, character varying, character, character varying, character varying, character varying, character varying, boolean); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION createuser(id_usuario bigint, pass character varying, administrador boolean, e_mail character varying, nombre character varying, apellido character varying, genero character, cargo character varying, telefono character varying, entidad character varying, imagen character varying, disponible boolean) RETURNS void
    LANGUAGE plpgsql
    AS $$
    BEGIN
        insert into usuarios  
        	values(
				id_usuario,
				pass,
				administrador,
				e_mail, 
				nombre, 
				apellido, 
				genero, 
				cargo, 
				telefono,
				entidad, 
				imagen,
				disponible 
        	);
    END;
$$;


ALTER FUNCTION public.createuser(id_usuario bigint, pass character varying, administrador boolean, e_mail character varying, nombre character varying, apellido character varying, genero character, cargo character varying, telefono character varying, entidad character varying, imagen character varying, disponible boolean) OWNER TO postgres;

--
-- TOC entry 202 (class 1255 OID 16920)
-- Name: increment(integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION increment(i integer) RETURNS integer
    LANGUAGE plpgsql
    AS $$
        BEGIN
                RETURN i + 1;
        END;
$$;


ALTER FUNCTION public.increment(i integer) OWNER TO postgres;

--
-- TOC entry 203 (class 1255 OID 16921)
-- Name: shows(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION shows() RETURNS TABLE(nombre character varying, apellido character varying)
    LANGUAGE sql
    AS $$

        
		select usuarios.nombre, usuarios.apellido from usuarios ;
        
$$;


ALTER FUNCTION public.shows() OWNER TO postgres;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 185 (class 1259 OID 16922)
-- Name: actividades; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE actividades (
    keym bigint NOT NULL,
    id_actividad bigint NOT NULL,
    id_usuario bigint NOT NULL,
    keym_car bigint NOT NULL,
    id_usuario_car bigint NOT NULL,
    id_caracteristica bigint NOT NULL,
    nombre character varying NOT NULL,
    descripcion character varying NOT NULL,
    pos integer NOT NULL,
    folder integer NOT NULL,
    fecha_ultima_modificacion character varying
);


ALTER TABLE actividades OWNER TO postgres;

--
-- TOC entry 186 (class 1259 OID 16928)
-- Name: archivos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE archivos (
    keym_arc bigint NOT NULL,
    id_archivo bigint NOT NULL,
    id_usuario_arc bigint NOT NULL,
    keym_car bigint NOT NULL,
    id_caracteristica bigint NOT NULL,
    id_usuario_car bigint NOT NULL,
    nombre_archivo character varying NOT NULL,
    titulo character varying,
    subtitulo character varying,
    descripcion character varying,
    contenido text,
    fecha_creacion character varying NOT NULL,
    fecha_ultima_modificacion character varying NOT NULL,
    publicacion integer,
    tipo character varying,
    localizacion numeric(20,16),
    longitud numeric(20,16),
    "srcGifServ" character varying,
    "srcServ" character varying,
    visible_map boolean DEFAULT false
);


ALTER TABLE archivos OWNER TO postgres;

--
-- TOC entry 187 (class 1259 OID 16934)
-- Name: caracteristicas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE caracteristicas (
    keym bigint NOT NULL,
    id_usuario bigint NOT NULL,
    id_caracteristica bigint NOT NULL,
    keym_padre bigint,
    id_usuario_padre bigint,
    id_caracteristica_padre bigint,
    estado character varying NOT NULL,
    porcentaje_asignado numeric(5,2) DEFAULT 0 NOT NULL,
    porcentaje_cumplido numeric(5,2) DEFAULT 0 NOT NULL,
    recursos integer,
    recursos_restantes integer,
    presupuesto integer,
    costos integer,
    tipo_caracteristica character(1) NOT NULL,
    visualizar_superior boolean NOT NULL,
    usuario_asignado bigint,
    publicacion_web boolean DEFAULT false,
    porcentaje numeric(5,2),
    fecha_inicio character varying,
    fecha_fin character varying,
    fecha_ultima_modificacion character varying,
    publicacion_reporte boolean DEFAULT false NOT NULL
);


ALTER TABLE caracteristicas OWNER TO postgres;

--
-- TOC entry 200 (class 1259 OID 18831)
-- Name: sequence_category; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE sequence_category
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    CYCLE;


ALTER TABLE sequence_category OWNER TO postgres;

--
-- TOC entry 199 (class 1259 OID 17134)
-- Name: categorias_mapa; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE categorias_mapa (
    id_categoria smallint DEFAULT nextval('sequence_category'::regclass) NOT NULL,
    nombre character varying,
    color character varying(30),
    keym_car bigint,
    id_caracteristica bigint,
    id_usuario_car bigint
);


ALTER TABLE categorias_mapa OWNER TO postgres;

--
-- TOC entry 188 (class 1259 OID 16944)
-- Name: configuracion_inicial; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE configuracion_inicial (
    id integer NOT NULL,
    configuracion character varying NOT NULL,
    val_configuracion character varying NOT NULL,
    descripcion character varying
);


ALTER TABLE configuracion_inicial OWNER TO postgres;

--
-- TOC entry 189 (class 1259 OID 16950)
-- Name: costos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE costos (
    keym bigint NOT NULL,
    id_usuario bigint NOT NULL,
    id_costo bigint NOT NULL,
    keym_car bigint NOT NULL,
    id_usuario_car bigint NOT NULL,
    id_caracteristica bigint NOT NULL,
    nombre character varying NOT NULL,
    cantidad integer NOT NULL,
    valor integer NOT NULL
);


ALTER TABLE costos OWNER TO postgres;

--
-- TOC entry 198 (class 1259 OID 17107)
-- Name: marcador; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE marcador (
    keym bigint,
    id_caracteristica bigint,
    id_usuario bigint,
    id_marcador integer NOT NULL,
    latitud character varying,
    longitud character varying,
    id_categoria smallint,
    etiqueta character varying(200)
);


ALTER TABLE marcador OWNER TO postgres;

--
-- TOC entry 197 (class 1259 OID 17105)
-- Name: marcador_id_marcador_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE marcador_id_marcador_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE marcador_id_marcador_seq OWNER TO postgres;

--
-- TOC entry 2280 (class 0 OID 0)
-- Dependencies: 197
-- Name: marcador_id_marcador_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE marcador_id_marcador_seq OWNED BY marcador.id_marcador;


--
-- TOC entry 190 (class 1259 OID 16956)
-- Name: presupuesto; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE presupuesto (
    keym bigint NOT NULL,
    id_presupuesto bigint NOT NULL,
    id_usuario bigint NOT NULL,
    keym_car bigint NOT NULL,
    id_usuario_car bigint NOT NULL,
    id_caracteristica bigint NOT NULL,
    nombre character varying NOT NULL,
    cantidad integer NOT NULL,
    valor integer NOT NULL
);


ALTER TABLE presupuesto OWNER TO postgres;

--
-- TOC entry 191 (class 1259 OID 16962)
-- Name: proyectos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE proyectos (
    keym bigint NOT NULL,
    id_proyecto bigint NOT NULL,
    id_usuario bigint NOT NULL,
    keym_car bigint NOT NULL,
    id_usuario_car bigint NOT NULL,
    id_caracteristica bigint NOT NULL,
    nombre character varying,
    plantilla character varying NOT NULL,
    ir_proyecto boolean NOT NULL,
    icon character varying,
    descripcion character varying NOT NULL,
    contador integer,
    fecha_ultima_modificacion character varying
);


ALTER TABLE proyectos OWNER TO postgres;

--
-- TOC entry 192 (class 1259 OID 16968)
-- Name: recursos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE recursos (
    keym bigint NOT NULL,
    id_recurso bigint NOT NULL,
    id_usuario bigint NOT NULL,
    keym_car bigint NOT NULL,
    id_usuario_car bigint NOT NULL,
    id_caracteristica bigint NOT NULL,
    nombre_recurso character varying NOT NULL,
    cantidad integer DEFAULT 1 NOT NULL
);


ALTER TABLE recursos OWNER TO postgres;

--
-- TOC entry 193 (class 1259 OID 16975)
-- Name: repositorios_usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE repositorios_usuarios (
    id_usuario bigint NOT NULL,
    ruta_repositorio character varying NOT NULL
);


ALTER TABLE repositorios_usuarios OWNER TO postgres;

--
-- TOC entry 194 (class 1259 OID 16981)
-- Name: table_sequence; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE table_sequence (
    actividades bigint DEFAULT 0 NOT NULL,
    archivos bigint DEFAULT 0 NOT NULL,
    caracteristicas bigint DEFAULT 0 NOT NULL,
    costos bigint DEFAULT 0 NOT NULL,
    proyectos bigint DEFAULT 0 NOT NULL,
    proyectos_meta_datos bigint DEFAULT 0 NOT NULL,
    recursos bigint DEFAULT 0 NOT NULL,
    presuspuesto bigint DEFAULT 0 NOT NULL,
    key bigint DEFAULT 0 NOT NULL
);


ALTER TABLE table_sequence OWNER TO postgres;

--
-- TOC entry 195 (class 1259 OID 16993)
-- Name: usuario_id_usuario; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE usuario_id_usuario
    START WITH 10
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE usuario_id_usuario OWNER TO postgres;

--
-- TOC entry 196 (class 1259 OID 16995)
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE usuarios (
    id_usuario bigint DEFAULT nextval('usuario_id_usuario'::regclass) NOT NULL,
    pass character varying,
    administrador boolean DEFAULT false,
    e_mail character varying,
    nombre character varying,
    apellido character varying,
    genero character(1),
    cargo character varying,
    telefono character varying,
    entidad character varying,
    imagen character varying,
    disponible boolean DEFAULT false
);


ALTER TABLE usuarios OWNER TO postgres;

--
-- TOC entry 2091 (class 2604 OID 17110)
-- Name: marcador id_marcador; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY marcador ALTER COLUMN id_marcador SET DEFAULT nextval('marcador_id_marcador_seq'::regclass);


--
-- TOC entry 2257 (class 0 OID 16922)
-- Dependencies: 185
-- Data for Name: actividades; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY actividades (keym, id_actividad, id_usuario, keym_car, id_usuario_car, id_caracteristica, nombre, descripcion, pos, folder, fecha_ultima_modificacion) FROM stdin;
95	1	2	95	2	2	Subsecretaria de registro	Subsecretaria de registro	1	0	21/06/2017 2:00:05 p. m.
95	2	2	95	2	3	Subsecretaria de movilidad	Subsecretaria de movilidad	2	0	21/06/2017 2:00:27 p. m.
95	3	2	95	2	4	Subsecretaria operativa	Subsecretaria operativa	3	0	21/06/2017 2:01:30 p. m.
95	4	2	95	2	5	Oficina jurídica y de jurisdicción coactiva	Oficina jurídica y de jurisdicción coactiva	4	0	21/06/2017 2:01:49 p. m.
95	5	2	95	2	6	Inspección de transito	Inspección de transito	5	0	21/06/2017 2:02:12 p. m.
95	6	5	95	5	7	Coordinación operativa y de policía judicial	Coordinación operativa y de policía judicial	1	0	21/06/2017 2:07:57 p. m.
95	7	2	95	2	8	OPERATIVO	OPERATIVO	1	0	21/06/2017 2:07:57 p. m.
0	1	2	0	2	18	Actividad 1	Actividad 1	0	0	8/16/2017, 10:24:29 AM
0	2	2	0	2	19	Actividad 2	Actividad 2	0	0	8/16/2017, 10:24:56 AM
0	3	2	0	2	20	Actividad 3	Actividad 3	0	0	8/16/2017, 10:25:11 AM
0	4	2	0	2	21	Actividad 4	Actividad 4	0	0	8/16/2017, 10:26:05 AM
0	5	2	0	2	22	Radar Movil	puntos radar movil	0	0	8/16/2017, 10:40:45 AM
0	6	2	0	2	23	Dia 1	Dia 1	0	0	8/16/2017, 10:43:13 AM
0	7	2	0	2	24	Dia 1	Dia 1	0	0	8/16/2017, 11:08:23 AM
0	8	2	0	2	25	Dia 2	Dia 2	0	0	8/16/2017, 11:11:29 AM
0	9	2	0	2	26	Dia 3	Dia 3	0	0	8/16/2017, 11:13:07 AM
0	10	2	0	2	27	Dia 3	Dia 3	0	0	8/16/2017, 11:14:07 AM
0	11	2	0	2	28	Actividad 5	Actividad 5	0	0	8/16/2017, 11:17:19 AM
0	12	2	0	2	30	Dia 20	Dia 20	0	0	8/16/2017, 11:24:56 AM
0	13	2	0	2	31	Actividad 1	Actividad 1	0	0	8/16/2017, 11:31:03 AM
0	14	2	0	2	32	Actividad 12	Actividad 1	0	0	8/16/2017, 11:31:34 AM
0	15	2	0	2	33	Actividad 123	Actividad 1	0	0	8/16/2017, 11:33:06 AM
\.


--
-- TOC entry 2258 (class 0 OID 16928)
-- Dependencies: 186
-- Data for Name: archivos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY archivos (keym_arc, id_archivo, id_usuario_arc, keym_car, id_caracteristica, id_usuario_car, nombre_archivo, titulo, subtitulo, descripcion, contenido, fecha_creacion, fecha_ultima_modificacion, publicacion, tipo, localizacion, longitud, "srcGifServ", "srcServ", visible_map) FROM stdin;
0	1	2	95	3	2	0-1-2.jpg	1	UNDEFINED	Imagen ss	UNDEFINED	UNDEFINED	UNDEFINED	1	img	0.0000000000000000	0.0000000000000000		user2/	f
0	2	2	95	3	2	0-2-2.jpg	1	UNDEFINED	Imagen ss	UNDEFINED	UNDEFINED	UNDEFINED	1	img	0.0000000000000000	0.0000000000000000		user2/	f
0	3	2	95	3	2	0-3-2.jpg	1	UNDEFINED	Imagen ss	UNDEFINED	UNDEFINED	UNDEFINED	1	img	0.0000000000000000	0.0000000000000000		user2/	f
0	4	2	95	3	2	0-4-2.jpg	1	UNDEFINED	Imagen ss	UNDEFINED	UNDEFINED	UNDEFINED	1	img	0.0000000000000000	0.0000000000000000		user2/	f
0	5	2	0	18	2	0-5-2.jpg	1	Imagen Prueba Sub	UNDEFINED	UNDEFINED	UNDEFINED	UNDEFINED	1	img	0.0000000000000000	0.0000000000000000		user2/	f
0	6	2	0	18	2	0-6-2.jpg	1	Imagen Prueba Sub	UNDEFINED	UNDEFINED	UNDEFINED	UNDEFINED	1	img	0.0000000000000000	0.0000000000000000		user2/	f
0	7	2	0	18	2	0-7-2.jpg	1	Imagen Prueba Sub	UNDEFINED	UNDEFINED	UNDEFINED	UNDEFINED	1	img	0.0000000000000000	0.0000000000000000		user2/	f
0	8	2	0	18	2	0-8-2.jpg	1	Imagen Prueba Sub	UNDEFINED	UNDEFINED	UNDEFINED	UNDEFINED	1	img	0.0000000000000000	0.0000000000000000		user2/	f
0	9	2	0	18	2	0-9-2.jpg	1	Imagen Prueba Sub	UNDEFINED	UNDEFINED	UNDEFINED	UNDEFINED	1	img	0.0000000000000000	0.0000000000000000		user2/	f
0	10	2	0	18	2	0-10-2.jpg	1	Imagen prueba Sub	UNDEFINED	UNDEFINED	UNDEFINED	UNDEFINED	1	img	0.0000000000000000	0.0000000000000000		user2/	f
0	11	2	0	18	2	0-11-2.jpg	1	Imagen prueba Sub 2	UNDEFINED	UNDEFINED	UNDEFINED	UNDEFINED	1	img	0.0000000000000000	0.0000000000000000		user2/	f
0	12	2	0	18	2	0-12-2.jpg	Imagen Prueba 3	Imagen prueba Sub 3	UNDEFINED	UNDEFINED	UNDEFINED	UNDEFINED	1	img	0.0000000000000000	0.0000000000000000		user2/	f
0	13	2	0	18	2	0-13-2.jpg	Imagen Test	Imagen Test	UNDEFINED	UNDEFINED	UNDEFINED	UNDEFINED	1	img	0.0000000000000000	0.0000000000000000		user2/	f
0	14	2	0	18	2	0-14-2.jpg	Imagen Test 2	Imagen Test 2	UNDEFINED	UNDEFINED	UNDEFINED	UNDEFINED	1	img	0.0000000000000000	0.0000000000000000		user2/	f
\.


--
-- TOC entry 2259 (class 0 OID 16934)
-- Dependencies: 187
-- Data for Name: caracteristicas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY caracteristicas (keym, id_usuario, id_caracteristica, keym_padre, id_usuario_padre, id_caracteristica_padre, estado, porcentaje_asignado, porcentaje_cumplido, recursos, recursos_restantes, presupuesto, costos, tipo_caracteristica, visualizar_superior, usuario_asignado, publicacion_web, porcentaje, fecha_inicio, fecha_fin, fecha_ultima_modificacion, publicacion_reporte) FROM stdin;
95	2	1	\N	\N	\N	Iniciacion	0.00	0.00	0	0	0	0	p	f	2	f	100.00	21/06/2017 2:15:46 p. m.	21/06/2017 2:15:46 p. m.	21/06/2017 2:15:46 p. m.	f
95	2	2	95	2	1	Iniciacion	0.00	0.00	0	0	0	0	a	t	3	f	0.00	21/06/2017 2:15:46 p. m.	21/06/2017 2:15:46 p. m.	21/06/2017 2:00:05 p. m.	f
95	2	3	95	2	1	Iniciacion	0.00	0.00	0	0	0	0	a	t	4	f	0.00	21/06/2017 2:15:46 p. m.	21/06/2017 2:15:46 p. m.	21/06/2017 2:00:27 p. m.	f
95	2	4	95	2	1	Iniciacion	0.00	0.00	0	0	0	0	a	t	5	f	0.00	21/06/2017 2:15:46 p. m.	21/06/2017 2:15:46 p. m.	21/06/2017 2:01:30 p. m.	f
95	2	5	95	2	1	Iniciacion	0.00	0.00	0	0	0	0	a	t	6	f	0.00	21/06/2017 2:15:46 p. m.	21/06/2017 2:15:46 p. m.	21/06/2017 2:01:49 p. m.	f
95	2	6	95	2	1	Iniciacion	0.00	0.00	0	0	0	0	a	t	7	f	0.00	21/06/2017 2:15:46 p. m.	21/06/2017 2:15:46 p. m.	21/06/2017 2:02:12 p. m.	f
95	2	8	95	5	7	iniciacion	0.00	0.00	0	0	0	0	a	t	2	f	0.00	21/06/2017 2:15:46 p. m.	21/06/2017 2:15:46 p. m.	21/06/2017 2:07:57 p. m.	f
95	5	7	95	2	4	Iniciacion	0.00	0.00	0	0	0	0	A	t	5	f	0.00	21/06/2017 2:15:46 p. m.	21/06/2017 2:15:46 p. m.	21/06/2017 2:07:57 p. m.	f
0	2	1	\N	\N	\N	Iniciacion	0.00	0.00	0	0	0	0	P	t	2	f	0.00	2017-08-20	undefined	8/15/2017, 6:19:06 PM	f
0	2	2	\N	\N	\N	Iniciacion	0.00	0.00	0	0	0	0	P	t	2	f	0.00	2017-08-20	2017-08-03	8/15/2017, 6:19:40 PM	f
0	2	3	\N	\N	\N	Iniciacion	0.00	0.00	0	0	0	0	P	t	2	f	0.00	2017-08-20	2017-08-03	8/15/2017, 6:20:08 PM	f
0	2	4	\N	\N	\N	Iniciacion	0.00	0.00	0	0	0	0	P	t	2	f	0.00	2017-08-20	2017-08-03	8/15/2017, 6:20:54 PM	f
0	2	5	\N	\N	\N	Iniciacion	0.00	0.00	0	0	0	0	P	t	2	f	0.00	2017-08-05	undefined	8/15/2017, 6:28:13 PM	f
0	2	6	\N	\N	\N	Iniciacion	0.00	0.00	0	0	0	0	P	t	2	f	0.00	2017-08-05	undefined	8/15/2017, 6:29:13 PM	f
0	2	7	\N	\N	\N	Iniciacion	0.00	0.00	0	0	0	0	P	t	2	f	0.00	2017-08-05	undefined	8/15/2017, 6:30:25 PM	f
0	2	8	\N	\N	\N	Iniciacion	0.00	0.00	0	0	0	0	P	t	2	f	0.00	2017-08-16	undefined	8/15/2017, 6:32:31 PM	f
0	2	9	\N	\N	\N	Iniciacion	0.00	0.00	0	0	0	0	P	t	2	f	0.00	2017-08-16	undefined	8/15/2017, 6:33:16 PM	f
0	2	10	\N	\N	\N	Iniciacion	0.00	0.00	0	0	0	0	P	t	2	f	0.00	2017-08-16	undefined	8/15/2017, 6:35:03 PM	f
0	2	11	\N	\N	\N	Iniciacion	0.00	0.00	0	0	0	0	P	t	2	f	0.00	2017-08-27	undefined	8/15/2017, 6:37:06 PM	f
0	2	12	\N	\N	\N	Iniciacion	0.00	0.00	0	0	0	0	P	t	2	f	0.00	2017-08-27	undefined	8/15/2017, 6:37:32 PM	f
0	2	13	\N	\N	\N	Iniciacion	0.00	0.00	0	0	0	0	P	t	2	f	0.00	2017-08-12	undefined	8/15/2017, 6:40:45 PM	f
0	2	14	\N	\N	\N	Iniciacion	0.00	0.00	0	0	0	0	P	t	2	f	0.00	2017-08-12	undefined	8/15/2017, 6:41:33 PM	f
0	2	15	\N	\N	\N	Iniciacion	0.00	0.00	0	0	0	0	P	t	2	f	0.00	2017-08-12	undefined	8/15/2017, 6:42:22 PM	f
0	2	16	\N	\N	\N	Iniciacion	0.00	0.00	0	0	0	0	P	t	2	f	0.00	2017-08-15	undefined	8/15/2017, 6:45:09 PM	f
0	2	17	\N	\N	\N	Iniciacion	0.00	0.00	0	0	0	0	P	t	2	f	0.00	2017-08-15	undefined	8/15/2017, 6:47:11 PM	f
0	2	18	0	2	5	Iniciacion	0.00	0.00	0	0	0	0	A	t	2	f	0.00	2017-08-16	2017-08-19	8/16/2017, 10:24:29 AM	f
0	2	19	0	2	5	Iniciacion	0.00	0.00	0	0	0	0	A	t	2	f	0.00	2017-08-16	2017-08-19	8/16/2017, 10:24:56 AM	f
0	2	20	0	2	5	Iniciacion	0.00	0.00	0	0	0	0	A	t	2	f	0.00	2017-08-16	2017-08-19	8/16/2017, 10:25:11 AM	f
0	2	21	0	2	5	Iniciacion	0.00	0.00	0	0	0	0	A	t	2	f	0.00	2017-08-16	2017-08-19	8/16/2017, 10:26:05 AM	f
0	2	22	0	2	5	Iniciacion	0.00	0.00	0	0	0	0	A	t	2	f	0.00	2017-08-16	undefined	8/16/2017, 10:40:45 AM	f
0	2	23	0	2	5	Iniciacion	0.00	0.00	0	0	0	0	A	t	2	f	0.00	2017-08-18	undefined	8/16/2017, 10:43:13 AM	f
0	2	24	0	2	5	Iniciacion	0.00	0.00	0	0	0	0	A	t	2	f	0.00	2017-08-17	2017-08-26	8/16/2017, 11:08:23 AM	f
0	2	25	0	2	5	Iniciacion	0.00	0.00	0	0	0	0	A	t	2	f	0.00	2017-08-17	undefined	8/16/2017, 11:11:29 AM	f
0	2	26	0	2	5	Iniciacion	0.00	0.00	0	0	0	0	A	t	2	f	0.00	2017-08-17	2017-08-18	8/16/2017, 11:13:07 AM	f
0	2	27	0	2	5	Iniciacion	0.00	0.00	0	0	0	0	A	t	2	f	0.00	2017-08-17	2017-08-18	8/16/2017, 11:14:07 AM	f
0	2	28	0	2	5	Iniciacion	0.00	0.00	0	0	0	0	A	t	2	f	0.00	2017-08-10	undefined	8/16/2017, 11:17:19 AM	f
0	2	29	0	2	22	Iniciacion	0.00	0.00	0	0	0	0	A	t	2	f	0.00	2017-08-17	undefined	8/16/2017, 11:19:02 AM	f
0	2	30	0	2	5	Iniciacion	0.00	0.00	0	0	0	0	A	t	2	f	0.00	2017-08-05	2017-08-20	8/16/2017, 11:24:56 AM	f
0	2	31	0	2	22	Iniciacion	0.00	0.00	0	0	0	0	A	t	2	f	0.00	2017-08-01	undefined	8/16/2017, 11:31:03 AM	f
0	2	32	0	2	22	Iniciacion	0.00	0.00	0	0	0	0	A	t	2	f	0.00	2017-08-01	undefined	8/16/2017, 11:31:34 AM	f
0	2	33	0	2	22	Iniciacion	0.00	0.00	0	0	0	0	A	t	2	f	0.00	2017-08-01	undefined	8/16/2017, 11:33:06 AM	f
\.


--
-- TOC entry 2271 (class 0 OID 17134)
-- Dependencies: 199
-- Data for Name: categorias_mapa; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY categorias_mapa (id_categoria, nombre, color, keym_car, id_caracteristica, id_usuario_car) FROM stdin;
2	Categoria 1	#ff0000	0	5	2
3	Categoria 2	#0000a0	0	5	2
\.


--
-- TOC entry 2260 (class 0 OID 16944)
-- Dependencies: 188
-- Data for Name: configuracion_inicial; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY configuracion_inicial (id, configuracion, val_configuracion, descripcion) FROM stdin;
1	IP Repositorio	http://10.42.0.1:81/	\N
2	Path	/home/admin/Documents/Angular Samples/work/Plataforma-Web/testREst/files/	\N
3	IP Plataforma	http://10.42.0.1:81/	\N
4	key maquina	0	\N
\.


--
-- TOC entry 2261 (class 0 OID 16950)
-- Dependencies: 189
-- Data for Name: costos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY costos (keym, id_usuario, id_costo, keym_car, id_usuario_car, id_caracteristica, nombre, cantidad, valor) FROM stdin;
\.


--
-- TOC entry 2270 (class 0 OID 17107)
-- Dependencies: 198
-- Data for Name: marcador; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY marcador (keym, id_caracteristica, id_usuario, id_marcador, latitud, longitud, id_categoria, etiqueta) FROM stdin;
\.


--
-- TOC entry 2281 (class 0 OID 0)
-- Dependencies: 197
-- Name: marcador_id_marcador_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('marcador_id_marcador_seq', 1, false);


--
-- TOC entry 2262 (class 0 OID 16956)
-- Dependencies: 190
-- Data for Name: presupuesto; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY presupuesto (keym, id_presupuesto, id_usuario, keym_car, id_usuario_car, id_caracteristica, nombre, cantidad, valor) FROM stdin;
\.


--
-- TOC entry 2263 (class 0 OID 16962)
-- Dependencies: 191
-- Data for Name: proyectos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY proyectos (keym, id_proyecto, id_usuario, keym_car, id_usuario_car, id_caracteristica, nombre, plantilla, ir_proyecto, icon, descripcion, contador, fecha_ultima_modificacion) FROM stdin;
0	1	3	95	2	2	Subsecretaria de registro	plantilla0-1-3.xml	f	\N	Despacho Secretaria de Trasnsito	0	2017-06-21 14:02:18
0	2	4	95	2	3	Subsecretaria de movilidad	plantilla0-2-4.xml	f	\N	Despacho Secretaria de Trasnsito	0	2017-06-21 14:02:45
0	4	6	95	2	5	Oficina jurídica y de jurisdicción coactiva	plantilla0-4-6.xml	f	\N	Despacho Secretaria de Trasnsito	0	2017-06-21 14:03:31
0	3	5	95	2	4	Subsecretaria operativa	plantilla0-3-5.xml	f		Despacho Secretaria de Trasnsito	0	21/06/2017 2:03:06 p. m.
95	1	2	95	2	1	Secretaria de Transito y Transporte	plantilla95-1-2.xml	f		Despacho Secretaria de Transito	0	21/06/2017 2:15:46 p. m.
0	5	7	95	2	6	Inspección de transito	plantilla0-5-7.xml	f	\N	Despacho Secretaria de Trasnsito	0	2017-06-21 14:03:57
0	1	2	0	2	1	Proyecto Sena 2		f		Sena	0	8/15/2017, 6:19:06 PM
0	2	2	0	2	2	Proyecto Sena Transito		f		Sena	0	8/15/2017, 6:19:40 PM
0	3	2	0	2	3	Proyecto Sena Transito Udenar		f		Sena	0	8/15/2017, 6:20:08 PM
0	4	2	0	2	4	Proyecto Transito Udenar		f		Transito	0	8/15/2017, 6:20:54 PM
0	5	2	0	2	5	Proyecto 1		f		Proyecto 1	0	8/15/2017, 6:28:13 PM
0	6	2	0	2	6	Proyecto 2		f		Proyecto 2	0	8/15/2017, 6:29:13 PM
0	7	2	0	2	7	Proyecto 3		f		Proyecto 3	0	8/15/2017, 6:30:25 PM
0	8	2	0	2	8	Proyecto 4		f		Proyecto 4	0	8/15/2017, 6:32:31 PM
0	9	2	0	2	9	Proyecto 5		f		Proyecto 5	0	8/15/2017, 6:33:16 PM
0	10	2	0	2	10	Proyecto 6		f		Proyecto 6	0	8/15/2017, 6:35:03 PM
0	11	2	0	2	11	Proyecto 7		f		Proyecto 7	0	8/15/2017, 6:37:06 PM
0	12	2	0	2	12	Proyecto 7		f		Proyecto 7	0	8/15/2017, 6:37:32 PM
0	13	2	0	2	13	Proyecto 8		f		Proyecto 8	0	8/15/2017, 6:40:45 PM
0	14	2	0	2	14	Proyecto 9		f		Proyecto 9	0	8/15/2017, 6:41:33 PM
0	15	2	0	2	15	Proyecto 10		f		Proyecto 10	0	8/15/2017, 6:42:22 PM
0	16	2	0	2	16	Proyecto 11		f		Proyecto 11	0	8/15/2017, 6:45:09 PM
0	17	2	0	2	17	Proyecto 12		f		Proyecto 12	0	8/15/2017, 6:47:11 PM
\.


--
-- TOC entry 2264 (class 0 OID 16968)
-- Dependencies: 192
-- Data for Name: recursos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY recursos (keym, id_recurso, id_usuario, keym_car, id_usuario_car, id_caracteristica, nombre_recurso, cantidad) FROM stdin;
\.


--
-- TOC entry 2265 (class 0 OID 16975)
-- Dependencies: 193
-- Data for Name: repositorios_usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY repositorios_usuarios (id_usuario, ruta_repositorio) FROM stdin;
2	http://knower.udenar.edu.co/mp/user2/
3	http://knower.udenar.edu.co/mp/user3/
4	http://knower.udenar.edu.co/mp/user4/
5	http://knower.udenar.edu.co/mp/user5/
6	http://knower.udenar.edu.co/mp/user6/
7	http://knower.udenar.edu.co/mp/user7/
8	http://knower.udenar.edu.co/mp/user8/
9	http://knower.udenar.edu.co/mp/user9/
\.


--
-- TOC entry 2282 (class 0 OID 0)
-- Dependencies: 200
-- Name: sequence_category; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('sequence_category', 3, true);


--
-- TOC entry 2266 (class 0 OID 16981)
-- Dependencies: 194
-- Data for Name: table_sequence; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY table_sequence (actividades, archivos, caracteristicas, costos, proyectos, proyectos_meta_datos, recursos, presuspuesto, key) FROM stdin;
0	0	0	0	5	5	0	0	0
\.


--
-- TOC entry 2283 (class 0 OID 0)
-- Dependencies: 195
-- Name: usuario_id_usuario; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('usuario_id_usuario', 122, true);


--
-- TOC entry 2268 (class 0 OID 16995)
-- Dependencies: 196
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY usuarios (id_usuario, pass, administrador, e_mail, nombre, apellido, genero, cargo, telefono, entidad, imagen, disponible) FROM stdin;
2	123	f	luis.fuertes@gmail.com	Luis Alfredo	Fuertes	M	Secretario de Tránsito	\N	Transito	PicProfile-2.jpg	t
4	123	f	javier.recalde@gmail.com	Javier Hena	Recalde Martínez	M	Subdirector De Movilidad	\N	Transito	PicProfile-4.jpg	t
5	123	f	ricardo.rodriguez@gmail.com	Ricardo	Rodríguez Chapuel	M	Subdirector Operativo	\N	Transito	PicProfile-5.jpg	t
6	123	f	ana.ortiz@gmail.com	Ana Sofía	Ortiz Obando 	F	Asesor de Oficina Jurídica y Sustanciación	\N	Transito	PicProfile-6.jpg	t
7	123	f	ricardo.calvachi@gmail.com	Ricardo	Calvachi Álvarez	M	Inspector de Policía Urbana	\N	Transito	PicProfile-7.jpg	t
8	123	f	luis.moreno@gmail.com	Luis	Moreno de los Ríos	M	Inspector de Policía Urbana	\N	Transito	PicProfile-8.jpg	t
9	123	f	carlos.camanci@gmail.com	Carlos	Cancimanci Tapia	M	Inspector de Policía Urbana	\N	Transito	PicProfile-9.jpg	t
3	123	f	martha.rodriguez@gmail.com	Martha Roci	Rodríguez Flórez	F	Subdirector de Registro e Información	\N	Transito	PicProfile-3.jpg	t
114	123	f	luis@gmail.com	a	a	M	q	1			f
115	123	f	luis1@gmail.com	a	a	M	q	1			f
116	123	f	luis12@gmail.com	a	a	M	q	1			f
117	123	f	luis124@gmail.com	a	a	M	q	1			f
118	123	f	luis1246@gmail.com	a	a	M	q	1			f
119	123	f	lu@gmail.com	asd	asd	M	asd	123			f
120	kelvion	f	cadkad@gmail.com	kelvion	cadenia	M	asdas	72029292			f
\.


--
-- TOC entry 2094 (class 2606 OID 17005)
-- Name: actividades actividades_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY actividades
    ADD CONSTRAINT actividades_pkey PRIMARY KEY (keym, id_actividad, id_usuario);


--
-- TOC entry 2096 (class 2606 OID 17007)
-- Name: archivos archivos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY archivos
    ADD CONSTRAINT archivos_pkey PRIMARY KEY (keym_arc, id_archivo, id_usuario_arc);


--
-- TOC entry 2099 (class 2606 OID 17009)
-- Name: caracteristicas caracteristicas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY caracteristicas
    ADD CONSTRAINT caracteristicas_pkey PRIMARY KEY (keym, id_caracteristica, id_usuario);


--
-- TOC entry 2121 (class 2606 OID 17141)
-- Name: categorias_mapa categorias_mapa_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY categorias_mapa
    ADD CONSTRAINT categorias_mapa_pkey PRIMARY KEY (id_categoria);


--
-- TOC entry 2101 (class 2606 OID 17011)
-- Name: configuracion_inicial configuracion_inicial_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY configuracion_inicial
    ADD CONSTRAINT configuracion_inicial_pkey PRIMARY KEY (id);


--
-- TOC entry 2103 (class 2606 OID 17013)
-- Name: costos costos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY costos
    ADD CONSTRAINT costos_pkey PRIMARY KEY (keym, id_costo, id_usuario);


--
-- TOC entry 2117 (class 2606 OID 17117)
-- Name: marcador marcador_keym_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY marcador
    ADD CONSTRAINT marcador_keym_key UNIQUE (keym);


--
-- TOC entry 2119 (class 2606 OID 17115)
-- Name: marcador marcador_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY marcador
    ADD CONSTRAINT marcador_pkey PRIMARY KEY (id_marcador);


--
-- TOC entry 2113 (class 2606 OID 17015)
-- Name: table_sequence pk_ts; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY table_sequence
    ADD CONSTRAINT pk_ts PRIMARY KEY (key);


--
-- TOC entry 2107 (class 2606 OID 17017)
-- Name: proyectos pkey_prj; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY proyectos
    ADD CONSTRAINT pkey_prj PRIMARY KEY (keym, id_proyecto, id_usuario);


--
-- TOC entry 2105 (class 2606 OID 17019)
-- Name: presupuesto presupuesto_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY presupuesto
    ADD CONSTRAINT presupuesto_pkey PRIMARY KEY (keym, id_presupuesto, id_usuario);


--
-- TOC entry 2109 (class 2606 OID 17021)
-- Name: recursos recursos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY recursos
    ADD CONSTRAINT recursos_pkey PRIMARY KEY (keym, id_recurso, id_usuario);


--
-- TOC entry 2111 (class 2606 OID 17023)
-- Name: repositorios_usuarios repositorios_usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY repositorios_usuarios
    ADD CONSTRAINT repositorios_usuarios_pkey PRIMARY KEY (id_usuario);


--
-- TOC entry 2115 (class 2606 OID 17025)
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id_usuario);


--
-- TOC entry 2097 (class 1259 OID 17147)
-- Name: caracteristicas_keym_id_usuario_id_caracteristica_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX caracteristicas_keym_id_usuario_id_caracteristica_key ON caracteristicas USING btree (keym, id_usuario, id_caracteristica);


--
-- TOC entry 2122 (class 2606 OID 17026)
-- Name: actividades actividades_id_usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY actividades
    ADD CONSTRAINT actividades_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario);


--
-- TOC entry 2123 (class 2606 OID 17031)
-- Name: actividades actividades_keym_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY actividades
    ADD CONSTRAINT actividades_keym_fkey FOREIGN KEY (keym_car, id_caracteristica, id_usuario_car) REFERENCES caracteristicas(keym, id_caracteristica, id_usuario);


--
-- TOC entry 2124 (class 2606 OID 17036)
-- Name: archivos archivos_keym_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY archivos
    ADD CONSTRAINT archivos_keym_fkey FOREIGN KEY (keym_car, id_caracteristica, id_usuario_car) REFERENCES caracteristicas(keym, id_caracteristica, id_usuario);


--
-- TOC entry 2125 (class 2606 OID 17041)
-- Name: caracteristicas caracteristicas_id_usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY caracteristicas
    ADD CONSTRAINT caracteristicas_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario);


--
-- TOC entry 2126 (class 2606 OID 17046)
-- Name: caracteristicas caracteristicas_keym_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY caracteristicas
    ADD CONSTRAINT caracteristicas_keym_fkey FOREIGN KEY (keym_padre, id_caracteristica_padre, id_usuario_padre) REFERENCES caracteristicas(keym, id_caracteristica, id_usuario);


--
-- TOC entry 2127 (class 2606 OID 17051)
-- Name: caracteristicas caracteristicas_usuario_asignado_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY caracteristicas
    ADD CONSTRAINT caracteristicas_usuario_asignado_fkey FOREIGN KEY (usuario_asignado) REFERENCES usuarios(id_usuario);


--
-- TOC entry 2128 (class 2606 OID 17056)
-- Name: costos costos_id_usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY costos
    ADD CONSTRAINT costos_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario);


--
-- TOC entry 2129 (class 2606 OID 17061)
-- Name: costos costos_keym_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY costos
    ADD CONSTRAINT costos_keym_fkey FOREIGN KEY (keym_car, id_caracteristica, id_usuario_car) REFERENCES caracteristicas(keym, id_caracteristica, id_usuario);


--
-- TOC entry 2139 (class 2606 OID 18834)
-- Name: categorias_mapa fkey_caracteristicas; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY categorias_mapa
    ADD CONSTRAINT fkey_caracteristicas FOREIGN KEY (keym_car, id_caracteristica, id_usuario_car) REFERENCES caracteristicas(keym, id_caracteristica, id_usuario);


--
-- TOC entry 2137 (class 2606 OID 17142)
-- Name: marcador marcador_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY marcador
    ADD CONSTRAINT marcador_fk FOREIGN KEY (id_categoria) REFERENCES categorias_mapa(id_categoria) MATCH FULL;


--
-- TOC entry 2138 (class 2606 OID 17148)
-- Name: marcador marcador_fk1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY marcador
    ADD CONSTRAINT marcador_fk1 FOREIGN KEY (keym, id_caracteristica, id_usuario) REFERENCES caracteristicas(keym, id_usuario, id_caracteristica);


--
-- TOC entry 2130 (class 2606 OID 17066)
-- Name: presupuesto presupuesto_id_usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY presupuesto
    ADD CONSTRAINT presupuesto_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario);


--
-- TOC entry 2131 (class 2606 OID 17071)
-- Name: presupuesto presupuesto_keym_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY presupuesto
    ADD CONSTRAINT presupuesto_keym_fkey FOREIGN KEY (keym_car, id_caracteristica, id_usuario_car) REFERENCES caracteristicas(keym, id_caracteristica, id_usuario);


--
-- TOC entry 2132 (class 2606 OID 17076)
-- Name: proyectos proyectos_id_usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY proyectos
    ADD CONSTRAINT proyectos_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario);


--
-- TOC entry 2133 (class 2606 OID 17081)
-- Name: proyectos proyectos_keym_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY proyectos
    ADD CONSTRAINT proyectos_keym_fkey FOREIGN KEY (keym_car, id_caracteristica, id_usuario_car) REFERENCES caracteristicas(keym, id_caracteristica, id_usuario);


--
-- TOC entry 2134 (class 2606 OID 17086)
-- Name: recursos recursos_id_usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY recursos
    ADD CONSTRAINT recursos_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario);


--
-- TOC entry 2135 (class 2606 OID 17091)
-- Name: recursos recursos_keym_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY recursos
    ADD CONSTRAINT recursos_keym_fkey FOREIGN KEY (keym_car, id_caracteristica, id_usuario_car) REFERENCES caracteristicas(keym, id_caracteristica, id_usuario);


--
-- TOC entry 2136 (class 2606 OID 17096)
-- Name: repositorios_usuarios repositorios_usuarios_id_usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY repositorios_usuarios
    ADD CONSTRAINT repositorios_usuarios_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario);


-- Completed on 2017-08-17 16:54:22 -05

--
-- PostgreSQL database dump complete
--

