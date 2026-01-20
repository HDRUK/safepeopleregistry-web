--
-- PostgreSQL database dump
--

\restrict sb6WPglJ8kEk8s0EpQqkBm4ATiRwifT2cE0euzThcXemPEsCmc7IwKLzhKUzfpg

-- Dumped from database version 15.15 (Homebrew)
-- Dumped by pg_dump version 18.0

-- Started on 2026-01-20 11:43:39 GMT

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 214 (class 1259 OID 20319)
-- Name: admin_event_entity; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.admin_event_entity (
    id character varying(36) NOT NULL,
    admin_event_time bigint,
    realm_id character varying(255),
    operation_type character varying(255),
    auth_realm_id character varying(255),
    auth_client_id character varying(255),
    auth_user_id character varying(255),
    ip_address character varying(255),
    resource_path character varying(2550),
    representation text,
    error character varying(255),
    resource_type character varying(64),
    details_json text
);


ALTER TABLE public.admin_event_entity OWNER TO peterhammans;

--
-- TOC entry 215 (class 1259 OID 20324)
-- Name: associated_policy; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.associated_policy (
    policy_id character varying(36) NOT NULL,
    associated_policy_id character varying(36) NOT NULL
);


ALTER TABLE public.associated_policy OWNER TO peterhammans;

--
-- TOC entry 216 (class 1259 OID 20327)
-- Name: authentication_execution; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.authentication_execution (
    id character varying(36) NOT NULL,
    alias character varying(255),
    authenticator character varying(36),
    realm_id character varying(36),
    flow_id character varying(36),
    requirement integer,
    priority integer,
    authenticator_flow boolean DEFAULT false NOT NULL,
    auth_flow_id character varying(36),
    auth_config character varying(36)
);


ALTER TABLE public.authentication_execution OWNER TO peterhammans;

--
-- TOC entry 217 (class 1259 OID 20331)
-- Name: authentication_flow; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.authentication_flow (
    id character varying(36) NOT NULL,
    alias character varying(255),
    description character varying(255),
    realm_id character varying(36),
    provider_id character varying(36) DEFAULT 'basic-flow'::character varying NOT NULL,
    top_level boolean DEFAULT false NOT NULL,
    built_in boolean DEFAULT false NOT NULL
);


ALTER TABLE public.authentication_flow OWNER TO peterhammans;

--
-- TOC entry 218 (class 1259 OID 20339)
-- Name: authenticator_config; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.authenticator_config (
    id character varying(36) NOT NULL,
    alias character varying(255),
    realm_id character varying(36)
);


ALTER TABLE public.authenticator_config OWNER TO peterhammans;

--
-- TOC entry 219 (class 1259 OID 20342)
-- Name: authenticator_config_entry; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.authenticator_config_entry (
    authenticator_id character varying(36) NOT NULL,
    value text,
    name character varying(255) NOT NULL
);


ALTER TABLE public.authenticator_config_entry OWNER TO peterhammans;

--
-- TOC entry 220 (class 1259 OID 20347)
-- Name: broker_link; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.broker_link (
    identity_provider character varying(255) NOT NULL,
    storage_provider_id character varying(255),
    realm_id character varying(36) NOT NULL,
    broker_user_id character varying(255),
    broker_username character varying(255),
    token text,
    user_id character varying(255) NOT NULL
);


ALTER TABLE public.broker_link OWNER TO peterhammans;

--
-- TOC entry 221 (class 1259 OID 20352)
-- Name: client; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.client (
    id character varying(36) NOT NULL,
    enabled boolean DEFAULT false NOT NULL,
    full_scope_allowed boolean DEFAULT false NOT NULL,
    client_id character varying(255),
    not_before integer,
    public_client boolean DEFAULT false NOT NULL,
    secret character varying(255),
    base_url character varying(255),
    bearer_only boolean DEFAULT false NOT NULL,
    management_url character varying(255),
    surrogate_auth_required boolean DEFAULT false NOT NULL,
    realm_id character varying(36),
    protocol character varying(255),
    node_rereg_timeout integer DEFAULT 0,
    frontchannel_logout boolean DEFAULT false NOT NULL,
    consent_required boolean DEFAULT false NOT NULL,
    name character varying(255),
    service_accounts_enabled boolean DEFAULT false NOT NULL,
    client_authenticator_type character varying(255),
    root_url character varying(255),
    description character varying(255),
    registration_token character varying(255),
    standard_flow_enabled boolean DEFAULT true NOT NULL,
    implicit_flow_enabled boolean DEFAULT false NOT NULL,
    direct_access_grants_enabled boolean DEFAULT false NOT NULL,
    always_display_in_console boolean DEFAULT false NOT NULL
);


ALTER TABLE public.client OWNER TO peterhammans;

--
-- TOC entry 222 (class 1259 OID 20370)
-- Name: client_attributes; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.client_attributes (
    client_id character varying(36) NOT NULL,
    name character varying(255) NOT NULL,
    value text
);


ALTER TABLE public.client_attributes OWNER TO peterhammans;

--
-- TOC entry 223 (class 1259 OID 20375)
-- Name: client_auth_flow_bindings; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.client_auth_flow_bindings (
    client_id character varying(36) NOT NULL,
    flow_id character varying(36),
    binding_name character varying(255) NOT NULL
);


ALTER TABLE public.client_auth_flow_bindings OWNER TO peterhammans;

--
-- TOC entry 224 (class 1259 OID 20378)
-- Name: client_initial_access; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.client_initial_access (
    id character varying(36) NOT NULL,
    realm_id character varying(36) NOT NULL,
    "timestamp" integer,
    expiration integer,
    count integer,
    remaining_count integer
);


ALTER TABLE public.client_initial_access OWNER TO peterhammans;

--
-- TOC entry 225 (class 1259 OID 20381)
-- Name: client_node_registrations; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.client_node_registrations (
    client_id character varying(36) NOT NULL,
    value integer,
    name character varying(255) NOT NULL
);


ALTER TABLE public.client_node_registrations OWNER TO peterhammans;

--
-- TOC entry 226 (class 1259 OID 20384)
-- Name: client_scope; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.client_scope (
    id character varying(36) NOT NULL,
    name character varying(255),
    realm_id character varying(36),
    description character varying(255),
    protocol character varying(255)
);


ALTER TABLE public.client_scope OWNER TO peterhammans;

--
-- TOC entry 227 (class 1259 OID 20389)
-- Name: client_scope_attributes; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.client_scope_attributes (
    scope_id character varying(36) NOT NULL,
    value character varying(2048),
    name character varying(255) NOT NULL
);


ALTER TABLE public.client_scope_attributes OWNER TO peterhammans;

--
-- TOC entry 228 (class 1259 OID 20394)
-- Name: client_scope_client; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.client_scope_client (
    client_id character varying(255) NOT NULL,
    scope_id character varying(255) NOT NULL,
    default_scope boolean DEFAULT false NOT NULL
);


ALTER TABLE public.client_scope_client OWNER TO peterhammans;

--
-- TOC entry 229 (class 1259 OID 20400)
-- Name: client_scope_role_mapping; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.client_scope_role_mapping (
    scope_id character varying(36) NOT NULL,
    role_id character varying(36) NOT NULL
);


ALTER TABLE public.client_scope_role_mapping OWNER TO peterhammans;

--
-- TOC entry 230 (class 1259 OID 20403)
-- Name: component; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.component (
    id character varying(36) NOT NULL,
    name character varying(255),
    parent_id character varying(36),
    provider_id character varying(36),
    provider_type character varying(255),
    realm_id character varying(36),
    sub_type character varying(255)
);


ALTER TABLE public.component OWNER TO peterhammans;

--
-- TOC entry 231 (class 1259 OID 20408)
-- Name: component_config; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.component_config (
    id character varying(36) NOT NULL,
    component_id character varying(36) NOT NULL,
    name character varying(255) NOT NULL,
    value text
);


ALTER TABLE public.component_config OWNER TO peterhammans;

--
-- TOC entry 232 (class 1259 OID 20413)
-- Name: composite_role; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.composite_role (
    composite character varying(36) NOT NULL,
    child_role character varying(36) NOT NULL
);


ALTER TABLE public.composite_role OWNER TO peterhammans;

--
-- TOC entry 233 (class 1259 OID 20416)
-- Name: credential; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.credential (
    id character varying(36) NOT NULL,
    salt bytea,
    type character varying(255),
    user_id character varying(36),
    created_date bigint,
    user_label character varying(255),
    secret_data text,
    credential_data text,
    priority integer,
    version integer DEFAULT 0
);


ALTER TABLE public.credential OWNER TO peterhammans;

--
-- TOC entry 234 (class 1259 OID 20422)
-- Name: databasechangelog; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.databasechangelog (
    id character varying(255) NOT NULL,
    author character varying(255) NOT NULL,
    filename character varying(255) NOT NULL,
    dateexecuted timestamp without time zone NOT NULL,
    orderexecuted integer NOT NULL,
    exectype character varying(10) NOT NULL,
    md5sum character varying(35),
    description character varying(255),
    comments character varying(255),
    tag character varying(255),
    liquibase character varying(20),
    contexts character varying(255),
    labels character varying(255),
    deployment_id character varying(10)
);


ALTER TABLE public.databasechangelog OWNER TO peterhammans;

--
-- TOC entry 235 (class 1259 OID 20427)
-- Name: databasechangeloglock; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.databasechangeloglock (
    id integer NOT NULL,
    locked boolean NOT NULL,
    lockgranted timestamp without time zone,
    lockedby character varying(255)
);


ALTER TABLE public.databasechangeloglock OWNER TO peterhammans;

--
-- TOC entry 236 (class 1259 OID 20430)
-- Name: default_client_scope; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.default_client_scope (
    realm_id character varying(36) NOT NULL,
    scope_id character varying(36) NOT NULL,
    default_scope boolean DEFAULT false NOT NULL
);


ALTER TABLE public.default_client_scope OWNER TO peterhammans;

--
-- TOC entry 237 (class 1259 OID 20434)
-- Name: event_entity; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.event_entity (
    id character varying(36) NOT NULL,
    client_id character varying(255),
    details_json character varying(2550),
    error character varying(255),
    ip_address character varying(255),
    realm_id character varying(255),
    session_id character varying(255),
    event_time bigint,
    type character varying(255),
    user_id character varying(255),
    details_json_long_value text
);


ALTER TABLE public.event_entity OWNER TO peterhammans;

--
-- TOC entry 238 (class 1259 OID 20439)
-- Name: fed_user_attribute; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.fed_user_attribute (
    id character varying(36) NOT NULL,
    name character varying(255) NOT NULL,
    user_id character varying(255) NOT NULL,
    realm_id character varying(36) NOT NULL,
    storage_provider_id character varying(36),
    value character varying(2024),
    long_value_hash bytea,
    long_value_hash_lower_case bytea,
    long_value text
);


ALTER TABLE public.fed_user_attribute OWNER TO peterhammans;

--
-- TOC entry 239 (class 1259 OID 20444)
-- Name: fed_user_consent; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.fed_user_consent (
    id character varying(36) NOT NULL,
    client_id character varying(255),
    user_id character varying(255) NOT NULL,
    realm_id character varying(36) NOT NULL,
    storage_provider_id character varying(36),
    created_date bigint,
    last_updated_date bigint,
    client_storage_provider character varying(36),
    external_client_id character varying(255)
);


ALTER TABLE public.fed_user_consent OWNER TO peterhammans;

--
-- TOC entry 240 (class 1259 OID 20449)
-- Name: fed_user_consent_cl_scope; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.fed_user_consent_cl_scope (
    user_consent_id character varying(36) NOT NULL,
    scope_id character varying(36) NOT NULL
);


ALTER TABLE public.fed_user_consent_cl_scope OWNER TO peterhammans;

--
-- TOC entry 241 (class 1259 OID 20452)
-- Name: fed_user_credential; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.fed_user_credential (
    id character varying(36) NOT NULL,
    salt bytea,
    type character varying(255),
    created_date bigint,
    user_id character varying(255) NOT NULL,
    realm_id character varying(36) NOT NULL,
    storage_provider_id character varying(36),
    user_label character varying(255),
    secret_data text,
    credential_data text,
    priority integer
);


ALTER TABLE public.fed_user_credential OWNER TO peterhammans;

--
-- TOC entry 242 (class 1259 OID 20457)
-- Name: fed_user_group_membership; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.fed_user_group_membership (
    group_id character varying(36) NOT NULL,
    user_id character varying(255) NOT NULL,
    realm_id character varying(36) NOT NULL,
    storage_provider_id character varying(36)
);


ALTER TABLE public.fed_user_group_membership OWNER TO peterhammans;

--
-- TOC entry 243 (class 1259 OID 20460)
-- Name: fed_user_required_action; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.fed_user_required_action (
    required_action character varying(255) DEFAULT ' '::character varying NOT NULL,
    user_id character varying(255) NOT NULL,
    realm_id character varying(36) NOT NULL,
    storage_provider_id character varying(36)
);


ALTER TABLE public.fed_user_required_action OWNER TO peterhammans;

--
-- TOC entry 244 (class 1259 OID 20466)
-- Name: fed_user_role_mapping; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.fed_user_role_mapping (
    role_id character varying(36) NOT NULL,
    user_id character varying(255) NOT NULL,
    realm_id character varying(36) NOT NULL,
    storage_provider_id character varying(36)
);


ALTER TABLE public.fed_user_role_mapping OWNER TO peterhammans;

--
-- TOC entry 245 (class 1259 OID 20469)
-- Name: federated_identity; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.federated_identity (
    identity_provider character varying(255) NOT NULL,
    realm_id character varying(36),
    federated_user_id character varying(255),
    federated_username character varying(255),
    token text,
    user_id character varying(36) NOT NULL
);


ALTER TABLE public.federated_identity OWNER TO peterhammans;

--
-- TOC entry 246 (class 1259 OID 20474)
-- Name: federated_user; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.federated_user (
    id character varying(255) NOT NULL,
    storage_provider_id character varying(255),
    realm_id character varying(36) NOT NULL
);


ALTER TABLE public.federated_user OWNER TO peterhammans;

--
-- TOC entry 247 (class 1259 OID 20479)
-- Name: group_attribute; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.group_attribute (
    id character varying(36) DEFAULT 'sybase-needs-something-here'::character varying NOT NULL,
    name character varying(255) NOT NULL,
    value character varying(255),
    group_id character varying(36) NOT NULL
);


ALTER TABLE public.group_attribute OWNER TO peterhammans;

--
-- TOC entry 248 (class 1259 OID 20485)
-- Name: group_role_mapping; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.group_role_mapping (
    role_id character varying(36) NOT NULL,
    group_id character varying(36) NOT NULL
);


ALTER TABLE public.group_role_mapping OWNER TO peterhammans;

--
-- TOC entry 249 (class 1259 OID 20488)
-- Name: identity_provider; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.identity_provider (
    internal_id character varying(36) NOT NULL,
    enabled boolean DEFAULT false NOT NULL,
    provider_alias character varying(255),
    provider_id character varying(255),
    store_token boolean DEFAULT false NOT NULL,
    authenticate_by_default boolean DEFAULT false NOT NULL,
    realm_id character varying(36),
    add_token_role boolean DEFAULT true NOT NULL,
    trust_email boolean DEFAULT false NOT NULL,
    first_broker_login_flow_id character varying(36),
    post_broker_login_flow_id character varying(36),
    provider_display_name character varying(255),
    link_only boolean DEFAULT false NOT NULL,
    organization_id character varying(255),
    hide_on_login boolean DEFAULT false
);


ALTER TABLE public.identity_provider OWNER TO peterhammans;

--
-- TOC entry 250 (class 1259 OID 20500)
-- Name: identity_provider_config; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.identity_provider_config (
    identity_provider_id character varying(36) NOT NULL,
    value text,
    name character varying(255) NOT NULL
);


ALTER TABLE public.identity_provider_config OWNER TO peterhammans;

--
-- TOC entry 251 (class 1259 OID 20505)
-- Name: identity_provider_mapper; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.identity_provider_mapper (
    id character varying(36) NOT NULL,
    name character varying(255) NOT NULL,
    idp_alias character varying(255) NOT NULL,
    idp_mapper_name character varying(255) NOT NULL,
    realm_id character varying(36) NOT NULL
);


ALTER TABLE public.identity_provider_mapper OWNER TO peterhammans;

--
-- TOC entry 252 (class 1259 OID 20510)
-- Name: idp_mapper_config; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.idp_mapper_config (
    idp_mapper_id character varying(36) NOT NULL,
    value text,
    name character varying(255) NOT NULL
);


ALTER TABLE public.idp_mapper_config OWNER TO peterhammans;

--
-- TOC entry 253 (class 1259 OID 20515)
-- Name: jgroups_ping; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.jgroups_ping (
    address character varying(200) NOT NULL,
    name character varying(200),
    cluster_name character varying(200) NOT NULL,
    ip character varying(200) NOT NULL,
    coord boolean
);


ALTER TABLE public.jgroups_ping OWNER TO peterhammans;

--
-- TOC entry 254 (class 1259 OID 20520)
-- Name: keycloak_group; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.keycloak_group (
    id character varying(36) NOT NULL,
    name character varying(255),
    parent_group character varying(36) NOT NULL,
    realm_id character varying(36),
    type integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.keycloak_group OWNER TO peterhammans;

--
-- TOC entry 255 (class 1259 OID 20524)
-- Name: keycloak_role; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.keycloak_role (
    id character varying(36) NOT NULL,
    client_realm_constraint character varying(255),
    client_role boolean DEFAULT false NOT NULL,
    description character varying(255),
    name character varying(255),
    realm_id character varying(255),
    client character varying(36),
    realm character varying(36)
);


ALTER TABLE public.keycloak_role OWNER TO peterhammans;

--
-- TOC entry 256 (class 1259 OID 20530)
-- Name: migration_model; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.migration_model (
    id character varying(36) NOT NULL,
    version character varying(36),
    update_time bigint DEFAULT 0 NOT NULL
);


ALTER TABLE public.migration_model OWNER TO peterhammans;

--
-- TOC entry 257 (class 1259 OID 20534)
-- Name: offline_client_session; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.offline_client_session (
    user_session_id character varying(36) NOT NULL,
    client_id character varying(255) NOT NULL,
    offline_flag character varying(4) NOT NULL,
    "timestamp" integer,
    data text,
    client_storage_provider character varying(36) DEFAULT 'local'::character varying NOT NULL,
    external_client_id character varying(255) DEFAULT 'local'::character varying NOT NULL,
    version integer DEFAULT 0
);


ALTER TABLE public.offline_client_session OWNER TO peterhammans;

--
-- TOC entry 258 (class 1259 OID 20542)
-- Name: offline_user_session; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.offline_user_session (
    user_session_id character varying(36) NOT NULL,
    user_id character varying(255) NOT NULL,
    realm_id character varying(36) NOT NULL,
    created_on integer NOT NULL,
    offline_flag character varying(4) NOT NULL,
    data text,
    last_session_refresh integer DEFAULT 0 NOT NULL,
    broker_session_id character varying(1024),
    version integer DEFAULT 0
);


ALTER TABLE public.offline_user_session OWNER TO peterhammans;

--
-- TOC entry 259 (class 1259 OID 20549)
-- Name: org; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.org (
    id character varying(255) NOT NULL,
    enabled boolean NOT NULL,
    realm_id character varying(255) NOT NULL,
    group_id character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    description character varying(4000),
    alias character varying(255) NOT NULL,
    redirect_url character varying(2048)
);


ALTER TABLE public.org OWNER TO peterhammans;

--
-- TOC entry 260 (class 1259 OID 20554)
-- Name: org_domain; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.org_domain (
    id character varying(36) NOT NULL,
    name character varying(255) NOT NULL,
    verified boolean NOT NULL,
    org_id character varying(255) NOT NULL
);


ALTER TABLE public.org_domain OWNER TO peterhammans;

--
-- TOC entry 261 (class 1259 OID 20559)
-- Name: policy_config; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.policy_config (
    policy_id character varying(36) NOT NULL,
    name character varying(255) NOT NULL,
    value text
);


ALTER TABLE public.policy_config OWNER TO peterhammans;

--
-- TOC entry 262 (class 1259 OID 20564)
-- Name: protocol_mapper; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.protocol_mapper (
    id character varying(36) NOT NULL,
    name character varying(255) NOT NULL,
    protocol character varying(255) NOT NULL,
    protocol_mapper_name character varying(255) NOT NULL,
    client_id character varying(36),
    client_scope_id character varying(36)
);


ALTER TABLE public.protocol_mapper OWNER TO peterhammans;

--
-- TOC entry 263 (class 1259 OID 20569)
-- Name: protocol_mapper_config; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.protocol_mapper_config (
    protocol_mapper_id character varying(36) NOT NULL,
    value text,
    name character varying(255) NOT NULL
);


ALTER TABLE public.protocol_mapper_config OWNER TO peterhammans;

--
-- TOC entry 264 (class 1259 OID 20574)
-- Name: realm; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.realm (
    id character varying(36) NOT NULL,
    access_code_lifespan integer,
    user_action_lifespan integer,
    access_token_lifespan integer,
    account_theme character varying(255),
    admin_theme character varying(255),
    email_theme character varying(255),
    enabled boolean DEFAULT false NOT NULL,
    events_enabled boolean DEFAULT false NOT NULL,
    events_expiration bigint,
    login_theme character varying(255),
    name character varying(255),
    not_before integer,
    password_policy character varying(2550),
    registration_allowed boolean DEFAULT false NOT NULL,
    remember_me boolean DEFAULT false NOT NULL,
    reset_password_allowed boolean DEFAULT false NOT NULL,
    social boolean DEFAULT false NOT NULL,
    ssl_required character varying(255),
    sso_idle_timeout integer,
    sso_max_lifespan integer,
    update_profile_on_soc_login boolean DEFAULT false NOT NULL,
    verify_email boolean DEFAULT false NOT NULL,
    master_admin_client character varying(36),
    login_lifespan integer,
    internationalization_enabled boolean DEFAULT false NOT NULL,
    default_locale character varying(255),
    reg_email_as_username boolean DEFAULT false NOT NULL,
    admin_events_enabled boolean DEFAULT false NOT NULL,
    admin_events_details_enabled boolean DEFAULT false NOT NULL,
    edit_username_allowed boolean DEFAULT false NOT NULL,
    otp_policy_counter integer DEFAULT 0,
    otp_policy_window integer DEFAULT 1,
    otp_policy_period integer DEFAULT 30,
    otp_policy_digits integer DEFAULT 6,
    otp_policy_alg character varying(36) DEFAULT 'HmacSHA1'::character varying,
    otp_policy_type character varying(36) DEFAULT 'totp'::character varying,
    browser_flow character varying(36),
    registration_flow character varying(36),
    direct_grant_flow character varying(36),
    reset_credentials_flow character varying(36),
    client_auth_flow character varying(36),
    offline_session_idle_timeout integer DEFAULT 0,
    revoke_refresh_token boolean DEFAULT false NOT NULL,
    access_token_life_implicit integer DEFAULT 0,
    login_with_email_allowed boolean DEFAULT true NOT NULL,
    duplicate_emails_allowed boolean DEFAULT false NOT NULL,
    docker_auth_flow character varying(36),
    refresh_token_max_reuse integer DEFAULT 0,
    allow_user_managed_access boolean DEFAULT false NOT NULL,
    sso_max_lifespan_remember_me integer DEFAULT 0 NOT NULL,
    sso_idle_timeout_remember_me integer DEFAULT 0 NOT NULL,
    default_role character varying(255)
);


ALTER TABLE public.realm OWNER TO peterhammans;

--
-- TOC entry 265 (class 1259 OID 20607)
-- Name: realm_attribute; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.realm_attribute (
    name character varying(255) NOT NULL,
    realm_id character varying(36) NOT NULL,
    value text
);


ALTER TABLE public.realm_attribute OWNER TO peterhammans;

--
-- TOC entry 266 (class 1259 OID 20612)
-- Name: realm_default_groups; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.realm_default_groups (
    realm_id character varying(36) NOT NULL,
    group_id character varying(36) NOT NULL
);


ALTER TABLE public.realm_default_groups OWNER TO peterhammans;

--
-- TOC entry 267 (class 1259 OID 20615)
-- Name: realm_enabled_event_types; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.realm_enabled_event_types (
    realm_id character varying(36) NOT NULL,
    value character varying(255) NOT NULL
);


ALTER TABLE public.realm_enabled_event_types OWNER TO peterhammans;

--
-- TOC entry 268 (class 1259 OID 20618)
-- Name: realm_events_listeners; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.realm_events_listeners (
    realm_id character varying(36) NOT NULL,
    value character varying(255) NOT NULL
);


ALTER TABLE public.realm_events_listeners OWNER TO peterhammans;

--
-- TOC entry 269 (class 1259 OID 20621)
-- Name: realm_localizations; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.realm_localizations (
    realm_id character varying(255) NOT NULL,
    locale character varying(255) NOT NULL,
    texts text NOT NULL
);


ALTER TABLE public.realm_localizations OWNER TO peterhammans;

--
-- TOC entry 270 (class 1259 OID 20626)
-- Name: realm_required_credential; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.realm_required_credential (
    type character varying(255) NOT NULL,
    form_label character varying(255),
    input boolean DEFAULT false NOT NULL,
    secret boolean DEFAULT false NOT NULL,
    realm_id character varying(36) NOT NULL
);


ALTER TABLE public.realm_required_credential OWNER TO peterhammans;

--
-- TOC entry 271 (class 1259 OID 20633)
-- Name: realm_smtp_config; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.realm_smtp_config (
    realm_id character varying(36) NOT NULL,
    value character varying(255),
    name character varying(255) NOT NULL
);


ALTER TABLE public.realm_smtp_config OWNER TO peterhammans;

--
-- TOC entry 272 (class 1259 OID 20638)
-- Name: realm_supported_locales; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.realm_supported_locales (
    realm_id character varying(36) NOT NULL,
    value character varying(255) NOT NULL
);


ALTER TABLE public.realm_supported_locales OWNER TO peterhammans;

--
-- TOC entry 273 (class 1259 OID 20641)
-- Name: redirect_uris; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.redirect_uris (
    client_id character varying(36) NOT NULL,
    value character varying(255) NOT NULL
);


ALTER TABLE public.redirect_uris OWNER TO peterhammans;

--
-- TOC entry 274 (class 1259 OID 20644)
-- Name: required_action_config; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.required_action_config (
    required_action_id character varying(36) NOT NULL,
    value text,
    name character varying(255) NOT NULL
);


ALTER TABLE public.required_action_config OWNER TO peterhammans;

--
-- TOC entry 275 (class 1259 OID 20649)
-- Name: required_action_provider; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.required_action_provider (
    id character varying(36) NOT NULL,
    alias character varying(255),
    name character varying(255),
    realm_id character varying(36),
    enabled boolean DEFAULT false NOT NULL,
    default_action boolean DEFAULT false NOT NULL,
    provider_id character varying(255),
    priority integer
);


ALTER TABLE public.required_action_provider OWNER TO peterhammans;

--
-- TOC entry 276 (class 1259 OID 20656)
-- Name: resource_attribute; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.resource_attribute (
    id character varying(36) DEFAULT 'sybase-needs-something-here'::character varying NOT NULL,
    name character varying(255) NOT NULL,
    value character varying(255),
    resource_id character varying(36) NOT NULL
);


ALTER TABLE public.resource_attribute OWNER TO peterhammans;

--
-- TOC entry 277 (class 1259 OID 20662)
-- Name: resource_policy; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.resource_policy (
    resource_id character varying(36) NOT NULL,
    policy_id character varying(36) NOT NULL
);


ALTER TABLE public.resource_policy OWNER TO peterhammans;

--
-- TOC entry 278 (class 1259 OID 20665)
-- Name: resource_scope; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.resource_scope (
    resource_id character varying(36) NOT NULL,
    scope_id character varying(36) NOT NULL
);


ALTER TABLE public.resource_scope OWNER TO peterhammans;

--
-- TOC entry 279 (class 1259 OID 20668)
-- Name: resource_server; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.resource_server (
    id character varying(36) NOT NULL,
    allow_rs_remote_mgmt boolean DEFAULT false NOT NULL,
    policy_enforce_mode smallint NOT NULL,
    decision_strategy smallint DEFAULT 1 NOT NULL
);


ALTER TABLE public.resource_server OWNER TO peterhammans;

--
-- TOC entry 280 (class 1259 OID 20673)
-- Name: resource_server_perm_ticket; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.resource_server_perm_ticket (
    id character varying(36) NOT NULL,
    owner character varying(255) NOT NULL,
    requester character varying(255) NOT NULL,
    created_timestamp bigint NOT NULL,
    granted_timestamp bigint,
    resource_id character varying(36) NOT NULL,
    scope_id character varying(36),
    resource_server_id character varying(36) NOT NULL,
    policy_id character varying(36)
);


ALTER TABLE public.resource_server_perm_ticket OWNER TO peterhammans;

--
-- TOC entry 281 (class 1259 OID 20678)
-- Name: resource_server_policy; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.resource_server_policy (
    id character varying(36) NOT NULL,
    name character varying(255) NOT NULL,
    description character varying(255),
    type character varying(255) NOT NULL,
    decision_strategy smallint,
    logic smallint,
    resource_server_id character varying(36) NOT NULL,
    owner character varying(255)
);


ALTER TABLE public.resource_server_policy OWNER TO peterhammans;

--
-- TOC entry 282 (class 1259 OID 20683)
-- Name: resource_server_resource; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.resource_server_resource (
    id character varying(36) NOT NULL,
    name character varying(255) NOT NULL,
    type character varying(255),
    icon_uri character varying(255),
    owner character varying(255) NOT NULL,
    resource_server_id character varying(36) NOT NULL,
    owner_managed_access boolean DEFAULT false NOT NULL,
    display_name character varying(255)
);


ALTER TABLE public.resource_server_resource OWNER TO peterhammans;

--
-- TOC entry 283 (class 1259 OID 20689)
-- Name: resource_server_scope; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.resource_server_scope (
    id character varying(36) NOT NULL,
    name character varying(255) NOT NULL,
    icon_uri character varying(255),
    resource_server_id character varying(36) NOT NULL,
    display_name character varying(255)
);


ALTER TABLE public.resource_server_scope OWNER TO peterhammans;

--
-- TOC entry 284 (class 1259 OID 20694)
-- Name: resource_uris; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.resource_uris (
    resource_id character varying(36) NOT NULL,
    value character varying(255) NOT NULL
);


ALTER TABLE public.resource_uris OWNER TO peterhammans;

--
-- TOC entry 285 (class 1259 OID 20697)
-- Name: revoked_token; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.revoked_token (
    id character varying(255) NOT NULL,
    expire bigint NOT NULL
);


ALTER TABLE public.revoked_token OWNER TO peterhammans;

--
-- TOC entry 286 (class 1259 OID 20700)
-- Name: role_attribute; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.role_attribute (
    id character varying(36) NOT NULL,
    role_id character varying(36) NOT NULL,
    name character varying(255) NOT NULL,
    value character varying(255)
);


ALTER TABLE public.role_attribute OWNER TO peterhammans;

--
-- TOC entry 287 (class 1259 OID 20705)
-- Name: scope_mapping; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.scope_mapping (
    client_id character varying(36) NOT NULL,
    role_id character varying(36) NOT NULL
);


ALTER TABLE public.scope_mapping OWNER TO peterhammans;

--
-- TOC entry 288 (class 1259 OID 20708)
-- Name: scope_policy; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.scope_policy (
    scope_id character varying(36) NOT NULL,
    policy_id character varying(36) NOT NULL
);


ALTER TABLE public.scope_policy OWNER TO peterhammans;

--
-- TOC entry 289 (class 1259 OID 20711)
-- Name: server_config; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.server_config (
    server_config_key character varying(255) NOT NULL,
    value text NOT NULL,
    version integer DEFAULT 0
);


ALTER TABLE public.server_config OWNER TO peterhammans;

--
-- TOC entry 290 (class 1259 OID 20717)
-- Name: user_attribute; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.user_attribute (
    name character varying(255) NOT NULL,
    value character varying(255),
    user_id character varying(36) NOT NULL,
    id character varying(36) DEFAULT 'sybase-needs-something-here'::character varying NOT NULL,
    long_value_hash bytea,
    long_value_hash_lower_case bytea,
    long_value text
);


ALTER TABLE public.user_attribute OWNER TO peterhammans;

--
-- TOC entry 291 (class 1259 OID 20723)
-- Name: user_consent; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.user_consent (
    id character varying(36) NOT NULL,
    client_id character varying(255),
    user_id character varying(36) NOT NULL,
    created_date bigint,
    last_updated_date bigint,
    client_storage_provider character varying(36),
    external_client_id character varying(255)
);


ALTER TABLE public.user_consent OWNER TO peterhammans;

--
-- TOC entry 292 (class 1259 OID 20728)
-- Name: user_consent_client_scope; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.user_consent_client_scope (
    user_consent_id character varying(36) NOT NULL,
    scope_id character varying(36) NOT NULL
);


ALTER TABLE public.user_consent_client_scope OWNER TO peterhammans;

--
-- TOC entry 293 (class 1259 OID 20731)
-- Name: user_entity; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.user_entity (
    id character varying(36) NOT NULL,
    email character varying(255),
    email_constraint character varying(255),
    email_verified boolean DEFAULT false NOT NULL,
    enabled boolean DEFAULT false NOT NULL,
    federation_link character varying(255),
    first_name character varying(255),
    last_name character varying(255),
    realm_id character varying(255),
    username character varying(255),
    created_timestamp bigint,
    service_account_client_link character varying(255),
    not_before integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.user_entity OWNER TO peterhammans;

--
-- TOC entry 294 (class 1259 OID 20739)
-- Name: user_federation_config; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.user_federation_config (
    user_federation_provider_id character varying(36) NOT NULL,
    value character varying(255),
    name character varying(255) NOT NULL
);


ALTER TABLE public.user_federation_config OWNER TO peterhammans;

--
-- TOC entry 295 (class 1259 OID 20744)
-- Name: user_federation_mapper; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.user_federation_mapper (
    id character varying(36) NOT NULL,
    name character varying(255) NOT NULL,
    federation_provider_id character varying(36) NOT NULL,
    federation_mapper_type character varying(255) NOT NULL,
    realm_id character varying(36) NOT NULL
);


ALTER TABLE public.user_federation_mapper OWNER TO peterhammans;

--
-- TOC entry 296 (class 1259 OID 20749)
-- Name: user_federation_mapper_config; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.user_federation_mapper_config (
    user_federation_mapper_id character varying(36) NOT NULL,
    value character varying(255),
    name character varying(255) NOT NULL
);


ALTER TABLE public.user_federation_mapper_config OWNER TO peterhammans;

--
-- TOC entry 297 (class 1259 OID 20754)
-- Name: user_federation_provider; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.user_federation_provider (
    id character varying(36) NOT NULL,
    changed_sync_period integer,
    display_name character varying(255),
    full_sync_period integer,
    last_sync integer,
    priority integer,
    provider_name character varying(255),
    realm_id character varying(36)
);


ALTER TABLE public.user_federation_provider OWNER TO peterhammans;

--
-- TOC entry 298 (class 1259 OID 20759)
-- Name: user_group_membership; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.user_group_membership (
    group_id character varying(36) NOT NULL,
    user_id character varying(36) NOT NULL,
    membership_type character varying(255) NOT NULL
);


ALTER TABLE public.user_group_membership OWNER TO peterhammans;

--
-- TOC entry 299 (class 1259 OID 20762)
-- Name: user_required_action; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.user_required_action (
    user_id character varying(36) NOT NULL,
    required_action character varying(255) DEFAULT ' '::character varying NOT NULL
);


ALTER TABLE public.user_required_action OWNER TO peterhammans;

--
-- TOC entry 300 (class 1259 OID 20766)
-- Name: user_role_mapping; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.user_role_mapping (
    role_id character varying(255) NOT NULL,
    user_id character varying(36) NOT NULL
);


ALTER TABLE public.user_role_mapping OWNER TO peterhammans;

--
-- TOC entry 301 (class 1259 OID 20769)
-- Name: web_origins; Type: TABLE; Schema: public; Owner: peterhammans
--

CREATE TABLE public.web_origins (
    client_id character varying(36) NOT NULL,
    value character varying(255) NOT NULL
);


ALTER TABLE public.web_origins OWNER TO peterhammans;

--
-- TOC entry 4605 (class 0 OID 20319)
-- Dependencies: 214
-- Data for Name: admin_event_entity; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.admin_event_entity (id, admin_event_time, realm_id, operation_type, auth_realm_id, auth_client_id, auth_user_id, ip_address, resource_path, representation, error, resource_type, details_json) FROM stdin;
\.


--
-- TOC entry 4606 (class 0 OID 20324)
-- Dependencies: 215
-- Data for Name: associated_policy; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.associated_policy (policy_id, associated_policy_id) FROM stdin;
73ef5ea0-1113-45b5-a5dd-6042cb2bd4e7	12544e4e-c3cc-45b9-b0d4-6c3479515fed
\.


--
-- TOC entry 4607 (class 0 OID 20327)
-- Dependencies: 216
-- Data for Name: authentication_execution; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.authentication_execution (id, alias, authenticator, realm_id, flow_id, requirement, priority, authenticator_flow, auth_flow_id, auth_config) FROM stdin;
7cdff2c7-c344-4fac-b03d-199093cfe721	\N	auth-cookie	573be4f5-590a-4831-a3f3-de3d8f56ec34	19a16325-2f06-4121-9263-8b920bd70fb5	2	10	f	\N	\N
c2437e23-154b-4882-913c-860c967ad690	\N	auth-spnego	573be4f5-590a-4831-a3f3-de3d8f56ec34	19a16325-2f06-4121-9263-8b920bd70fb5	3	20	f	\N	\N
e4f0d6fc-7701-4d35-9e48-40f47fcc1379	\N	identity-provider-redirector	573be4f5-590a-4831-a3f3-de3d8f56ec34	19a16325-2f06-4121-9263-8b920bd70fb5	2	25	f	\N	\N
2bbc874a-7dc5-4762-a563-de92e16e66cc	\N	\N	573be4f5-590a-4831-a3f3-de3d8f56ec34	19a16325-2f06-4121-9263-8b920bd70fb5	2	30	t	6d9a265c-f70e-4f1c-838c-b0f6fef7a80a	\N
24a97f64-30c9-4757-9845-240db9cd65cb	\N	auth-username-password-form	573be4f5-590a-4831-a3f3-de3d8f56ec34	6d9a265c-f70e-4f1c-838c-b0f6fef7a80a	0	10	f	\N	\N
e1d4d385-7755-4439-a497-eafaed0c8041	\N	\N	573be4f5-590a-4831-a3f3-de3d8f56ec34	6d9a265c-f70e-4f1c-838c-b0f6fef7a80a	1	20	t	5f032ebf-065d-40bd-b2b5-77170c8bffd6	\N
270869ca-2685-47d9-8370-4f9a5d347be2	\N	conditional-user-configured	573be4f5-590a-4831-a3f3-de3d8f56ec34	5f032ebf-065d-40bd-b2b5-77170c8bffd6	0	10	f	\N	\N
e856008c-8f52-4c98-8d9e-ef9d163ced6d	\N	auth-otp-form	573be4f5-590a-4831-a3f3-de3d8f56ec34	5f032ebf-065d-40bd-b2b5-77170c8bffd6	0	20	f	\N	\N
5bdea286-d3b4-4f1a-9b45-aaaa76e5c167	\N	direct-grant-validate-username	573be4f5-590a-4831-a3f3-de3d8f56ec34	992c783e-b987-46de-a2ea-fdc73d5db459	0	10	f	\N	\N
61171c4c-5a31-46ee-aa0a-e740de68b7c1	\N	direct-grant-validate-password	573be4f5-590a-4831-a3f3-de3d8f56ec34	992c783e-b987-46de-a2ea-fdc73d5db459	0	20	f	\N	\N
54a5f871-aaa7-492b-a09c-39ba5fd7f99a	\N	\N	573be4f5-590a-4831-a3f3-de3d8f56ec34	992c783e-b987-46de-a2ea-fdc73d5db459	1	30	t	229d56ab-e132-4946-b53c-b589c432a9d7	\N
e81d1f3e-ad75-45c1-bc44-90e0172343ec	\N	conditional-user-configured	573be4f5-590a-4831-a3f3-de3d8f56ec34	229d56ab-e132-4946-b53c-b589c432a9d7	0	10	f	\N	\N
8c75f8df-079a-447b-baba-d0144b702d4a	\N	direct-grant-validate-otp	573be4f5-590a-4831-a3f3-de3d8f56ec34	229d56ab-e132-4946-b53c-b589c432a9d7	0	20	f	\N	\N
d128442f-f67e-4038-bda9-5e6bdd549d41	\N	registration-page-form	573be4f5-590a-4831-a3f3-de3d8f56ec34	8d8b43a6-bd31-4294-9371-5ecf5c98387d	0	10	t	7e069f6d-3284-495b-8b79-82a97219777c	\N
f7a2e2d7-75ae-449a-a7e4-f71db94c117e	\N	registration-user-creation	573be4f5-590a-4831-a3f3-de3d8f56ec34	7e069f6d-3284-495b-8b79-82a97219777c	0	20	f	\N	\N
e9f4a6e5-420b-4d84-8536-141699561b9c	\N	registration-password-action	573be4f5-590a-4831-a3f3-de3d8f56ec34	7e069f6d-3284-495b-8b79-82a97219777c	0	50	f	\N	\N
ad84ef5f-12c1-4c3c-b47c-7dd93c966e52	\N	registration-recaptcha-action	573be4f5-590a-4831-a3f3-de3d8f56ec34	7e069f6d-3284-495b-8b79-82a97219777c	3	60	f	\N	\N
1c1d560e-d782-4740-a3fa-a7831f30d7cf	\N	registration-terms-and-conditions	573be4f5-590a-4831-a3f3-de3d8f56ec34	7e069f6d-3284-495b-8b79-82a97219777c	3	70	f	\N	\N
6f1acbd7-5b01-46ff-a444-17d704893c95	\N	reset-credentials-choose-user	573be4f5-590a-4831-a3f3-de3d8f56ec34	a0635e83-f6ac-4a73-9ada-c56edca67a49	0	10	f	\N	\N
eb8038d0-0a3e-4080-b5fc-d0860caa14c7	\N	reset-credential-email	573be4f5-590a-4831-a3f3-de3d8f56ec34	a0635e83-f6ac-4a73-9ada-c56edca67a49	0	20	f	\N	\N
522e4711-f514-456c-ab63-031f5663e95e	\N	reset-password	573be4f5-590a-4831-a3f3-de3d8f56ec34	a0635e83-f6ac-4a73-9ada-c56edca67a49	0	30	f	\N	\N
565a8b3e-edc4-407d-82df-0b5b6112aa64	\N	\N	573be4f5-590a-4831-a3f3-de3d8f56ec34	a0635e83-f6ac-4a73-9ada-c56edca67a49	1	40	t	bcde96f8-fc1b-4614-8d80-2df3a2d38e95	\N
b03514e3-c8fc-4d7b-a3c1-bf07a2d1d9fa	\N	conditional-user-configured	573be4f5-590a-4831-a3f3-de3d8f56ec34	bcde96f8-fc1b-4614-8d80-2df3a2d38e95	0	10	f	\N	\N
2859fc00-5d82-42be-bba4-5810957b4caa	\N	reset-otp	573be4f5-590a-4831-a3f3-de3d8f56ec34	bcde96f8-fc1b-4614-8d80-2df3a2d38e95	0	20	f	\N	\N
c594f4f9-6061-4cd0-8571-e5beaf178bc9	\N	client-secret	573be4f5-590a-4831-a3f3-de3d8f56ec34	e577ab38-112c-418c-80dc-a59e2bd48270	2	10	f	\N	\N
ad303887-bfa4-40f6-aaf8-b009af98deab	\N	client-jwt	573be4f5-590a-4831-a3f3-de3d8f56ec34	e577ab38-112c-418c-80dc-a59e2bd48270	2	20	f	\N	\N
4ae77528-77b3-4f9b-b5ed-7744258c7788	\N	client-secret-jwt	573be4f5-590a-4831-a3f3-de3d8f56ec34	e577ab38-112c-418c-80dc-a59e2bd48270	2	30	f	\N	\N
6cdf8610-6dd6-4b5d-809e-bf40964b16d1	\N	client-x509	573be4f5-590a-4831-a3f3-de3d8f56ec34	e577ab38-112c-418c-80dc-a59e2bd48270	2	40	f	\N	\N
fd671e73-e17d-4fde-a165-8307dfa6362a	\N	idp-review-profile	573be4f5-590a-4831-a3f3-de3d8f56ec34	0b249727-dc1b-42a9-8921-8331e387741b	0	10	f	\N	495c3a3d-cefd-47bb-97a1-fce5ec90187c
59cc030c-cb6e-464d-a7f8-8f74f595d6f6	\N	\N	573be4f5-590a-4831-a3f3-de3d8f56ec34	0b249727-dc1b-42a9-8921-8331e387741b	0	20	t	36549c21-d493-4f4e-8f7f-c9c010ab157f	\N
3c422604-db34-4c11-a5ad-f53d722603b2	\N	idp-create-user-if-unique	573be4f5-590a-4831-a3f3-de3d8f56ec34	36549c21-d493-4f4e-8f7f-c9c010ab157f	2	10	f	\N	c5c20aa8-bdc6-45ad-b52c-49bd50a9f29b
fba8a0e1-a766-4cc8-8e8d-65985dde2a63	\N	\N	573be4f5-590a-4831-a3f3-de3d8f56ec34	36549c21-d493-4f4e-8f7f-c9c010ab157f	2	20	t	ac5c8127-c489-4702-b1c6-c8be534a1a1f	\N
a9d26c56-bed7-43ea-a231-0d61fea502ce	\N	idp-confirm-link	573be4f5-590a-4831-a3f3-de3d8f56ec34	ac5c8127-c489-4702-b1c6-c8be534a1a1f	0	10	f	\N	\N
10cf5722-d175-42c1-b51e-5fe67c0f8635	\N	\N	573be4f5-590a-4831-a3f3-de3d8f56ec34	ac5c8127-c489-4702-b1c6-c8be534a1a1f	0	20	t	7e6c4216-04db-4e93-b6a6-a0158596c3a2	\N
4633d5a6-8574-4fc1-978b-6b2ee701e153	\N	idp-email-verification	573be4f5-590a-4831-a3f3-de3d8f56ec34	7e6c4216-04db-4e93-b6a6-a0158596c3a2	2	10	f	\N	\N
8e7a80bf-1b04-4477-ac12-2df48bd4a86d	\N	\N	573be4f5-590a-4831-a3f3-de3d8f56ec34	7e6c4216-04db-4e93-b6a6-a0158596c3a2	2	20	t	e35e850b-19af-4bd1-ab4b-aef4297aa678	\N
d70f86a0-c259-4b2a-ade0-f38956862ac7	\N	idp-username-password-form	573be4f5-590a-4831-a3f3-de3d8f56ec34	e35e850b-19af-4bd1-ab4b-aef4297aa678	0	10	f	\N	\N
f7fbdc88-b690-4c5b-8eca-c976cd5ff41f	\N	\N	573be4f5-590a-4831-a3f3-de3d8f56ec34	e35e850b-19af-4bd1-ab4b-aef4297aa678	1	20	t	189ad434-1d57-43c6-877d-6a5de8dcc625	\N
2d043257-9d22-4a39-8f8d-ce62f896c95e	\N	conditional-user-configured	573be4f5-590a-4831-a3f3-de3d8f56ec34	189ad434-1d57-43c6-877d-6a5de8dcc625	0	10	f	\N	\N
b97edbcc-9880-4db5-ba21-c204af0a1223	\N	auth-otp-form	573be4f5-590a-4831-a3f3-de3d8f56ec34	189ad434-1d57-43c6-877d-6a5de8dcc625	0	20	f	\N	\N
ca4c4a72-0578-428c-964c-40284e0e4056	\N	http-basic-authenticator	573be4f5-590a-4831-a3f3-de3d8f56ec34	fc3f122d-b2b3-4c29-83b8-4cd3016f5a84	0	10	f	\N	\N
f2a7fd2e-c26d-4846-b2d1-4f837a1f3567	\N	docker-http-basic-authenticator	573be4f5-590a-4831-a3f3-de3d8f56ec34	5e204185-10d4-4153-843c-02650d978555	0	10	f	\N	\N
fdb31886-17e7-47da-b0e6-874fb7442a8f	\N	auth-cookie	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	a997f31d-0946-4e2b-a826-a064c426fc46	2	10	f	\N	\N
208a2966-4fda-4142-b989-a40b325d1799	\N	auth-spnego	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	a997f31d-0946-4e2b-a826-a064c426fc46	3	20	f	\N	\N
36bd2d1f-a729-4396-94cd-51f1fe411e30	\N	identity-provider-redirector	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	a997f31d-0946-4e2b-a826-a064c426fc46	2	25	f	\N	\N
2d157333-6b43-4bc1-a05b-2873658c37b4	\N	\N	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	a997f31d-0946-4e2b-a826-a064c426fc46	2	30	t	e022b4e9-0322-48bf-82ce-5c03693b7312	\N
b5f161ef-0af3-40e6-b5d8-3dbf6e366f8b	\N	auth-username-password-form	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	e022b4e9-0322-48bf-82ce-5c03693b7312	0	10	f	\N	\N
6f3f3861-a2d6-4602-8460-3aad2da674b7	\N	\N	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	e022b4e9-0322-48bf-82ce-5c03693b7312	1	20	t	c9ae75ac-2cc3-45ea-983e-1b9a6580d055	\N
34d26275-5d68-4005-b6e7-f757689d01c2	\N	conditional-user-configured	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	c9ae75ac-2cc3-45ea-983e-1b9a6580d055	0	10	f	\N	\N
a05975ff-9b82-4235-8ccd-5aedffbd2d4b	\N	auth-otp-form	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	c9ae75ac-2cc3-45ea-983e-1b9a6580d055	0	20	f	\N	\N
a5a22d4e-8861-492d-bcf9-1f228e58e505	\N	\N	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	a997f31d-0946-4e2b-a826-a064c426fc46	2	26	t	9f3357a7-9a3f-42e3-9cc3-9a275b38597b	\N
8a33c8ea-d44b-4b13-97c8-fb3112e381df	\N	\N	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	9f3357a7-9a3f-42e3-9cc3-9a275b38597b	1	10	t	c39415b3-21b3-4093-b141-2beaa2290291	\N
7f03a04e-a4f5-400c-8178-a63b7aa61d47	\N	conditional-user-configured	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	c39415b3-21b3-4093-b141-2beaa2290291	0	10	f	\N	\N
92b35433-e78f-4787-bdca-2df7a89ea1b8	\N	organization	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	c39415b3-21b3-4093-b141-2beaa2290291	2	20	f	\N	\N
9fda8c6f-130b-438a-996f-9e10eb699086	\N	direct-grant-validate-username	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	42b24d19-6011-4d5d-a80a-f38785737b6a	0	10	f	\N	\N
a364c661-bc60-4041-9d7d-a7e3d2152aea	\N	direct-grant-validate-password	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	42b24d19-6011-4d5d-a80a-f38785737b6a	0	20	f	\N	\N
36f19f4b-4504-458e-8e06-5afece1c4f42	\N	\N	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	42b24d19-6011-4d5d-a80a-f38785737b6a	1	30	t	870a7959-45fd-49ed-9679-080c8affb038	\N
5861efca-ac80-4cac-b079-cf7ecfeb6cee	\N	conditional-user-configured	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	870a7959-45fd-49ed-9679-080c8affb038	0	10	f	\N	\N
02961108-4561-4d30-a080-3916d58a841e	\N	direct-grant-validate-otp	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	870a7959-45fd-49ed-9679-080c8affb038	0	20	f	\N	\N
15dce84a-2416-4387-897d-3752be92a492	\N	registration-page-form	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	2b1716c6-98b1-4e79-b7c3-47957f4d8b4b	0	10	t	8830fbc0-137e-4fdf-b35a-2798abf3f143	\N
cfdde3bd-310e-4c2e-937c-bd09b753dfde	\N	registration-user-creation	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	8830fbc0-137e-4fdf-b35a-2798abf3f143	0	20	f	\N	\N
a59d0278-822d-4b60-9cf6-8a2ac17f316c	\N	registration-password-action	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	8830fbc0-137e-4fdf-b35a-2798abf3f143	0	50	f	\N	\N
392812e2-bd6e-4fc7-a9c5-ecde1acecf21	\N	registration-terms-and-conditions	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	8830fbc0-137e-4fdf-b35a-2798abf3f143	3	70	f	\N	\N
f455aaf8-e711-426c-a9d1-69b10d453416	\N	reset-credentials-choose-user	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	f641142b-65b5-42a7-86ef-5844d10e9436	0	10	f	\N	\N
aba39456-1c94-4677-8ae1-939bfb44b8b1	\N	reset-credential-email	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	f641142b-65b5-42a7-86ef-5844d10e9436	0	20	f	\N	\N
61656db4-62e2-457b-b107-343bf6bfb915	\N	reset-password	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	f641142b-65b5-42a7-86ef-5844d10e9436	0	30	f	\N	\N
e1d6ff6b-6b75-4dad-b907-bfe2a6a25ccc	\N	\N	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	f641142b-65b5-42a7-86ef-5844d10e9436	1	40	t	b83290c3-4c45-4bad-b349-45de8aebe4e8	\N
f6fd21fa-42c6-4f82-b129-c612cb5b4291	\N	conditional-user-configured	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	b83290c3-4c45-4bad-b349-45de8aebe4e8	0	10	f	\N	\N
7d43dfcc-951c-4902-a17e-c44b568effaa	\N	reset-otp	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	b83290c3-4c45-4bad-b349-45de8aebe4e8	0	20	f	\N	\N
0866cb16-9060-4cec-a236-6136c6c8d336	\N	client-secret	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	ba387be5-c3d9-4351-b8bd-b731f3705123	2	10	f	\N	\N
6cfbe961-8ee8-45ae-9caa-27f882ee28c1	\N	client-jwt	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	ba387be5-c3d9-4351-b8bd-b731f3705123	2	20	f	\N	\N
32bd7435-6f36-442c-a1ea-8b497b3e23ba	\N	client-secret-jwt	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	ba387be5-c3d9-4351-b8bd-b731f3705123	2	30	f	\N	\N
cfaeaf66-4ca4-4148-882c-8217c0e7e706	\N	client-x509	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	ba387be5-c3d9-4351-b8bd-b731f3705123	2	40	f	\N	\N
dd9d983c-fc45-41f7-b65a-c98588d0b557	\N	idp-review-profile	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	c21873f4-703b-4070-99cb-e39542826529	0	10	f	\N	0dfab337-2c8e-43a4-bb3e-e3ddd0efd729
b090f2da-53e0-4558-b23e-8d29c55a7b9d	\N	\N	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	c21873f4-703b-4070-99cb-e39542826529	0	20	t	bebf94bd-fc39-4a2a-b05c-4440146e5c2d	\N
e793013a-0c2c-4e9a-80a2-db1053fd683e	\N	idp-create-user-if-unique	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	bebf94bd-fc39-4a2a-b05c-4440146e5c2d	2	10	f	\N	aff67f07-df65-4d14-8e90-35f3de51e8e9
ccf2d38b-217e-40ac-9863-c6338ce20ac0	\N	\N	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	bebf94bd-fc39-4a2a-b05c-4440146e5c2d	2	20	t	f21be911-927e-4c72-b658-cb81d8c119b9	\N
2104433a-c593-44ba-8a2a-503effc5b251	\N	idp-confirm-link	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	f21be911-927e-4c72-b658-cb81d8c119b9	0	10	f	\N	\N
21022d86-06c9-40ac-a306-cea8c9d063ca	\N	\N	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	f21be911-927e-4c72-b658-cb81d8c119b9	0	20	t	7b80423a-8a53-4374-9cb0-c5e123499ff2	\N
3bdbed3a-485a-42cc-9449-ff498fb5f4d1	\N	idp-email-verification	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	7b80423a-8a53-4374-9cb0-c5e123499ff2	2	10	f	\N	\N
1bedbf3a-51cb-4864-b14c-2c867c215c24	\N	\N	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	7b80423a-8a53-4374-9cb0-c5e123499ff2	2	20	t	bee270e7-2a28-447a-9ae0-41cffd84ea56	\N
733e677b-1308-459b-88fd-9b6d4ec47b30	\N	idp-username-password-form	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	bee270e7-2a28-447a-9ae0-41cffd84ea56	0	10	f	\N	\N
3515f7b5-d2cf-4cad-a1f1-408f2463aa4c	\N	\N	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	bee270e7-2a28-447a-9ae0-41cffd84ea56	1	20	t	48ed6e7f-9bb7-43ee-9caa-b0248765f75c	\N
6d6df7b0-faea-495c-9e08-6c57f236b2e1	\N	conditional-user-configured	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	48ed6e7f-9bb7-43ee-9caa-b0248765f75c	0	10	f	\N	\N
b8c68d96-cef9-42ad-bfc4-b818ff6fd57c	\N	auth-otp-form	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	48ed6e7f-9bb7-43ee-9caa-b0248765f75c	0	20	f	\N	\N
894a4890-a587-40b3-b4f3-cf10e98f4f4d	\N	\N	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	c21873f4-703b-4070-99cb-e39542826529	1	50	t	74bc3936-2045-4f20-b87e-6f26182ddba7	\N
9043e3db-87c5-434f-8fb6-30ad6a9678cc	\N	conditional-user-configured	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	74bc3936-2045-4f20-b87e-6f26182ddba7	0	10	f	\N	\N
fd8463d4-51e1-499a-a210-d43b989ba6d4	\N	idp-add-organization-member	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	74bc3936-2045-4f20-b87e-6f26182ddba7	0	20	f	\N	\N
167cfc30-895b-4be1-9573-5a678bedef72	\N	http-basic-authenticator	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	8f576985-e186-4449-934c-24120478c3f4	0	10	f	\N	\N
3b1cd16a-3127-4bd6-83a5-b00609ecd839	\N	docker-http-basic-authenticator	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	8238cb30-cde4-4593-90b4-81fb0d84b1f2	0	10	f	\N	\N
e463fff7-41fe-410b-9ab8-485f5b1b2ba4	\N	auth-cookie	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	5225f254-30bd-4be6-967b-3eb7b0d06806	2	10	f	\N	\N
8943edd4-7ed3-4ab4-95d7-f4d399059b32	\N	auth-spnego	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	5225f254-30bd-4be6-967b-3eb7b0d06806	3	20	f	\N	\N
9c6263d4-c964-4bd1-a84a-1344035c2ffb	\N	identity-provider-redirector	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	5225f254-30bd-4be6-967b-3eb7b0d06806	2	25	f	\N	\N
47823ef3-13b2-49f5-9596-213035c70bd8	\N	\N	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	5225f254-30bd-4be6-967b-3eb7b0d06806	2	30	t	979c5892-6671-473b-adac-352028e6b597	\N
1cef2ec8-f77d-4fb6-9654-c2a5c8fa8b66	\N	auth-username-password-form	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	979c5892-6671-473b-adac-352028e6b597	0	10	f	\N	\N
d2712829-f4a7-41aa-9f7c-ca000c37227d	\N	\N	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	979c5892-6671-473b-adac-352028e6b597	1	20	t	19238915-4e57-4526-9cc8-a7cdb92069de	\N
d275a90b-f799-4370-8c8e-d23f93d4091b	\N	conditional-user-configured	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	19238915-4e57-4526-9cc8-a7cdb92069de	0	10	f	\N	\N
08fe3a5a-9955-4023-807d-12ca4a5972d0	\N	auth-otp-form	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	19238915-4e57-4526-9cc8-a7cdb92069de	0	20	f	\N	\N
d7910eff-43c7-4b29-8a9d-5a2ecc314cc6	\N	\N	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	5225f254-30bd-4be6-967b-3eb7b0d06806	2	26	t	091b70a2-caab-48f6-9fa1-1c4d4b292f44	\N
d955052e-2609-40b8-b7ff-2c1581e4db6f	\N	\N	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	091b70a2-caab-48f6-9fa1-1c4d4b292f44	1	10	t	57ccc88d-412a-4a17-ab41-22f89708cc92	\N
04531700-33ba-4030-9136-ab0dac09bcfe	\N	conditional-user-configured	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	57ccc88d-412a-4a17-ab41-22f89708cc92	0	10	f	\N	\N
8d690461-19b5-4f16-830f-0325b865cb39	\N	organization	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	57ccc88d-412a-4a17-ab41-22f89708cc92	2	20	f	\N	\N
9af66771-d61b-48f1-b3b2-357d47e501d6	\N	direct-grant-validate-username	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	831a2334-6e5b-4968-8c3b-1835d90a9276	0	10	f	\N	\N
e4c084d2-0894-42e2-a425-9cc6b6e5d9eb	\N	direct-grant-validate-password	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	831a2334-6e5b-4968-8c3b-1835d90a9276	0	20	f	\N	\N
8026bf92-87b0-4b1c-be8b-a050d6de75bb	\N	\N	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	831a2334-6e5b-4968-8c3b-1835d90a9276	1	30	t	05ba8b5d-b07b-4b84-b914-3ffb78cf266a	\N
d206ab9b-f9a3-4083-a1dc-09b6f146d53b	\N	conditional-user-configured	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	05ba8b5d-b07b-4b84-b914-3ffb78cf266a	0	10	f	\N	\N
37a21a07-eef8-423f-9ea9-0c23f13980ae	\N	direct-grant-validate-otp	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	05ba8b5d-b07b-4b84-b914-3ffb78cf266a	0	20	f	\N	\N
64d9bdd1-8f6f-49db-a345-64ddd8e173f5	\N	registration-page-form	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	9e58ab26-47a1-46fc-bb49-01a776fe3a4e	0	10	t	c69f8a90-4745-4ae1-8c2a-29aa5f7c9e01	\N
dea1aa3f-7025-428e-aa20-3e86762691de	\N	registration-user-creation	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	c69f8a90-4745-4ae1-8c2a-29aa5f7c9e01	0	20	f	\N	\N
e4f85d07-d73f-4124-977d-bc6c7033b9fa	\N	registration-password-action	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	c69f8a90-4745-4ae1-8c2a-29aa5f7c9e01	0	50	f	\N	\N
40e19e86-9b0e-409c-a048-b9ef35c98e96	\N	registration-recaptcha-action	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	c69f8a90-4745-4ae1-8c2a-29aa5f7c9e01	3	60	f	\N	\N
2b084f31-c29a-48d4-8da4-e03cf97a2901	\N	registration-terms-and-conditions	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	c69f8a90-4745-4ae1-8c2a-29aa5f7c9e01	3	70	f	\N	\N
cfbfc4fb-792f-4f5b-a1df-58ba0627ecc4	\N	reset-credentials-choose-user	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	600c471e-3d34-419a-8bb1-d547add33bff	0	10	f	\N	\N
8d592c9b-f7dd-471d-b433-c7ff7512411a	\N	reset-credential-email	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	600c471e-3d34-419a-8bb1-d547add33bff	0	20	f	\N	\N
efc66560-82da-4fd3-8487-86a9555c9b73	\N	reset-password	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	600c471e-3d34-419a-8bb1-d547add33bff	0	30	f	\N	\N
e7d5c083-4eba-4ef3-a131-c094ce0f71ae	\N	\N	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	600c471e-3d34-419a-8bb1-d547add33bff	1	40	t	289c8921-17a9-4fcf-b89f-54b1a93e5aa6	\N
7f558905-cc12-4828-a2fe-9055cac5802d	\N	conditional-user-configured	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	289c8921-17a9-4fcf-b89f-54b1a93e5aa6	0	10	f	\N	\N
a020b213-dcb9-42e6-8478-ebd49be2b3f3	\N	reset-otp	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	289c8921-17a9-4fcf-b89f-54b1a93e5aa6	0	20	f	\N	\N
9e8706be-0adb-46a0-bfcc-71289c6845d7	\N	client-secret	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	f066861a-4711-451e-aa2f-b84291bf574c	2	10	f	\N	\N
284f89c6-0b12-4e4f-b7ad-166ff9002cec	\N	client-jwt	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	f066861a-4711-451e-aa2f-b84291bf574c	2	20	f	\N	\N
8cb6e913-aa5f-4624-ab64-561ba8606107	\N	client-secret-jwt	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	f066861a-4711-451e-aa2f-b84291bf574c	2	30	f	\N	\N
7ad0416a-f90d-4d4e-b530-efcec5264df0	\N	client-x509	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	f066861a-4711-451e-aa2f-b84291bf574c	2	40	f	\N	\N
7f2c8aa5-d90f-4737-ad3a-5f48e4e7db2c	\N	idp-review-profile	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	f3b8759d-f220-4370-8503-5d26c7630df0	0	10	f	\N	f58c1c58-cc03-48ee-aca1-9fbd680032a4
d2baf889-c7fc-42d0-b01b-95bcb563bb1f	\N	\N	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	f3b8759d-f220-4370-8503-5d26c7630df0	0	20	t	7a967b9d-27ca-4586-a15b-144a540e0592	\N
fa26802f-a1db-4bb6-a90d-17b11b061041	\N	idp-create-user-if-unique	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	7a967b9d-27ca-4586-a15b-144a540e0592	2	10	f	\N	a026c622-b3be-4da1-98c6-abf95c701945
5eef6796-d8bc-42c0-8222-70243b5b42a5	\N	\N	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	7a967b9d-27ca-4586-a15b-144a540e0592	2	20	t	65d60c63-43f3-4bd1-8a70-095773999d13	\N
6c3a0fe6-c1f9-4066-9df3-5172104a32a1	\N	idp-confirm-link	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	65d60c63-43f3-4bd1-8a70-095773999d13	0	10	f	\N	\N
dbc766c1-0149-4fe0-afa6-7973ef3ba492	\N	\N	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	65d60c63-43f3-4bd1-8a70-095773999d13	0	20	t	f5764cf2-0626-46c1-b6ae-b20e06b7611e	\N
50e72e0b-8221-4bab-9709-3267f5511d79	\N	idp-email-verification	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	f5764cf2-0626-46c1-b6ae-b20e06b7611e	2	10	f	\N	\N
c7c8b233-ac6f-43e7-b06f-c389fe477e45	\N	\N	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	f5764cf2-0626-46c1-b6ae-b20e06b7611e	2	20	t	b007123d-f187-431b-8df5-83cb2d25d4c1	\N
1e049e9f-e07f-4330-ad4f-7dc605c5e896	\N	idp-username-password-form	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	b007123d-f187-431b-8df5-83cb2d25d4c1	0	10	f	\N	\N
fd25a44f-ddb6-425b-8453-966aa2143122	\N	\N	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	b007123d-f187-431b-8df5-83cb2d25d4c1	1	20	t	02a00299-cfbf-4845-a408-62696f5988c9	\N
134fada4-4344-4974-86b3-53bbcc54fecd	\N	conditional-user-configured	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	02a00299-cfbf-4845-a408-62696f5988c9	0	10	f	\N	\N
f650d7c8-fcde-4157-b66a-3a65c5803ec4	\N	auth-otp-form	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	02a00299-cfbf-4845-a408-62696f5988c9	0	20	f	\N	\N
437226d5-fc43-48a0-b553-92e1392da02b	\N	\N	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	f3b8759d-f220-4370-8503-5d26c7630df0	1	50	t	dbe4458e-6333-4a26-8e3e-995069487ff2	\N
32ff5133-797e-409f-a41d-fcb301d0e808	\N	conditional-user-configured	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	dbe4458e-6333-4a26-8e3e-995069487ff2	0	10	f	\N	\N
f6d8b5da-5a03-47f3-8ff8-bb97390e006e	\N	idp-add-organization-member	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	dbe4458e-6333-4a26-8e3e-995069487ff2	0	20	f	\N	\N
69a8d3d5-12a7-47ed-803f-91e4550e02e2	\N	http-basic-authenticator	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	d584b605-ebc1-4cc8-b168-23943f861d10	0	10	f	\N	\N
d11d8a7d-d130-4c3e-adb1-9bc7bdd49fb5	\N	docker-http-basic-authenticator	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	c9f96d95-d372-45d7-8aa2-541fa5790b10	0	10	f	\N	\N
114a6f3a-0161-4663-aed8-ec2b2db4de46	\N	auth-cookie	573be4f5-590a-4831-a3f3-de3d8f56ec34	f58e59df-640b-4d72-8e62-0b803f69b836	2	10	f	\N	\N
b4da44a7-138f-4b94-b96b-ade46d621d5b	\N	auth-spnego	573be4f5-590a-4831-a3f3-de3d8f56ec34	f58e59df-640b-4d72-8e62-0b803f69b836	3	20	f	\N	\N
6495ef5e-b325-4060-906f-703d240179ab	\N	identity-provider-redirector	573be4f5-590a-4831-a3f3-de3d8f56ec34	f58e59df-640b-4d72-8e62-0b803f69b836	2	25	f	\N	\N
ea643e50-7f22-4f7c-b9f8-bbf7a734d471	\N	auth-username-password-form	573be4f5-590a-4831-a3f3-de3d8f56ec34	8a97dcfa-14a6-4cac-b086-084578fc520e	0	10	f	\N	\N
d91fbaae-3979-4cf8-a0e0-1309b717e415	\N	conditional-user-configured	573be4f5-590a-4831-a3f3-de3d8f56ec34	bb802366-6d71-4de3-a57e-cdd17bfbe3d0	0	10	f	\N	\N
18608e6b-4290-49bd-96c7-7250d375ffee	\N	auth-otp-form	573be4f5-590a-4831-a3f3-de3d8f56ec34	bb802366-6d71-4de3-a57e-cdd17bfbe3d0	0	20	f	\N	\N
b2c43822-7a2e-4e33-ba4f-6e7c47389707	\N	\N	573be4f5-590a-4831-a3f3-de3d8f56ec34	8a97dcfa-14a6-4cac-b086-084578fc520e	1	20	t	bb802366-6d71-4de3-a57e-cdd17bfbe3d0	\N
a114bccf-14fa-49db-af7c-15bf09f57eec	\N	\N	573be4f5-590a-4831-a3f3-de3d8f56ec34	f58e59df-640b-4d72-8e62-0b803f69b836	2	30	t	8a97dcfa-14a6-4cac-b086-084578fc520e	\N
abc16278-8fd3-482e-a626-0df04fbe65d5	\N	registration-recaptcha-action	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	8830fbc0-137e-4fdf-b35a-2798abf3f143	3	60	f	\N	8f4b6522-18a2-49ae-a61f-4c0d32fa98c2
\.


--
-- TOC entry 4608 (class 0 OID 20331)
-- Dependencies: 217
-- Data for Name: authentication_flow; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.authentication_flow (id, alias, description, realm_id, provider_id, top_level, built_in) FROM stdin;
19a16325-2f06-4121-9263-8b920bd70fb5	browser	Browser based authentication	573be4f5-590a-4831-a3f3-de3d8f56ec34	basic-flow	t	t
6d9a265c-f70e-4f1c-838c-b0f6fef7a80a	forms	Username, password, otp and other auth forms.	573be4f5-590a-4831-a3f3-de3d8f56ec34	basic-flow	f	t
5f032ebf-065d-40bd-b2b5-77170c8bffd6	Browser - Conditional OTP	Flow to determine if the OTP is required for the authentication	573be4f5-590a-4831-a3f3-de3d8f56ec34	basic-flow	f	t
992c783e-b987-46de-a2ea-fdc73d5db459	direct grant	OpenID Connect Resource Owner Grant	573be4f5-590a-4831-a3f3-de3d8f56ec34	basic-flow	t	t
229d56ab-e132-4946-b53c-b589c432a9d7	Direct Grant - Conditional OTP	Flow to determine if the OTP is required for the authentication	573be4f5-590a-4831-a3f3-de3d8f56ec34	basic-flow	f	t
8d8b43a6-bd31-4294-9371-5ecf5c98387d	registration	Registration flow	573be4f5-590a-4831-a3f3-de3d8f56ec34	basic-flow	t	t
7e069f6d-3284-495b-8b79-82a97219777c	registration form	Registration form	573be4f5-590a-4831-a3f3-de3d8f56ec34	form-flow	f	t
a0635e83-f6ac-4a73-9ada-c56edca67a49	reset credentials	Reset credentials for a user if they forgot their password or something	573be4f5-590a-4831-a3f3-de3d8f56ec34	basic-flow	t	t
bcde96f8-fc1b-4614-8d80-2df3a2d38e95	Reset - Conditional OTP	Flow to determine if the OTP should be reset or not. Set to REQUIRED to force.	573be4f5-590a-4831-a3f3-de3d8f56ec34	basic-flow	f	t
e577ab38-112c-418c-80dc-a59e2bd48270	clients	Base authentication for clients	573be4f5-590a-4831-a3f3-de3d8f56ec34	client-flow	t	t
0b249727-dc1b-42a9-8921-8331e387741b	first broker login	Actions taken after first broker login with identity provider account, which is not yet linked to any Keycloak account	573be4f5-590a-4831-a3f3-de3d8f56ec34	basic-flow	t	t
36549c21-d493-4f4e-8f7f-c9c010ab157f	User creation or linking	Flow for the existing/non-existing user alternatives	573be4f5-590a-4831-a3f3-de3d8f56ec34	basic-flow	f	t
ac5c8127-c489-4702-b1c6-c8be534a1a1f	Handle Existing Account	Handle what to do if there is existing account with same email/username like authenticated identity provider	573be4f5-590a-4831-a3f3-de3d8f56ec34	basic-flow	f	t
7e6c4216-04db-4e93-b6a6-a0158596c3a2	Account verification options	Method with which to verity the existing account	573be4f5-590a-4831-a3f3-de3d8f56ec34	basic-flow	f	t
e35e850b-19af-4bd1-ab4b-aef4297aa678	Verify Existing Account by Re-authentication	Reauthentication of existing account	573be4f5-590a-4831-a3f3-de3d8f56ec34	basic-flow	f	t
189ad434-1d57-43c6-877d-6a5de8dcc625	First broker login - Conditional OTP	Flow to determine if the OTP is required for the authentication	573be4f5-590a-4831-a3f3-de3d8f56ec34	basic-flow	f	t
fc3f122d-b2b3-4c29-83b8-4cd3016f5a84	saml ecp	SAML ECP Profile Authentication Flow	573be4f5-590a-4831-a3f3-de3d8f56ec34	basic-flow	t	t
5e204185-10d4-4153-843c-02650d978555	docker auth	Used by Docker clients to authenticate against the IDP	573be4f5-590a-4831-a3f3-de3d8f56ec34	basic-flow	t	t
a997f31d-0946-4e2b-a826-a064c426fc46	browser	Browser based authentication	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	basic-flow	t	t
e022b4e9-0322-48bf-82ce-5c03693b7312	forms	Username, password, otp and other auth forms.	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	basic-flow	f	t
c9ae75ac-2cc3-45ea-983e-1b9a6580d055	Browser - Conditional OTP	Flow to determine if the OTP is required for the authentication	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	basic-flow	f	t
9f3357a7-9a3f-42e3-9cc3-9a275b38597b	Organization	\N	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	basic-flow	f	t
c39415b3-21b3-4093-b141-2beaa2290291	Browser - Conditional Organization	Flow to determine if the organization identity-first login is to be used	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	basic-flow	f	t
42b24d19-6011-4d5d-a80a-f38785737b6a	direct grant	OpenID Connect Resource Owner Grant	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	basic-flow	t	t
870a7959-45fd-49ed-9679-080c8affb038	Direct Grant - Conditional OTP	Flow to determine if the OTP is required for the authentication	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	basic-flow	f	t
2b1716c6-98b1-4e79-b7c3-47957f4d8b4b	registration	Registration flow	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	basic-flow	t	t
8830fbc0-137e-4fdf-b35a-2798abf3f143	registration form	Registration form	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	form-flow	f	t
f641142b-65b5-42a7-86ef-5844d10e9436	reset credentials	Reset credentials for a user if they forgot their password or something	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	basic-flow	t	t
b83290c3-4c45-4bad-b349-45de8aebe4e8	Reset - Conditional OTP	Flow to determine if the OTP should be reset or not. Set to REQUIRED to force.	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	basic-flow	f	t
ba387be5-c3d9-4351-b8bd-b731f3705123	clients	Base authentication for clients	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	client-flow	t	t
c21873f4-703b-4070-99cb-e39542826529	first broker login	Actions taken after first broker login with identity provider account, which is not yet linked to any Keycloak account	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	basic-flow	t	t
bebf94bd-fc39-4a2a-b05c-4440146e5c2d	User creation or linking	Flow for the existing/non-existing user alternatives	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	basic-flow	f	t
f21be911-927e-4c72-b658-cb81d8c119b9	Handle Existing Account	Handle what to do if there is existing account with same email/username like authenticated identity provider	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	basic-flow	f	t
7b80423a-8a53-4374-9cb0-c5e123499ff2	Account verification options	Method with which to verity the existing account	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	basic-flow	f	t
bee270e7-2a28-447a-9ae0-41cffd84ea56	Verify Existing Account by Re-authentication	Reauthentication of existing account	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	basic-flow	f	t
48ed6e7f-9bb7-43ee-9caa-b0248765f75c	First broker login - Conditional OTP	Flow to determine if the OTP is required for the authentication	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	basic-flow	f	t
74bc3936-2045-4f20-b87e-6f26182ddba7	First Broker Login - Conditional Organization	Flow to determine if the authenticator that adds organization members is to be used	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	basic-flow	f	t
8f576985-e186-4449-934c-24120478c3f4	saml ecp	SAML ECP Profile Authentication Flow	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	basic-flow	t	t
8238cb30-cde4-4593-90b4-81fb0d84b1f2	docker auth	Used by Docker clients to authenticate against the IDP	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	basic-flow	t	t
5225f254-30bd-4be6-967b-3eb7b0d06806	browser	Browser based authentication	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	basic-flow	t	t
979c5892-6671-473b-adac-352028e6b597	forms	Username, password, otp and other auth forms.	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	basic-flow	f	t
19238915-4e57-4526-9cc8-a7cdb92069de	Browser - Conditional OTP	Flow to determine if the OTP is required for the authentication	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	basic-flow	f	t
091b70a2-caab-48f6-9fa1-1c4d4b292f44	Organization	\N	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	basic-flow	f	t
57ccc88d-412a-4a17-ab41-22f89708cc92	Browser - Conditional Organization	Flow to determine if the organization identity-first login is to be used	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	basic-flow	f	t
831a2334-6e5b-4968-8c3b-1835d90a9276	direct grant	OpenID Connect Resource Owner Grant	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	basic-flow	t	t
05ba8b5d-b07b-4b84-b914-3ffb78cf266a	Direct Grant - Conditional OTP	Flow to determine if the OTP is required for the authentication	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	basic-flow	f	t
9e58ab26-47a1-46fc-bb49-01a776fe3a4e	registration	Registration flow	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	basic-flow	t	t
c69f8a90-4745-4ae1-8c2a-29aa5f7c9e01	registration form	Registration form	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	form-flow	f	t
600c471e-3d34-419a-8bb1-d547add33bff	reset credentials	Reset credentials for a user if they forgot their password or something	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	basic-flow	t	t
289c8921-17a9-4fcf-b89f-54b1a93e5aa6	Reset - Conditional OTP	Flow to determine if the OTP should be reset or not. Set to REQUIRED to force.	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	basic-flow	f	t
f066861a-4711-451e-aa2f-b84291bf574c	clients	Base authentication for clients	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	client-flow	t	t
f3b8759d-f220-4370-8503-5d26c7630df0	first broker login	Actions taken after first broker login with identity provider account, which is not yet linked to any Keycloak account	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	basic-flow	t	t
7a967b9d-27ca-4586-a15b-144a540e0592	User creation or linking	Flow for the existing/non-existing user alternatives	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	basic-flow	f	t
65d60c63-43f3-4bd1-8a70-095773999d13	Handle Existing Account	Handle what to do if there is existing account with same email/username like authenticated identity provider	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	basic-flow	f	t
f5764cf2-0626-46c1-b6ae-b20e06b7611e	Account verification options	Method with which to verity the existing account	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	basic-flow	f	t
b007123d-f187-431b-8df5-83cb2d25d4c1	Verify Existing Account by Re-authentication	Reauthentication of existing account	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	basic-flow	f	t
02a00299-cfbf-4845-a408-62696f5988c9	First broker login - Conditional OTP	Flow to determine if the OTP is required for the authentication	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	basic-flow	f	t
dbe4458e-6333-4a26-8e3e-995069487ff2	First Broker Login - Conditional Organization	Flow to determine if the authenticator that adds organization members is to be used	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	basic-flow	f	t
d584b605-ebc1-4cc8-b168-23943f861d10	saml ecp	SAML ECP Profile Authentication Flow	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	basic-flow	t	t
c9f96d95-d372-45d7-8aa2-541fa5790b10	docker auth	Used by Docker clients to authenticate against the IDP	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	basic-flow	t	t
f58e59df-640b-4d72-8e62-0b803f69b836	Copy of browser	Browser based authentication	573be4f5-590a-4831-a3f3-de3d8f56ec34	basic-flow	t	f
8a97dcfa-14a6-4cac-b086-084578fc520e	Copy of browser forms	Username, password, otp and other auth forms.	573be4f5-590a-4831-a3f3-de3d8f56ec34	basic-flow	f	f
bb802366-6d71-4de3-a57e-cdd17bfbe3d0	Copy of browser Browser - Conditional OTP	Flow to determine if the OTP is required for the authentication	573be4f5-590a-4831-a3f3-de3d8f56ec34	basic-flow	f	f
\.


--
-- TOC entry 4609 (class 0 OID 20339)
-- Dependencies: 218
-- Data for Name: authenticator_config; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.authenticator_config (id, alias, realm_id) FROM stdin;
495c3a3d-cefd-47bb-97a1-fce5ec90187c	review profile config	573be4f5-590a-4831-a3f3-de3d8f56ec34
c5c20aa8-bdc6-45ad-b52c-49bd50a9f29b	create unique user config	573be4f5-590a-4831-a3f3-de3d8f56ec34
0dfab337-2c8e-43a4-bb3e-e3ddd0efd729	review profile config	95b0b755-b0d8-46d1-99b5-be385e3fa5c4
aff67f07-df65-4d14-8e90-35f3de51e8e9	create unique user config	95b0b755-b0d8-46d1-99b5-be385e3fa5c4
f58c1c58-cc03-48ee-aca1-9fbd680032a4	review profile config	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8
a026c622-b3be-4da1-98c6-abf95c701945	create unique user config	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8
8f4b6522-18a2-49ae-a61f-4c0d32fa98c2	reCaptcha	95b0b755-b0d8-46d1-99b5-be385e3fa5c4
\.


--
-- TOC entry 4610 (class 0 OID 20342)
-- Dependencies: 219
-- Data for Name: authenticator_config_entry; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.authenticator_config_entry (authenticator_id, value, name) FROM stdin;
495c3a3d-cefd-47bb-97a1-fce5ec90187c	missing	update.profile.on.first.login
c5c20aa8-bdc6-45ad-b52c-49bd50a9f29b	false	require.password.update.after.registration
0dfab337-2c8e-43a4-bb3e-e3ddd0efd729	missing	update.profile.on.first.login
aff67f07-df65-4d14-8e90-35f3de51e8e9	false	require.password.update.after.registration
a026c622-b3be-4da1-98c6-abf95c701945	false	require.password.update.after.registration
f58c1c58-cc03-48ee-aca1-9fbd680032a4	missing	update.profile.on.first.login
8f4b6522-18a2-49ae-a61f-4c0d32fa98c2	false	useRecaptchaNet
8f4b6522-18a2-49ae-a61f-4c0d32fa98c2	false	recaptcha.v3
8f4b6522-18a2-49ae-a61f-4c0d32fa98c2	register	action
8f4b6522-18a2-49ae-a61f-4c0d32fa98c2	6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe	secret.key
8f4b6522-18a2-49ae-a61f-4c0d32fa98c2	6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI	site.key
\.


--
-- TOC entry 4611 (class 0 OID 20347)
-- Dependencies: 220
-- Data for Name: broker_link; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.broker_link (identity_provider, storage_provider_id, realm_id, broker_user_id, broker_username, token, user_id) FROM stdin;
\.


--
-- TOC entry 4612 (class 0 OID 20352)
-- Dependencies: 221
-- Data for Name: client; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.client (id, enabled, full_scope_allowed, client_id, not_before, public_client, secret, base_url, bearer_only, management_url, surrogate_auth_required, realm_id, protocol, node_rereg_timeout, frontchannel_logout, consent_required, name, service_accounts_enabled, client_authenticator_type, root_url, description, registration_token, standard_flow_enabled, implicit_flow_enabled, direct_access_grants_enabled, always_display_in_console) FROM stdin;
07b5d519-49d8-4951-b05c-ac90a831a805	t	f	master-realm	0	f	\N	\N	t	\N	f	573be4f5-590a-4831-a3f3-de3d8f56ec34	\N	0	f	f	master Realm	f	client-secret	\N	\N	\N	t	f	f	f
d3a27c66-ae91-4435-a6a6-5086541347c3	t	f	account	0	t	\N	/realms/master/account/	f	\N	f	573be4f5-590a-4831-a3f3-de3d8f56ec34	openid-connect	0	f	f	${client_account}	f	client-secret	${authBaseUrl}	\N	\N	t	f	f	f
da966e37-8ea8-4a7b-8b59-50904a68592b	t	f	account-console	0	t	\N	/realms/master/account/	f	\N	f	573be4f5-590a-4831-a3f3-de3d8f56ec34	openid-connect	0	f	f	${client_account-console}	f	client-secret	${authBaseUrl}	\N	\N	t	f	f	f
1f59f410-6cd0-4040-a4fb-ae00c8be5ffd	t	f	broker	0	f	\N	\N	t	\N	f	573be4f5-590a-4831-a3f3-de3d8f56ec34	openid-connect	0	f	f	${client_broker}	f	client-secret	\N	\N	\N	t	f	f	f
ab6c7ed6-6fcd-479e-872f-ace1a9468cc5	t	t	security-admin-console	0	t	\N	/admin/master/console/	f	\N	f	573be4f5-590a-4831-a3f3-de3d8f56ec34	openid-connect	0	f	f	${client_security-admin-console}	f	client-secret	${authAdminUrl}	\N	\N	t	f	f	f
cdeb4e73-3363-4777-b527-65cc07c79700	t	t	admin-cli	0	t	\N	\N	f	\N	f	573be4f5-590a-4831-a3f3-de3d8f56ec34	openid-connect	0	f	f	${client_admin-cli}	f	client-secret	\N	\N	\N	f	f	t	f
0ee85feb-a7a6-4204-9d2e-0d5acd52f0e9	t	f	SOURSD-realm	0	f	\N	\N	t	\N	f	573be4f5-590a-4831-a3f3-de3d8f56ec34	\N	0	f	f	SOURSD Realm	f	client-secret	\N	\N	\N	t	f	f	f
c97f0a03-7ed7-4dfb-9637-bc92b8449d9d	t	f	realm-management	0	f	\N	\N	t	\N	f	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	openid-connect	0	f	f	${client_realm-management}	f	client-secret	\N	\N	\N	t	f	f	f
82a0f406-c93d-4f1d-8972-09987311bf32	t	f	account	0	t	\N	/realms/SOURSD/account/	f	\N	f	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	openid-connect	0	f	f	${client_account}	f	client-secret	${authBaseUrl}	\N	\N	t	f	f	f
bfe8fa02-5527-4589-b742-fffc1ff2ecca	t	f	account-console	0	t	\N	/realms/SOURSD/account/	f	\N	f	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	openid-connect	0	f	f	${client_account-console}	f	client-secret	${authBaseUrl}	\N	\N	t	f	f	f
5fc8fe91-54b6-4965-85da-cc182d494fba	t	f	broker	0	f	\N	\N	t	\N	f	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	openid-connect	0	f	f	${client_broker}	f	client-secret	\N	\N	\N	t	f	f	f
5be18a22-1bf7-4158-b418-7c8b622c8ee0	t	t	security-admin-console	0	t	\N	/admin/SOURSD/console/	f	\N	f	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	openid-connect	0	f	f	${client_security-admin-console}	f	client-secret	${authAdminUrl}	\N	\N	t	f	f	f
358bbb9c-f41f-4bc6-b0f3-0968dd0f4a65	t	t	admin-cli	0	t	\N	\N	f	\N	f	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	openid-connect	0	f	f	${client_admin-cli}	f	client-secret	\N	\N	\N	f	f	t	f
88a901c3-2730-4d6d-8f86-a99bf6455e77	t	f	realm-management	0	f	\N	\N	t	\N	f	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	openid-connect	0	f	f	${client_realm-management}	f	client-secret	\N	\N	\N	t	f	f	f
62441632-3a92-48c0-92ab-d80cf0610229	t	f	account-console	0	t	\N	/realms/GATEWAY/account/	f	\N	f	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	openid-connect	0	f	f	${client_account-console}	f	client-secret	${authBaseUrl}	\N	\N	t	f	f	f
7dfb6d8f-b5cf-475f-bee6-9aedc73d5130	t	f	GATEWAY-realm	0	f	\N	\N	t	\N	f	573be4f5-590a-4831-a3f3-de3d8f56ec34	\N	0	f	f	GATEWAY Realm	f	client-secret	\N	\N	\N	t	f	f	f
8b9e2719-2150-4a1e-a2b8-232158e4891e	t	f	broker	0	f	\N	\N	t	\N	f	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	openid-connect	0	f	f	${client_broker}	f	client-secret	\N	\N	\N	t	f	f	f
15641592-9ee8-4f81-9105-06202f2c80b2	t	t	security-admin-console	0	t	\N	/admin/GATEWAY/console/	f	\N	f	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	openid-connect	0	f	f	${client_security-admin-console}	f	client-secret	${authAdminUrl}	\N	\N	t	f	f	f
e9245e8a-48fd-4b8b-add1-e7e5c998809f	t	t	admin-cli	0	t	\N	\N	f	\N	f	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	openid-connect	0	f	f	${client_admin-cli}	f	client-secret	\N	\N	\N	f	f	t	f
53dcc167-e5c7-4a51-b708-cef18370e62c	t	f	account	0	t	\N	/realms/GATEWAY/account/	f		f	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	openid-connect	0	f	f	${client_account}	f	client-secret	${authBaseUrl}		\N	t	f	f	f
bfad858c-3558-4e6d-99e6-d1e29a08adc0	t	t	gateway-federation-broker	0	t	\N	https://2175a2470d67.ngrok-free.app	f	https://2175a2470d67.ngrok-free.app	f	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	openid-connect	-1	t	f	Gateway Federation Broker	f	client-secret	https://2175a2470d67.ngrok-free.app		\N	t	f	t	f
2e713a57-2d5f-4835-aca9-8342751942d1	t	t	speedi-registry-app	0	f	c5jQYeoX2c945Ifu6JqSehicSs4tt5oa	http://localhost:3000	f	http://localhost:8100/api	f	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	openid-connect	-1	t	f	SOURSD Service Application	t	client-secret	http://localhost:8100/api		\N	t	t	t	f
\.


--
-- TOC entry 4613 (class 0 OID 20370)
-- Dependencies: 222
-- Data for Name: client_attributes; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.client_attributes (client_id, name, value) FROM stdin;
d3a27c66-ae91-4435-a6a6-5086541347c3	post.logout.redirect.uris	+
da966e37-8ea8-4a7b-8b59-50904a68592b	post.logout.redirect.uris	+
da966e37-8ea8-4a7b-8b59-50904a68592b	pkce.code.challenge.method	S256
ab6c7ed6-6fcd-479e-872f-ace1a9468cc5	post.logout.redirect.uris	+
ab6c7ed6-6fcd-479e-872f-ace1a9468cc5	pkce.code.challenge.method	S256
ab6c7ed6-6fcd-479e-872f-ace1a9468cc5	client.use.lightweight.access.token.enabled	true
cdeb4e73-3363-4777-b527-65cc07c79700	client.use.lightweight.access.token.enabled	true
2e713a57-2d5f-4835-aca9-8342751942d1	oauth2.device.authorization.grant.enabled	false
2e713a57-2d5f-4835-aca9-8342751942d1	oidc.ciba.grant.enabled	false
2e713a57-2d5f-4835-aca9-8342751942d1	backchannel.logout.session.required	true
2e713a57-2d5f-4835-aca9-8342751942d1	backchannel.logout.revoke.offline.tokens	false
2e713a57-2d5f-4835-aca9-8342751942d1	post.logout.redirect.uris	http://localhost:3000/api/auth/logout
82a0f406-c93d-4f1d-8972-09987311bf32	post.logout.redirect.uris	+
bfe8fa02-5527-4589-b742-fffc1ff2ecca	post.logout.redirect.uris	+
bfe8fa02-5527-4589-b742-fffc1ff2ecca	pkce.code.challenge.method	S256
5be18a22-1bf7-4158-b418-7c8b622c8ee0	post.logout.redirect.uris	+
5be18a22-1bf7-4158-b418-7c8b622c8ee0	pkce.code.challenge.method	S256
5be18a22-1bf7-4158-b418-7c8b622c8ee0	client.use.lightweight.access.token.enabled	true
358bbb9c-f41f-4bc6-b0f3-0968dd0f4a65	client.use.lightweight.access.token.enabled	true
2e713a57-2d5f-4835-aca9-8342751942d1	realm_client	false
2e713a57-2d5f-4835-aca9-8342751942d1	display.on.consent.screen	false
2e713a57-2d5f-4835-aca9-8342751942d1	frontchannel.logout.session.required	true
53dcc167-e5c7-4a51-b708-cef18370e62c	post.logout.redirect.uris	+
62441632-3a92-48c0-92ab-d80cf0610229	post.logout.redirect.uris	+
62441632-3a92-48c0-92ab-d80cf0610229	pkce.code.challenge.method	S256
15641592-9ee8-4f81-9105-06202f2c80b2	post.logout.redirect.uris	+
15641592-9ee8-4f81-9105-06202f2c80b2	pkce.code.challenge.method	S256
15641592-9ee8-4f81-9105-06202f2c80b2	client.use.lightweight.access.token.enabled	true
e9245e8a-48fd-4b8b-add1-e7e5c998809f	client.use.lightweight.access.token.enabled	true
53dcc167-e5c7-4a51-b708-cef18370e62c	realm_client	false
53dcc167-e5c7-4a51-b708-cef18370e62c	oauth2.device.authorization.grant.enabled	false
53dcc167-e5c7-4a51-b708-cef18370e62c	oidc.ciba.grant.enabled	false
53dcc167-e5c7-4a51-b708-cef18370e62c	display.on.consent.screen	false
53dcc167-e5c7-4a51-b708-cef18370e62c	backchannel.logout.session.required	true
53dcc167-e5c7-4a51-b708-cef18370e62c	backchannel.logout.revoke.offline.tokens	false
bfad858c-3558-4e6d-99e6-d1e29a08adc0	oauth2.device.authorization.grant.enabled	false
bfad858c-3558-4e6d-99e6-d1e29a08adc0	oidc.ciba.grant.enabled	false
bfad858c-3558-4e6d-99e6-d1e29a08adc0	backchannel.logout.session.required	true
bfad858c-3558-4e6d-99e6-d1e29a08adc0	backchannel.logout.revoke.offline.tokens	false
bfad858c-3558-4e6d-99e6-d1e29a08adc0	realm_client	false
bfad858c-3558-4e6d-99e6-d1e29a08adc0	display.on.consent.screen	false
bfad858c-3558-4e6d-99e6-d1e29a08adc0	frontchannel.logout.session.required	true
2e713a57-2d5f-4835-aca9-8342751942d1	client.secret.creation.time	1763655523
2e713a57-2d5f-4835-aca9-8342751942d1	standard.token.exchange.enabled	false
2e713a57-2d5f-4835-aca9-8342751942d1	login_theme	safepeopleregistry
\.


--
-- TOC entry 4614 (class 0 OID 20375)
-- Dependencies: 223
-- Data for Name: client_auth_flow_bindings; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.client_auth_flow_bindings (client_id, flow_id, binding_name) FROM stdin;
\.


--
-- TOC entry 4615 (class 0 OID 20378)
-- Dependencies: 224
-- Data for Name: client_initial_access; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.client_initial_access (id, realm_id, "timestamp", expiration, count, remaining_count) FROM stdin;
\.


--
-- TOC entry 4616 (class 0 OID 20381)
-- Dependencies: 225
-- Data for Name: client_node_registrations; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.client_node_registrations (client_id, value, name) FROM stdin;
\.


--
-- TOC entry 4617 (class 0 OID 20384)
-- Dependencies: 226
-- Data for Name: client_scope; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.client_scope (id, name, realm_id, description, protocol) FROM stdin;
ff5ca93d-f24d-4468-9f96-8d521ffb0076	offline_access	573be4f5-590a-4831-a3f3-de3d8f56ec34	OpenID Connect built-in scope: offline_access	openid-connect
130302b0-f33a-4cab-a3c7-81aa77cca5c7	role_list	573be4f5-590a-4831-a3f3-de3d8f56ec34	SAML role list	saml
c31504ee-a58b-4343-833e-211d08b51f31	saml_organization	573be4f5-590a-4831-a3f3-de3d8f56ec34	Organization Membership	saml
044580e6-4102-40fe-9836-2991d3f075f2	profile	573be4f5-590a-4831-a3f3-de3d8f56ec34	OpenID Connect built-in scope: profile	openid-connect
39295a49-c2bb-424a-8767-31eb4e1241f8	email	573be4f5-590a-4831-a3f3-de3d8f56ec34	OpenID Connect built-in scope: email	openid-connect
2444797a-cef5-423f-84c2-1bcf18463c50	address	573be4f5-590a-4831-a3f3-de3d8f56ec34	OpenID Connect built-in scope: address	openid-connect
d30a3ad8-3e3a-48a3-b948-fcf5dcc6fb27	phone	573be4f5-590a-4831-a3f3-de3d8f56ec34	OpenID Connect built-in scope: phone	openid-connect
48046a02-0c54-4c9e-8c29-0b48a5d8e117	roles	573be4f5-590a-4831-a3f3-de3d8f56ec34	OpenID Connect scope for add user roles to the access token	openid-connect
c6c8297c-63f1-4351-ae06-b2dad755c2a2	web-origins	573be4f5-590a-4831-a3f3-de3d8f56ec34	OpenID Connect scope for add allowed web origins to the access token	openid-connect
facf04fc-0c55-42de-8b27-38643f70a4cb	microprofile-jwt	573be4f5-590a-4831-a3f3-de3d8f56ec34	Microprofile - JWT built-in scope	openid-connect
6ce39ed5-237a-4d80-85d1-e5712dd944aa	acr	573be4f5-590a-4831-a3f3-de3d8f56ec34	OpenID Connect scope for add acr (authentication context class reference) to the token	openid-connect
1f592d4d-f33b-41b1-933a-482898529356	basic	573be4f5-590a-4831-a3f3-de3d8f56ec34	OpenID Connect scope for add all basic claims to the token	openid-connect
1ad57157-5d8e-4653-9d90-e5fe34208725	service_account	573be4f5-590a-4831-a3f3-de3d8f56ec34	Specific scope for a client enabled for service accounts	openid-connect
ea6978f8-6865-42eb-859c-37b8b5ace27e	organization	573be4f5-590a-4831-a3f3-de3d8f56ec34	Additional claims about the organization a subject belongs to	openid-connect
5a2ac8cb-3aa9-4f12-8400-c0021beffb6a	offline_access	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	OpenID Connect built-in scope: offline_access	openid-connect
0e0554ff-e972-496b-b654-e23f274e0949	role_list	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	SAML role list	saml
9d1d4914-5b58-4984-9807-607bd63df1ee	saml_organization	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	Organization Membership	saml
5a99839f-54f3-4be4-a839-b029dcde8f43	profile	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	OpenID Connect built-in scope: profile	openid-connect
515895da-74fd-4887-8293-5ac2cbb87a5f	email	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	OpenID Connect built-in scope: email	openid-connect
9c4548f1-e800-4dd3-9a36-b52f29f17c61	address	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	OpenID Connect built-in scope: address	openid-connect
cd92d463-3238-4d50-908e-0d88020bf94e	phone	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	OpenID Connect built-in scope: phone	openid-connect
4d256b34-ff7d-4590-9de4-57609db56d1e	roles	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	OpenID Connect scope for add user roles to the access token	openid-connect
5849f091-d0bb-4730-b1fd-260f2e8db73a	web-origins	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	OpenID Connect scope for add allowed web origins to the access token	openid-connect
20821262-da6a-4d55-9e5f-57197f34931d	microprofile-jwt	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	Microprofile - JWT built-in scope	openid-connect
35bb7087-3a55-4460-a6aa-a06acb87c69b	acr	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	OpenID Connect scope for add acr (authentication context class reference) to the token	openid-connect
f32a470f-d1ef-4c47-ae5e-70461fbd50cd	basic	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	OpenID Connect scope for add all basic claims to the token	openid-connect
9e419960-514c-4eac-b208-4b92779afcfd	service_account	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	Specific scope for a client enabled for service accounts	openid-connect
902d06b8-881b-4eb7-b395-d06dfeb83723	organization	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	Additional claims about the organization a subject belongs to	openid-connect
fc7a9c04-28dc-47d0-83d3-45191b4c551e	service_account	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	Specific scope for a client enabled for service accounts	openid-connect
af43d9c6-5314-4697-a024-5039f5402435	organization	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	Additional claims about the organization a subject belongs to	openid-connect
adbe720e-4271-4ecd-89ba-16a4999c1b03	offline_access	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	OpenID Connect built-in scope: offline_access	openid-connect
f23dd18b-4519-47eb-b83f-320d1184c9f5	role_list	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	SAML role list	saml
a51118b2-5916-45e6-a4eb-07deddeb94e8	saml_organization	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	Organization Membership	saml
53de374b-ee75-4e89-bd5e-76b5e97e931e	profile	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	OpenID Connect built-in scope: profile	openid-connect
5729b064-c40f-45da-9202-334565727841	email	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	OpenID Connect built-in scope: email	openid-connect
59feeae9-fd9d-44ce-9a75-ffa91737c7c8	address	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	OpenID Connect built-in scope: address	openid-connect
9e678102-7b31-4b29-90e6-24ccedb0134e	phone	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	OpenID Connect built-in scope: phone	openid-connect
30a52cff-a647-4c73-9846-e4db810c824f	roles	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	OpenID Connect scope for add user roles to the access token	openid-connect
43f1ac4e-a381-4a52-9803-afed159cb010	web-origins	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	OpenID Connect scope for add allowed web origins to the access token	openid-connect
d7bc7861-2a5e-4104-a580-d4ab42afd3d2	microprofile-jwt	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	Microprofile - JWT built-in scope	openid-connect
ade43b57-68a1-4a09-a60f-35758c3f5a87	acr	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	OpenID Connect scope for add acr (authentication context class reference) to the token	openid-connect
e0c0563b-1b78-4c49-9e1e-950a58c718e5	basic	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	OpenID Connect scope for add all basic claims to the token	openid-connect
\.


--
-- TOC entry 4618 (class 0 OID 20389)
-- Dependencies: 227
-- Data for Name: client_scope_attributes; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.client_scope_attributes (scope_id, value, name) FROM stdin;
ff5ca93d-f24d-4468-9f96-8d521ffb0076	true	display.on.consent.screen
ff5ca93d-f24d-4468-9f96-8d521ffb0076	${offlineAccessScopeConsentText}	consent.screen.text
130302b0-f33a-4cab-a3c7-81aa77cca5c7	true	display.on.consent.screen
130302b0-f33a-4cab-a3c7-81aa77cca5c7	${samlRoleListScopeConsentText}	consent.screen.text
c31504ee-a58b-4343-833e-211d08b51f31	false	display.on.consent.screen
044580e6-4102-40fe-9836-2991d3f075f2	true	display.on.consent.screen
044580e6-4102-40fe-9836-2991d3f075f2	${profileScopeConsentText}	consent.screen.text
044580e6-4102-40fe-9836-2991d3f075f2	true	include.in.token.scope
39295a49-c2bb-424a-8767-31eb4e1241f8	true	display.on.consent.screen
39295a49-c2bb-424a-8767-31eb4e1241f8	${emailScopeConsentText}	consent.screen.text
39295a49-c2bb-424a-8767-31eb4e1241f8	true	include.in.token.scope
2444797a-cef5-423f-84c2-1bcf18463c50	true	display.on.consent.screen
2444797a-cef5-423f-84c2-1bcf18463c50	${addressScopeConsentText}	consent.screen.text
2444797a-cef5-423f-84c2-1bcf18463c50	true	include.in.token.scope
d30a3ad8-3e3a-48a3-b948-fcf5dcc6fb27	true	display.on.consent.screen
d30a3ad8-3e3a-48a3-b948-fcf5dcc6fb27	${phoneScopeConsentText}	consent.screen.text
d30a3ad8-3e3a-48a3-b948-fcf5dcc6fb27	true	include.in.token.scope
48046a02-0c54-4c9e-8c29-0b48a5d8e117	true	display.on.consent.screen
48046a02-0c54-4c9e-8c29-0b48a5d8e117	${rolesScopeConsentText}	consent.screen.text
48046a02-0c54-4c9e-8c29-0b48a5d8e117	false	include.in.token.scope
c6c8297c-63f1-4351-ae06-b2dad755c2a2	false	display.on.consent.screen
c6c8297c-63f1-4351-ae06-b2dad755c2a2		consent.screen.text
c6c8297c-63f1-4351-ae06-b2dad755c2a2	false	include.in.token.scope
facf04fc-0c55-42de-8b27-38643f70a4cb	false	display.on.consent.screen
facf04fc-0c55-42de-8b27-38643f70a4cb	true	include.in.token.scope
6ce39ed5-237a-4d80-85d1-e5712dd944aa	false	display.on.consent.screen
6ce39ed5-237a-4d80-85d1-e5712dd944aa	false	include.in.token.scope
1f592d4d-f33b-41b1-933a-482898529356	false	display.on.consent.screen
1f592d4d-f33b-41b1-933a-482898529356	false	include.in.token.scope
1ad57157-5d8e-4653-9d90-e5fe34208725	false	display.on.consent.screen
1ad57157-5d8e-4653-9d90-e5fe34208725	false	include.in.token.scope
ea6978f8-6865-42eb-859c-37b8b5ace27e	true	display.on.consent.screen
ea6978f8-6865-42eb-859c-37b8b5ace27e	${organizationScopeConsentText}	consent.screen.text
ea6978f8-6865-42eb-859c-37b8b5ace27e	true	include.in.token.scope
5a2ac8cb-3aa9-4f12-8400-c0021beffb6a	true	display.on.consent.screen
5a2ac8cb-3aa9-4f12-8400-c0021beffb6a	${offlineAccessScopeConsentText}	consent.screen.text
0e0554ff-e972-496b-b654-e23f274e0949	true	display.on.consent.screen
0e0554ff-e972-496b-b654-e23f274e0949	${samlRoleListScopeConsentText}	consent.screen.text
9d1d4914-5b58-4984-9807-607bd63df1ee	false	display.on.consent.screen
5a99839f-54f3-4be4-a839-b029dcde8f43	true	display.on.consent.screen
5a99839f-54f3-4be4-a839-b029dcde8f43	${profileScopeConsentText}	consent.screen.text
5a99839f-54f3-4be4-a839-b029dcde8f43	true	include.in.token.scope
515895da-74fd-4887-8293-5ac2cbb87a5f	true	display.on.consent.screen
515895da-74fd-4887-8293-5ac2cbb87a5f	${emailScopeConsentText}	consent.screen.text
515895da-74fd-4887-8293-5ac2cbb87a5f	true	include.in.token.scope
9c4548f1-e800-4dd3-9a36-b52f29f17c61	true	display.on.consent.screen
9c4548f1-e800-4dd3-9a36-b52f29f17c61	${addressScopeConsentText}	consent.screen.text
9c4548f1-e800-4dd3-9a36-b52f29f17c61	true	include.in.token.scope
cd92d463-3238-4d50-908e-0d88020bf94e	true	display.on.consent.screen
cd92d463-3238-4d50-908e-0d88020bf94e	${phoneScopeConsentText}	consent.screen.text
cd92d463-3238-4d50-908e-0d88020bf94e	true	include.in.token.scope
4d256b34-ff7d-4590-9de4-57609db56d1e	true	display.on.consent.screen
4d256b34-ff7d-4590-9de4-57609db56d1e	${rolesScopeConsentText}	consent.screen.text
4d256b34-ff7d-4590-9de4-57609db56d1e	false	include.in.token.scope
5849f091-d0bb-4730-b1fd-260f2e8db73a	false	display.on.consent.screen
5849f091-d0bb-4730-b1fd-260f2e8db73a		consent.screen.text
5849f091-d0bb-4730-b1fd-260f2e8db73a	false	include.in.token.scope
20821262-da6a-4d55-9e5f-57197f34931d	false	display.on.consent.screen
20821262-da6a-4d55-9e5f-57197f34931d	true	include.in.token.scope
35bb7087-3a55-4460-a6aa-a06acb87c69b	false	display.on.consent.screen
35bb7087-3a55-4460-a6aa-a06acb87c69b	false	include.in.token.scope
f32a470f-d1ef-4c47-ae5e-70461fbd50cd	false	display.on.consent.screen
f32a470f-d1ef-4c47-ae5e-70461fbd50cd	false	include.in.token.scope
9e419960-514c-4eac-b208-4b92779afcfd	false	display.on.consent.screen
9e419960-514c-4eac-b208-4b92779afcfd	false	include.in.token.scope
902d06b8-881b-4eb7-b395-d06dfeb83723	true	display.on.consent.screen
902d06b8-881b-4eb7-b395-d06dfeb83723	${organizationScopeConsentText}	consent.screen.text
902d06b8-881b-4eb7-b395-d06dfeb83723	true	include.in.token.scope
adbe720e-4271-4ecd-89ba-16a4999c1b03	true	display.on.consent.screen
adbe720e-4271-4ecd-89ba-16a4999c1b03	${offlineAccessScopeConsentText}	consent.screen.text
f23dd18b-4519-47eb-b83f-320d1184c9f5	true	display.on.consent.screen
f23dd18b-4519-47eb-b83f-320d1184c9f5	${samlRoleListScopeConsentText}	consent.screen.text
a51118b2-5916-45e6-a4eb-07deddeb94e8	false	display.on.consent.screen
53de374b-ee75-4e89-bd5e-76b5e97e931e	true	display.on.consent.screen
53de374b-ee75-4e89-bd5e-76b5e97e931e	${profileScopeConsentText}	consent.screen.text
53de374b-ee75-4e89-bd5e-76b5e97e931e	true	include.in.token.scope
5729b064-c40f-45da-9202-334565727841	true	display.on.consent.screen
5729b064-c40f-45da-9202-334565727841	${emailScopeConsentText}	consent.screen.text
5729b064-c40f-45da-9202-334565727841	true	include.in.token.scope
59feeae9-fd9d-44ce-9a75-ffa91737c7c8	true	display.on.consent.screen
59feeae9-fd9d-44ce-9a75-ffa91737c7c8	${addressScopeConsentText}	consent.screen.text
59feeae9-fd9d-44ce-9a75-ffa91737c7c8	true	include.in.token.scope
9e678102-7b31-4b29-90e6-24ccedb0134e	true	display.on.consent.screen
9e678102-7b31-4b29-90e6-24ccedb0134e	${phoneScopeConsentText}	consent.screen.text
9e678102-7b31-4b29-90e6-24ccedb0134e	true	include.in.token.scope
30a52cff-a647-4c73-9846-e4db810c824f	true	display.on.consent.screen
30a52cff-a647-4c73-9846-e4db810c824f	${rolesScopeConsentText}	consent.screen.text
30a52cff-a647-4c73-9846-e4db810c824f	false	include.in.token.scope
43f1ac4e-a381-4a52-9803-afed159cb010	false	display.on.consent.screen
43f1ac4e-a381-4a52-9803-afed159cb010		consent.screen.text
43f1ac4e-a381-4a52-9803-afed159cb010	false	include.in.token.scope
d7bc7861-2a5e-4104-a580-d4ab42afd3d2	false	display.on.consent.screen
d7bc7861-2a5e-4104-a580-d4ab42afd3d2	true	include.in.token.scope
ade43b57-68a1-4a09-a60f-35758c3f5a87	false	display.on.consent.screen
ade43b57-68a1-4a09-a60f-35758c3f5a87	false	include.in.token.scope
e0c0563b-1b78-4c49-9e1e-950a58c718e5	false	display.on.consent.screen
e0c0563b-1b78-4c49-9e1e-950a58c718e5	false	include.in.token.scope
fc7a9c04-28dc-47d0-83d3-45191b4c551e	false	display.on.consent.screen
fc7a9c04-28dc-47d0-83d3-45191b4c551e	false	include.in.token.scope
af43d9c6-5314-4697-a024-5039f5402435	true	display.on.consent.screen
af43d9c6-5314-4697-a024-5039f5402435	${organizationScopeConsentText}	consent.screen.text
af43d9c6-5314-4697-a024-5039f5402435	true	include.in.token.scope
\.


--
-- TOC entry 4619 (class 0 OID 20394)
-- Dependencies: 228
-- Data for Name: client_scope_client; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.client_scope_client (client_id, scope_id, default_scope) FROM stdin;
d3a27c66-ae91-4435-a6a6-5086541347c3	1f592d4d-f33b-41b1-933a-482898529356	t
d3a27c66-ae91-4435-a6a6-5086541347c3	39295a49-c2bb-424a-8767-31eb4e1241f8	t
d3a27c66-ae91-4435-a6a6-5086541347c3	48046a02-0c54-4c9e-8c29-0b48a5d8e117	t
d3a27c66-ae91-4435-a6a6-5086541347c3	6ce39ed5-237a-4d80-85d1-e5712dd944aa	t
d3a27c66-ae91-4435-a6a6-5086541347c3	044580e6-4102-40fe-9836-2991d3f075f2	t
d3a27c66-ae91-4435-a6a6-5086541347c3	c6c8297c-63f1-4351-ae06-b2dad755c2a2	t
d3a27c66-ae91-4435-a6a6-5086541347c3	ff5ca93d-f24d-4468-9f96-8d521ffb0076	f
d3a27c66-ae91-4435-a6a6-5086541347c3	2444797a-cef5-423f-84c2-1bcf18463c50	f
d3a27c66-ae91-4435-a6a6-5086541347c3	d30a3ad8-3e3a-48a3-b948-fcf5dcc6fb27	f
d3a27c66-ae91-4435-a6a6-5086541347c3	facf04fc-0c55-42de-8b27-38643f70a4cb	f
d3a27c66-ae91-4435-a6a6-5086541347c3	ea6978f8-6865-42eb-859c-37b8b5ace27e	f
da966e37-8ea8-4a7b-8b59-50904a68592b	1f592d4d-f33b-41b1-933a-482898529356	t
da966e37-8ea8-4a7b-8b59-50904a68592b	39295a49-c2bb-424a-8767-31eb4e1241f8	t
da966e37-8ea8-4a7b-8b59-50904a68592b	48046a02-0c54-4c9e-8c29-0b48a5d8e117	t
da966e37-8ea8-4a7b-8b59-50904a68592b	6ce39ed5-237a-4d80-85d1-e5712dd944aa	t
da966e37-8ea8-4a7b-8b59-50904a68592b	044580e6-4102-40fe-9836-2991d3f075f2	t
da966e37-8ea8-4a7b-8b59-50904a68592b	c6c8297c-63f1-4351-ae06-b2dad755c2a2	t
da966e37-8ea8-4a7b-8b59-50904a68592b	ff5ca93d-f24d-4468-9f96-8d521ffb0076	f
da966e37-8ea8-4a7b-8b59-50904a68592b	2444797a-cef5-423f-84c2-1bcf18463c50	f
da966e37-8ea8-4a7b-8b59-50904a68592b	d30a3ad8-3e3a-48a3-b948-fcf5dcc6fb27	f
da966e37-8ea8-4a7b-8b59-50904a68592b	facf04fc-0c55-42de-8b27-38643f70a4cb	f
da966e37-8ea8-4a7b-8b59-50904a68592b	ea6978f8-6865-42eb-859c-37b8b5ace27e	f
cdeb4e73-3363-4777-b527-65cc07c79700	1f592d4d-f33b-41b1-933a-482898529356	t
cdeb4e73-3363-4777-b527-65cc07c79700	39295a49-c2bb-424a-8767-31eb4e1241f8	t
cdeb4e73-3363-4777-b527-65cc07c79700	48046a02-0c54-4c9e-8c29-0b48a5d8e117	t
cdeb4e73-3363-4777-b527-65cc07c79700	6ce39ed5-237a-4d80-85d1-e5712dd944aa	t
cdeb4e73-3363-4777-b527-65cc07c79700	044580e6-4102-40fe-9836-2991d3f075f2	t
cdeb4e73-3363-4777-b527-65cc07c79700	c6c8297c-63f1-4351-ae06-b2dad755c2a2	t
cdeb4e73-3363-4777-b527-65cc07c79700	ff5ca93d-f24d-4468-9f96-8d521ffb0076	f
cdeb4e73-3363-4777-b527-65cc07c79700	2444797a-cef5-423f-84c2-1bcf18463c50	f
cdeb4e73-3363-4777-b527-65cc07c79700	d30a3ad8-3e3a-48a3-b948-fcf5dcc6fb27	f
cdeb4e73-3363-4777-b527-65cc07c79700	facf04fc-0c55-42de-8b27-38643f70a4cb	f
cdeb4e73-3363-4777-b527-65cc07c79700	ea6978f8-6865-42eb-859c-37b8b5ace27e	f
1f59f410-6cd0-4040-a4fb-ae00c8be5ffd	1f592d4d-f33b-41b1-933a-482898529356	t
1f59f410-6cd0-4040-a4fb-ae00c8be5ffd	39295a49-c2bb-424a-8767-31eb4e1241f8	t
1f59f410-6cd0-4040-a4fb-ae00c8be5ffd	48046a02-0c54-4c9e-8c29-0b48a5d8e117	t
1f59f410-6cd0-4040-a4fb-ae00c8be5ffd	6ce39ed5-237a-4d80-85d1-e5712dd944aa	t
1f59f410-6cd0-4040-a4fb-ae00c8be5ffd	044580e6-4102-40fe-9836-2991d3f075f2	t
1f59f410-6cd0-4040-a4fb-ae00c8be5ffd	c6c8297c-63f1-4351-ae06-b2dad755c2a2	t
1f59f410-6cd0-4040-a4fb-ae00c8be5ffd	ff5ca93d-f24d-4468-9f96-8d521ffb0076	f
1f59f410-6cd0-4040-a4fb-ae00c8be5ffd	2444797a-cef5-423f-84c2-1bcf18463c50	f
1f59f410-6cd0-4040-a4fb-ae00c8be5ffd	d30a3ad8-3e3a-48a3-b948-fcf5dcc6fb27	f
1f59f410-6cd0-4040-a4fb-ae00c8be5ffd	facf04fc-0c55-42de-8b27-38643f70a4cb	f
1f59f410-6cd0-4040-a4fb-ae00c8be5ffd	ea6978f8-6865-42eb-859c-37b8b5ace27e	f
07b5d519-49d8-4951-b05c-ac90a831a805	1f592d4d-f33b-41b1-933a-482898529356	t
07b5d519-49d8-4951-b05c-ac90a831a805	39295a49-c2bb-424a-8767-31eb4e1241f8	t
07b5d519-49d8-4951-b05c-ac90a831a805	48046a02-0c54-4c9e-8c29-0b48a5d8e117	t
07b5d519-49d8-4951-b05c-ac90a831a805	6ce39ed5-237a-4d80-85d1-e5712dd944aa	t
07b5d519-49d8-4951-b05c-ac90a831a805	044580e6-4102-40fe-9836-2991d3f075f2	t
07b5d519-49d8-4951-b05c-ac90a831a805	c6c8297c-63f1-4351-ae06-b2dad755c2a2	t
07b5d519-49d8-4951-b05c-ac90a831a805	ff5ca93d-f24d-4468-9f96-8d521ffb0076	f
07b5d519-49d8-4951-b05c-ac90a831a805	2444797a-cef5-423f-84c2-1bcf18463c50	f
07b5d519-49d8-4951-b05c-ac90a831a805	d30a3ad8-3e3a-48a3-b948-fcf5dcc6fb27	f
07b5d519-49d8-4951-b05c-ac90a831a805	facf04fc-0c55-42de-8b27-38643f70a4cb	f
07b5d519-49d8-4951-b05c-ac90a831a805	ea6978f8-6865-42eb-859c-37b8b5ace27e	f
ab6c7ed6-6fcd-479e-872f-ace1a9468cc5	1f592d4d-f33b-41b1-933a-482898529356	t
ab6c7ed6-6fcd-479e-872f-ace1a9468cc5	39295a49-c2bb-424a-8767-31eb4e1241f8	t
ab6c7ed6-6fcd-479e-872f-ace1a9468cc5	48046a02-0c54-4c9e-8c29-0b48a5d8e117	t
ab6c7ed6-6fcd-479e-872f-ace1a9468cc5	6ce39ed5-237a-4d80-85d1-e5712dd944aa	t
ab6c7ed6-6fcd-479e-872f-ace1a9468cc5	044580e6-4102-40fe-9836-2991d3f075f2	t
ab6c7ed6-6fcd-479e-872f-ace1a9468cc5	c6c8297c-63f1-4351-ae06-b2dad755c2a2	t
ab6c7ed6-6fcd-479e-872f-ace1a9468cc5	ff5ca93d-f24d-4468-9f96-8d521ffb0076	f
ab6c7ed6-6fcd-479e-872f-ace1a9468cc5	2444797a-cef5-423f-84c2-1bcf18463c50	f
ab6c7ed6-6fcd-479e-872f-ace1a9468cc5	d30a3ad8-3e3a-48a3-b948-fcf5dcc6fb27	f
ab6c7ed6-6fcd-479e-872f-ace1a9468cc5	facf04fc-0c55-42de-8b27-38643f70a4cb	f
ab6c7ed6-6fcd-479e-872f-ace1a9468cc5	ea6978f8-6865-42eb-859c-37b8b5ace27e	f
82a0f406-c93d-4f1d-8972-09987311bf32	5849f091-d0bb-4730-b1fd-260f2e8db73a	t
82a0f406-c93d-4f1d-8972-09987311bf32	35bb7087-3a55-4460-a6aa-a06acb87c69b	t
82a0f406-c93d-4f1d-8972-09987311bf32	515895da-74fd-4887-8293-5ac2cbb87a5f	t
82a0f406-c93d-4f1d-8972-09987311bf32	4d256b34-ff7d-4590-9de4-57609db56d1e	t
82a0f406-c93d-4f1d-8972-09987311bf32	5a99839f-54f3-4be4-a839-b029dcde8f43	t
82a0f406-c93d-4f1d-8972-09987311bf32	f32a470f-d1ef-4c47-ae5e-70461fbd50cd	t
82a0f406-c93d-4f1d-8972-09987311bf32	20821262-da6a-4d55-9e5f-57197f34931d	f
82a0f406-c93d-4f1d-8972-09987311bf32	5a2ac8cb-3aa9-4f12-8400-c0021beffb6a	f
82a0f406-c93d-4f1d-8972-09987311bf32	9c4548f1-e800-4dd3-9a36-b52f29f17c61	f
82a0f406-c93d-4f1d-8972-09987311bf32	cd92d463-3238-4d50-908e-0d88020bf94e	f
82a0f406-c93d-4f1d-8972-09987311bf32	902d06b8-881b-4eb7-b395-d06dfeb83723	f
bfe8fa02-5527-4589-b742-fffc1ff2ecca	5849f091-d0bb-4730-b1fd-260f2e8db73a	t
bfe8fa02-5527-4589-b742-fffc1ff2ecca	35bb7087-3a55-4460-a6aa-a06acb87c69b	t
bfe8fa02-5527-4589-b742-fffc1ff2ecca	515895da-74fd-4887-8293-5ac2cbb87a5f	t
bfe8fa02-5527-4589-b742-fffc1ff2ecca	4d256b34-ff7d-4590-9de4-57609db56d1e	t
bfe8fa02-5527-4589-b742-fffc1ff2ecca	5a99839f-54f3-4be4-a839-b029dcde8f43	t
bfe8fa02-5527-4589-b742-fffc1ff2ecca	f32a470f-d1ef-4c47-ae5e-70461fbd50cd	t
bfe8fa02-5527-4589-b742-fffc1ff2ecca	20821262-da6a-4d55-9e5f-57197f34931d	f
bfe8fa02-5527-4589-b742-fffc1ff2ecca	5a2ac8cb-3aa9-4f12-8400-c0021beffb6a	f
bfe8fa02-5527-4589-b742-fffc1ff2ecca	9c4548f1-e800-4dd3-9a36-b52f29f17c61	f
bfe8fa02-5527-4589-b742-fffc1ff2ecca	cd92d463-3238-4d50-908e-0d88020bf94e	f
bfe8fa02-5527-4589-b742-fffc1ff2ecca	902d06b8-881b-4eb7-b395-d06dfeb83723	f
358bbb9c-f41f-4bc6-b0f3-0968dd0f4a65	5849f091-d0bb-4730-b1fd-260f2e8db73a	t
358bbb9c-f41f-4bc6-b0f3-0968dd0f4a65	35bb7087-3a55-4460-a6aa-a06acb87c69b	t
358bbb9c-f41f-4bc6-b0f3-0968dd0f4a65	515895da-74fd-4887-8293-5ac2cbb87a5f	t
358bbb9c-f41f-4bc6-b0f3-0968dd0f4a65	4d256b34-ff7d-4590-9de4-57609db56d1e	t
358bbb9c-f41f-4bc6-b0f3-0968dd0f4a65	5a99839f-54f3-4be4-a839-b029dcde8f43	t
358bbb9c-f41f-4bc6-b0f3-0968dd0f4a65	f32a470f-d1ef-4c47-ae5e-70461fbd50cd	t
358bbb9c-f41f-4bc6-b0f3-0968dd0f4a65	20821262-da6a-4d55-9e5f-57197f34931d	f
358bbb9c-f41f-4bc6-b0f3-0968dd0f4a65	5a2ac8cb-3aa9-4f12-8400-c0021beffb6a	f
358bbb9c-f41f-4bc6-b0f3-0968dd0f4a65	9c4548f1-e800-4dd3-9a36-b52f29f17c61	f
358bbb9c-f41f-4bc6-b0f3-0968dd0f4a65	cd92d463-3238-4d50-908e-0d88020bf94e	f
358bbb9c-f41f-4bc6-b0f3-0968dd0f4a65	902d06b8-881b-4eb7-b395-d06dfeb83723	f
5fc8fe91-54b6-4965-85da-cc182d494fba	5849f091-d0bb-4730-b1fd-260f2e8db73a	t
5fc8fe91-54b6-4965-85da-cc182d494fba	35bb7087-3a55-4460-a6aa-a06acb87c69b	t
5fc8fe91-54b6-4965-85da-cc182d494fba	515895da-74fd-4887-8293-5ac2cbb87a5f	t
5fc8fe91-54b6-4965-85da-cc182d494fba	4d256b34-ff7d-4590-9de4-57609db56d1e	t
5fc8fe91-54b6-4965-85da-cc182d494fba	5a99839f-54f3-4be4-a839-b029dcde8f43	t
5fc8fe91-54b6-4965-85da-cc182d494fba	f32a470f-d1ef-4c47-ae5e-70461fbd50cd	t
5fc8fe91-54b6-4965-85da-cc182d494fba	20821262-da6a-4d55-9e5f-57197f34931d	f
5fc8fe91-54b6-4965-85da-cc182d494fba	5a2ac8cb-3aa9-4f12-8400-c0021beffb6a	f
5fc8fe91-54b6-4965-85da-cc182d494fba	9c4548f1-e800-4dd3-9a36-b52f29f17c61	f
5fc8fe91-54b6-4965-85da-cc182d494fba	cd92d463-3238-4d50-908e-0d88020bf94e	f
5fc8fe91-54b6-4965-85da-cc182d494fba	902d06b8-881b-4eb7-b395-d06dfeb83723	f
c97f0a03-7ed7-4dfb-9637-bc92b8449d9d	5849f091-d0bb-4730-b1fd-260f2e8db73a	t
c97f0a03-7ed7-4dfb-9637-bc92b8449d9d	35bb7087-3a55-4460-a6aa-a06acb87c69b	t
c97f0a03-7ed7-4dfb-9637-bc92b8449d9d	515895da-74fd-4887-8293-5ac2cbb87a5f	t
c97f0a03-7ed7-4dfb-9637-bc92b8449d9d	4d256b34-ff7d-4590-9de4-57609db56d1e	t
c97f0a03-7ed7-4dfb-9637-bc92b8449d9d	5a99839f-54f3-4be4-a839-b029dcde8f43	t
c97f0a03-7ed7-4dfb-9637-bc92b8449d9d	f32a470f-d1ef-4c47-ae5e-70461fbd50cd	t
c97f0a03-7ed7-4dfb-9637-bc92b8449d9d	20821262-da6a-4d55-9e5f-57197f34931d	f
c97f0a03-7ed7-4dfb-9637-bc92b8449d9d	5a2ac8cb-3aa9-4f12-8400-c0021beffb6a	f
c97f0a03-7ed7-4dfb-9637-bc92b8449d9d	9c4548f1-e800-4dd3-9a36-b52f29f17c61	f
c97f0a03-7ed7-4dfb-9637-bc92b8449d9d	cd92d463-3238-4d50-908e-0d88020bf94e	f
c97f0a03-7ed7-4dfb-9637-bc92b8449d9d	902d06b8-881b-4eb7-b395-d06dfeb83723	f
5be18a22-1bf7-4158-b418-7c8b622c8ee0	5849f091-d0bb-4730-b1fd-260f2e8db73a	t
5be18a22-1bf7-4158-b418-7c8b622c8ee0	35bb7087-3a55-4460-a6aa-a06acb87c69b	t
5be18a22-1bf7-4158-b418-7c8b622c8ee0	515895da-74fd-4887-8293-5ac2cbb87a5f	t
5be18a22-1bf7-4158-b418-7c8b622c8ee0	4d256b34-ff7d-4590-9de4-57609db56d1e	t
5be18a22-1bf7-4158-b418-7c8b622c8ee0	5a99839f-54f3-4be4-a839-b029dcde8f43	t
5be18a22-1bf7-4158-b418-7c8b622c8ee0	f32a470f-d1ef-4c47-ae5e-70461fbd50cd	t
5be18a22-1bf7-4158-b418-7c8b622c8ee0	20821262-da6a-4d55-9e5f-57197f34931d	f
5be18a22-1bf7-4158-b418-7c8b622c8ee0	5a2ac8cb-3aa9-4f12-8400-c0021beffb6a	f
5be18a22-1bf7-4158-b418-7c8b622c8ee0	9c4548f1-e800-4dd3-9a36-b52f29f17c61	f
5be18a22-1bf7-4158-b418-7c8b622c8ee0	cd92d463-3238-4d50-908e-0d88020bf94e	f
5be18a22-1bf7-4158-b418-7c8b622c8ee0	902d06b8-881b-4eb7-b395-d06dfeb83723	f
2e713a57-2d5f-4835-aca9-8342751942d1	5849f091-d0bb-4730-b1fd-260f2e8db73a	t
2e713a57-2d5f-4835-aca9-8342751942d1	35bb7087-3a55-4460-a6aa-a06acb87c69b	t
2e713a57-2d5f-4835-aca9-8342751942d1	515895da-74fd-4887-8293-5ac2cbb87a5f	t
2e713a57-2d5f-4835-aca9-8342751942d1	4d256b34-ff7d-4590-9de4-57609db56d1e	t
2e713a57-2d5f-4835-aca9-8342751942d1	5a99839f-54f3-4be4-a839-b029dcde8f43	t
2e713a57-2d5f-4835-aca9-8342751942d1	f32a470f-d1ef-4c47-ae5e-70461fbd50cd	t
2e713a57-2d5f-4835-aca9-8342751942d1	20821262-da6a-4d55-9e5f-57197f34931d	f
2e713a57-2d5f-4835-aca9-8342751942d1	5a2ac8cb-3aa9-4f12-8400-c0021beffb6a	f
2e713a57-2d5f-4835-aca9-8342751942d1	9c4548f1-e800-4dd3-9a36-b52f29f17c61	f
2e713a57-2d5f-4835-aca9-8342751942d1	cd92d463-3238-4d50-908e-0d88020bf94e	f
2e713a57-2d5f-4835-aca9-8342751942d1	902d06b8-881b-4eb7-b395-d06dfeb83723	f
2e713a57-2d5f-4835-aca9-8342751942d1	9e419960-514c-4eac-b208-4b92779afcfd	t
53dcc167-e5c7-4a51-b708-cef18370e62c	e0c0563b-1b78-4c49-9e1e-950a58c718e5	t
53dcc167-e5c7-4a51-b708-cef18370e62c	30a52cff-a647-4c73-9846-e4db810c824f	t
53dcc167-e5c7-4a51-b708-cef18370e62c	ade43b57-68a1-4a09-a60f-35758c3f5a87	t
53dcc167-e5c7-4a51-b708-cef18370e62c	43f1ac4e-a381-4a52-9803-afed159cb010	t
53dcc167-e5c7-4a51-b708-cef18370e62c	5729b064-c40f-45da-9202-334565727841	t
53dcc167-e5c7-4a51-b708-cef18370e62c	53de374b-ee75-4e89-bd5e-76b5e97e931e	t
53dcc167-e5c7-4a51-b708-cef18370e62c	9e678102-7b31-4b29-90e6-24ccedb0134e	f
53dcc167-e5c7-4a51-b708-cef18370e62c	59feeae9-fd9d-44ce-9a75-ffa91737c7c8	f
53dcc167-e5c7-4a51-b708-cef18370e62c	adbe720e-4271-4ecd-89ba-16a4999c1b03	f
53dcc167-e5c7-4a51-b708-cef18370e62c	d7bc7861-2a5e-4104-a580-d4ab42afd3d2	f
53dcc167-e5c7-4a51-b708-cef18370e62c	af43d9c6-5314-4697-a024-5039f5402435	f
62441632-3a92-48c0-92ab-d80cf0610229	e0c0563b-1b78-4c49-9e1e-950a58c718e5	t
62441632-3a92-48c0-92ab-d80cf0610229	30a52cff-a647-4c73-9846-e4db810c824f	t
62441632-3a92-48c0-92ab-d80cf0610229	ade43b57-68a1-4a09-a60f-35758c3f5a87	t
62441632-3a92-48c0-92ab-d80cf0610229	43f1ac4e-a381-4a52-9803-afed159cb010	t
62441632-3a92-48c0-92ab-d80cf0610229	5729b064-c40f-45da-9202-334565727841	t
62441632-3a92-48c0-92ab-d80cf0610229	53de374b-ee75-4e89-bd5e-76b5e97e931e	t
62441632-3a92-48c0-92ab-d80cf0610229	9e678102-7b31-4b29-90e6-24ccedb0134e	f
62441632-3a92-48c0-92ab-d80cf0610229	59feeae9-fd9d-44ce-9a75-ffa91737c7c8	f
62441632-3a92-48c0-92ab-d80cf0610229	adbe720e-4271-4ecd-89ba-16a4999c1b03	f
62441632-3a92-48c0-92ab-d80cf0610229	d7bc7861-2a5e-4104-a580-d4ab42afd3d2	f
62441632-3a92-48c0-92ab-d80cf0610229	af43d9c6-5314-4697-a024-5039f5402435	f
e9245e8a-48fd-4b8b-add1-e7e5c998809f	e0c0563b-1b78-4c49-9e1e-950a58c718e5	t
e9245e8a-48fd-4b8b-add1-e7e5c998809f	30a52cff-a647-4c73-9846-e4db810c824f	t
e9245e8a-48fd-4b8b-add1-e7e5c998809f	ade43b57-68a1-4a09-a60f-35758c3f5a87	t
e9245e8a-48fd-4b8b-add1-e7e5c998809f	43f1ac4e-a381-4a52-9803-afed159cb010	t
e9245e8a-48fd-4b8b-add1-e7e5c998809f	5729b064-c40f-45da-9202-334565727841	t
e9245e8a-48fd-4b8b-add1-e7e5c998809f	53de374b-ee75-4e89-bd5e-76b5e97e931e	t
e9245e8a-48fd-4b8b-add1-e7e5c998809f	9e678102-7b31-4b29-90e6-24ccedb0134e	f
e9245e8a-48fd-4b8b-add1-e7e5c998809f	59feeae9-fd9d-44ce-9a75-ffa91737c7c8	f
e9245e8a-48fd-4b8b-add1-e7e5c998809f	adbe720e-4271-4ecd-89ba-16a4999c1b03	f
e9245e8a-48fd-4b8b-add1-e7e5c998809f	d7bc7861-2a5e-4104-a580-d4ab42afd3d2	f
e9245e8a-48fd-4b8b-add1-e7e5c998809f	af43d9c6-5314-4697-a024-5039f5402435	f
8b9e2719-2150-4a1e-a2b8-232158e4891e	e0c0563b-1b78-4c49-9e1e-950a58c718e5	t
8b9e2719-2150-4a1e-a2b8-232158e4891e	30a52cff-a647-4c73-9846-e4db810c824f	t
8b9e2719-2150-4a1e-a2b8-232158e4891e	ade43b57-68a1-4a09-a60f-35758c3f5a87	t
8b9e2719-2150-4a1e-a2b8-232158e4891e	43f1ac4e-a381-4a52-9803-afed159cb010	t
8b9e2719-2150-4a1e-a2b8-232158e4891e	5729b064-c40f-45da-9202-334565727841	t
8b9e2719-2150-4a1e-a2b8-232158e4891e	53de374b-ee75-4e89-bd5e-76b5e97e931e	t
8b9e2719-2150-4a1e-a2b8-232158e4891e	9e678102-7b31-4b29-90e6-24ccedb0134e	f
8b9e2719-2150-4a1e-a2b8-232158e4891e	59feeae9-fd9d-44ce-9a75-ffa91737c7c8	f
8b9e2719-2150-4a1e-a2b8-232158e4891e	adbe720e-4271-4ecd-89ba-16a4999c1b03	f
8b9e2719-2150-4a1e-a2b8-232158e4891e	d7bc7861-2a5e-4104-a580-d4ab42afd3d2	f
8b9e2719-2150-4a1e-a2b8-232158e4891e	af43d9c6-5314-4697-a024-5039f5402435	f
88a901c3-2730-4d6d-8f86-a99bf6455e77	e0c0563b-1b78-4c49-9e1e-950a58c718e5	t
88a901c3-2730-4d6d-8f86-a99bf6455e77	30a52cff-a647-4c73-9846-e4db810c824f	t
88a901c3-2730-4d6d-8f86-a99bf6455e77	ade43b57-68a1-4a09-a60f-35758c3f5a87	t
88a901c3-2730-4d6d-8f86-a99bf6455e77	43f1ac4e-a381-4a52-9803-afed159cb010	t
88a901c3-2730-4d6d-8f86-a99bf6455e77	5729b064-c40f-45da-9202-334565727841	t
88a901c3-2730-4d6d-8f86-a99bf6455e77	53de374b-ee75-4e89-bd5e-76b5e97e931e	t
88a901c3-2730-4d6d-8f86-a99bf6455e77	9e678102-7b31-4b29-90e6-24ccedb0134e	f
88a901c3-2730-4d6d-8f86-a99bf6455e77	59feeae9-fd9d-44ce-9a75-ffa91737c7c8	f
88a901c3-2730-4d6d-8f86-a99bf6455e77	adbe720e-4271-4ecd-89ba-16a4999c1b03	f
88a901c3-2730-4d6d-8f86-a99bf6455e77	d7bc7861-2a5e-4104-a580-d4ab42afd3d2	f
88a901c3-2730-4d6d-8f86-a99bf6455e77	af43d9c6-5314-4697-a024-5039f5402435	f
15641592-9ee8-4f81-9105-06202f2c80b2	e0c0563b-1b78-4c49-9e1e-950a58c718e5	t
15641592-9ee8-4f81-9105-06202f2c80b2	30a52cff-a647-4c73-9846-e4db810c824f	t
15641592-9ee8-4f81-9105-06202f2c80b2	ade43b57-68a1-4a09-a60f-35758c3f5a87	t
15641592-9ee8-4f81-9105-06202f2c80b2	43f1ac4e-a381-4a52-9803-afed159cb010	t
15641592-9ee8-4f81-9105-06202f2c80b2	5729b064-c40f-45da-9202-334565727841	t
15641592-9ee8-4f81-9105-06202f2c80b2	53de374b-ee75-4e89-bd5e-76b5e97e931e	t
15641592-9ee8-4f81-9105-06202f2c80b2	9e678102-7b31-4b29-90e6-24ccedb0134e	f
15641592-9ee8-4f81-9105-06202f2c80b2	59feeae9-fd9d-44ce-9a75-ffa91737c7c8	f
15641592-9ee8-4f81-9105-06202f2c80b2	adbe720e-4271-4ecd-89ba-16a4999c1b03	f
15641592-9ee8-4f81-9105-06202f2c80b2	d7bc7861-2a5e-4104-a580-d4ab42afd3d2	f
15641592-9ee8-4f81-9105-06202f2c80b2	af43d9c6-5314-4697-a024-5039f5402435	f
bfad858c-3558-4e6d-99e6-d1e29a08adc0	e0c0563b-1b78-4c49-9e1e-950a58c718e5	t
bfad858c-3558-4e6d-99e6-d1e29a08adc0	30a52cff-a647-4c73-9846-e4db810c824f	t
bfad858c-3558-4e6d-99e6-d1e29a08adc0	ade43b57-68a1-4a09-a60f-35758c3f5a87	t
bfad858c-3558-4e6d-99e6-d1e29a08adc0	43f1ac4e-a381-4a52-9803-afed159cb010	t
bfad858c-3558-4e6d-99e6-d1e29a08adc0	5729b064-c40f-45da-9202-334565727841	t
bfad858c-3558-4e6d-99e6-d1e29a08adc0	53de374b-ee75-4e89-bd5e-76b5e97e931e	t
bfad858c-3558-4e6d-99e6-d1e29a08adc0	9e678102-7b31-4b29-90e6-24ccedb0134e	f
bfad858c-3558-4e6d-99e6-d1e29a08adc0	59feeae9-fd9d-44ce-9a75-ffa91737c7c8	f
bfad858c-3558-4e6d-99e6-d1e29a08adc0	adbe720e-4271-4ecd-89ba-16a4999c1b03	f
bfad858c-3558-4e6d-99e6-d1e29a08adc0	d7bc7861-2a5e-4104-a580-d4ab42afd3d2	f
bfad858c-3558-4e6d-99e6-d1e29a08adc0	af43d9c6-5314-4697-a024-5039f5402435	f
\.


--
-- TOC entry 4620 (class 0 OID 20400)
-- Dependencies: 229
-- Data for Name: client_scope_role_mapping; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.client_scope_role_mapping (scope_id, role_id) FROM stdin;
ff5ca93d-f24d-4468-9f96-8d521ffb0076	a62273e8-ab4b-48fc-8f92-428f5d748452
5a2ac8cb-3aa9-4f12-8400-c0021beffb6a	0ab555c5-a077-43c6-9169-8dcc41722a69
adbe720e-4271-4ecd-89ba-16a4999c1b03	b62b33ed-2537-4b0e-be48-ddb885f95d26
\.


--
-- TOC entry 4621 (class 0 OID 20403)
-- Dependencies: 230
-- Data for Name: component; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.component (id, name, parent_id, provider_id, provider_type, realm_id, sub_type) FROM stdin;
301b54ef-6999-4fda-923d-2123936969e3	Trusted Hosts	573be4f5-590a-4831-a3f3-de3d8f56ec34	trusted-hosts	org.keycloak.services.clientregistration.policy.ClientRegistrationPolicy	573be4f5-590a-4831-a3f3-de3d8f56ec34	anonymous
f4df87f2-910a-4d08-86c4-03ce71ec7c5f	Consent Required	573be4f5-590a-4831-a3f3-de3d8f56ec34	consent-required	org.keycloak.services.clientregistration.policy.ClientRegistrationPolicy	573be4f5-590a-4831-a3f3-de3d8f56ec34	anonymous
0a3e65bb-8fb6-4200-b309-f35c7a3881ef	Full Scope Disabled	573be4f5-590a-4831-a3f3-de3d8f56ec34	scope	org.keycloak.services.clientregistration.policy.ClientRegistrationPolicy	573be4f5-590a-4831-a3f3-de3d8f56ec34	anonymous
372bc261-1147-4da9-bfcf-5f16c412d290	Max Clients Limit	573be4f5-590a-4831-a3f3-de3d8f56ec34	max-clients	org.keycloak.services.clientregistration.policy.ClientRegistrationPolicy	573be4f5-590a-4831-a3f3-de3d8f56ec34	anonymous
7308efa2-e85a-4587-8a1f-58cd7847b856	Allowed Protocol Mapper Types	573be4f5-590a-4831-a3f3-de3d8f56ec34	allowed-protocol-mappers	org.keycloak.services.clientregistration.policy.ClientRegistrationPolicy	573be4f5-590a-4831-a3f3-de3d8f56ec34	anonymous
af0edcc2-7cb2-4025-b914-dd686091dc00	Allowed Client Scopes	573be4f5-590a-4831-a3f3-de3d8f56ec34	allowed-client-templates	org.keycloak.services.clientregistration.policy.ClientRegistrationPolicy	573be4f5-590a-4831-a3f3-de3d8f56ec34	anonymous
3f7dc447-b162-4977-a3e4-dbc3004c0226	Allowed Protocol Mapper Types	573be4f5-590a-4831-a3f3-de3d8f56ec34	allowed-protocol-mappers	org.keycloak.services.clientregistration.policy.ClientRegistrationPolicy	573be4f5-590a-4831-a3f3-de3d8f56ec34	authenticated
6a8e427b-98c3-4f1d-ac32-4e04060ee5fc	Allowed Client Scopes	573be4f5-590a-4831-a3f3-de3d8f56ec34	allowed-client-templates	org.keycloak.services.clientregistration.policy.ClientRegistrationPolicy	573be4f5-590a-4831-a3f3-de3d8f56ec34	authenticated
3dffe99c-8d2d-4ce6-b68e-94be0b77ae33	rsa-generated	573be4f5-590a-4831-a3f3-de3d8f56ec34	rsa-generated	org.keycloak.keys.KeyProvider	573be4f5-590a-4831-a3f3-de3d8f56ec34	\N
a38f5adf-0c95-45df-95cf-046b808a89b2	rsa-enc-generated	573be4f5-590a-4831-a3f3-de3d8f56ec34	rsa-enc-generated	org.keycloak.keys.KeyProvider	573be4f5-590a-4831-a3f3-de3d8f56ec34	\N
c8b68653-fc86-4768-83a7-2a9d1467511d	hmac-generated-hs512	573be4f5-590a-4831-a3f3-de3d8f56ec34	hmac-generated	org.keycloak.keys.KeyProvider	573be4f5-590a-4831-a3f3-de3d8f56ec34	\N
09aa0ce0-b997-451d-a270-ee08a66351ac	aes-generated	573be4f5-590a-4831-a3f3-de3d8f56ec34	aes-generated	org.keycloak.keys.KeyProvider	573be4f5-590a-4831-a3f3-de3d8f56ec34	\N
8d78f68a-c00d-4a6a-80d9-4677237b0225	\N	573be4f5-590a-4831-a3f3-de3d8f56ec34	declarative-user-profile	org.keycloak.userprofile.UserProfileProvider	573be4f5-590a-4831-a3f3-de3d8f56ec34	\N
d88df42c-15a1-485b-a20f-b9c6afd86075	rsa-generated	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	rsa-generated	org.keycloak.keys.KeyProvider	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	\N
9d28dc73-d7b8-41d2-9a75-7d6e317069d5	rsa-enc-generated	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	rsa-enc-generated	org.keycloak.keys.KeyProvider	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	\N
e23d1d65-7e45-4b81-b9bf-bebe17117d22	hmac-generated-hs512	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	hmac-generated	org.keycloak.keys.KeyProvider	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	\N
404be791-97ce-4a6b-8f62-045ebeae0881	aes-generated	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	aes-generated	org.keycloak.keys.KeyProvider	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	\N
3a770e0c-3d32-4cd1-8290-6e46b11c7079	Trusted Hosts	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	trusted-hosts	org.keycloak.services.clientregistration.policy.ClientRegistrationPolicy	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	anonymous
1986a7fd-0284-47cc-9f4a-f00e506d74d0	Consent Required	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	consent-required	org.keycloak.services.clientregistration.policy.ClientRegistrationPolicy	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	anonymous
0fec7294-6d92-4484-a499-9a85666c460b	Full Scope Disabled	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	scope	org.keycloak.services.clientregistration.policy.ClientRegistrationPolicy	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	anonymous
851b7d8c-87fd-4721-88f6-8525af05d436	Max Clients Limit	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	max-clients	org.keycloak.services.clientregistration.policy.ClientRegistrationPolicy	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	anonymous
fd6f84f5-212b-4f50-b18d-65faaf966e23	Allowed Protocol Mapper Types	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	allowed-protocol-mappers	org.keycloak.services.clientregistration.policy.ClientRegistrationPolicy	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	anonymous
ad7922fc-a9ec-4b0a-9a84-c78dd21bb781	Allowed Client Scopes	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	allowed-client-templates	org.keycloak.services.clientregistration.policy.ClientRegistrationPolicy	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	anonymous
1fa59620-6c22-4e94-88a8-e17fa8baa0ea	Allowed Protocol Mapper Types	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	allowed-protocol-mappers	org.keycloak.services.clientregistration.policy.ClientRegistrationPolicy	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	authenticated
172fe63d-75b6-45c4-886d-72609eb30bc7	Allowed Client Scopes	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	allowed-client-templates	org.keycloak.services.clientregistration.policy.ClientRegistrationPolicy	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	authenticated
4c45f52b-b6ee-4d24-bdb6-c84793bcbf06	rsa-generated	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	rsa-generated	org.keycloak.keys.KeyProvider	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	\N
67d19dc5-bfb3-4cb4-8ecd-11fb4e404d42	rsa-enc-generated	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	rsa-enc-generated	org.keycloak.keys.KeyProvider	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	\N
610ab409-b27d-448b-88ea-c3bbea55862e	hmac-generated-hs512	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	hmac-generated	org.keycloak.keys.KeyProvider	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	\N
d0e55477-0625-4967-91ec-9450bda31325	aes-generated	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	aes-generated	org.keycloak.keys.KeyProvider	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	\N
4d507ad8-5f6e-49e8-8691-ffcfacd435fe	Trusted Hosts	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	trusted-hosts	org.keycloak.services.clientregistration.policy.ClientRegistrationPolicy	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	anonymous
3aa5dfcb-cfa8-4ca0-9ee7-15979b089446	Consent Required	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	consent-required	org.keycloak.services.clientregistration.policy.ClientRegistrationPolicy	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	anonymous
7aa6d4a1-cb6c-49b5-bbe4-e726fc9f8730	Full Scope Disabled	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	scope	org.keycloak.services.clientregistration.policy.ClientRegistrationPolicy	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	anonymous
a11b4c24-a16a-4efe-9511-a607f6218dab	Max Clients Limit	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	max-clients	org.keycloak.services.clientregistration.policy.ClientRegistrationPolicy	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	anonymous
d9a0d751-3913-4221-8ab9-48420f813908	Allowed Protocol Mapper Types	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	allowed-protocol-mappers	org.keycloak.services.clientregistration.policy.ClientRegistrationPolicy	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	anonymous
d0107c04-883b-41de-9dc4-1da82cbbaf7b	Allowed Client Scopes	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	allowed-client-templates	org.keycloak.services.clientregistration.policy.ClientRegistrationPolicy	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	anonymous
99414f2c-2a79-4e97-90b2-dc743967099f	Allowed Protocol Mapper Types	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	allowed-protocol-mappers	org.keycloak.services.clientregistration.policy.ClientRegistrationPolicy	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	authenticated
a1d8ffaa-cd79-4654-8f9a-d008e1e4f156	Allowed Client Scopes	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	allowed-client-templates	org.keycloak.services.clientregistration.policy.ClientRegistrationPolicy	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	authenticated
ad28d10a-3ce4-4065-bacc-30b73110370f	Gateway Federation	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	hdruk-api-user-federation	org.keycloak.storage.UserStorageProvider	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	\N
\.


--
-- TOC entry 4622 (class 0 OID 20408)
-- Dependencies: 231
-- Data for Name: component_config; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.component_config (id, component_id, name, value) FROM stdin;
2a2fd318-c45e-4cd1-b169-b33d8412fe29	301b54ef-6999-4fda-923d-2123936969e3	host-sending-registration-request-must-match	true
bb676d11-276d-4dc0-a437-0978a3fbfc36	301b54ef-6999-4fda-923d-2123936969e3	client-uris-must-match	true
f401dfd2-e04e-4cb2-b5c7-d826e43e7bc3	7308efa2-e85a-4587-8a1f-58cd7847b856	allowed-protocol-mapper-types	saml-user-property-mapper
855fc688-e6ca-4cf1-bf35-52f19b1ee940	7308efa2-e85a-4587-8a1f-58cd7847b856	allowed-protocol-mapper-types	oidc-usermodel-property-mapper
bb54df78-c73f-4c4d-ae1e-3f9dfbdab6e4	7308efa2-e85a-4587-8a1f-58cd7847b856	allowed-protocol-mapper-types	saml-role-list-mapper
66c6d668-1dd3-46a8-bfda-26422ac936eb	7308efa2-e85a-4587-8a1f-58cd7847b856	allowed-protocol-mapper-types	oidc-usermodel-attribute-mapper
934460b3-f64c-40e8-8ff7-a3d3699c9d97	7308efa2-e85a-4587-8a1f-58cd7847b856	allowed-protocol-mapper-types	oidc-address-mapper
6a65cef2-fde0-4228-bc21-6fbbd95c412b	7308efa2-e85a-4587-8a1f-58cd7847b856	allowed-protocol-mapper-types	oidc-sha256-pairwise-sub-mapper
1a2837d2-1231-42b9-b8b5-0ec1919fe5fb	7308efa2-e85a-4587-8a1f-58cd7847b856	allowed-protocol-mapper-types	saml-user-attribute-mapper
2e68a3df-33e1-40c8-814a-db4f0fe82b10	7308efa2-e85a-4587-8a1f-58cd7847b856	allowed-protocol-mapper-types	oidc-full-name-mapper
876699c4-98cf-4420-a03f-62cb872e10ce	3f7dc447-b162-4977-a3e4-dbc3004c0226	allowed-protocol-mapper-types	oidc-full-name-mapper
ea967cb6-b3d4-4390-99d5-f671f2a8b40b	3f7dc447-b162-4977-a3e4-dbc3004c0226	allowed-protocol-mapper-types	saml-user-attribute-mapper
e743cd7d-6ca8-4d1e-8349-f3da654fcc09	3f7dc447-b162-4977-a3e4-dbc3004c0226	allowed-protocol-mapper-types	saml-user-property-mapper
3d844417-7d88-45d9-b4c9-83a150546082	3f7dc447-b162-4977-a3e4-dbc3004c0226	allowed-protocol-mapper-types	oidc-sha256-pairwise-sub-mapper
5fb46ce4-fd3f-4f30-a854-77f1247154de	3f7dc447-b162-4977-a3e4-dbc3004c0226	allowed-protocol-mapper-types	saml-role-list-mapper
053da6ab-80f9-45ad-93b7-7ba27ab702f5	3f7dc447-b162-4977-a3e4-dbc3004c0226	allowed-protocol-mapper-types	oidc-address-mapper
baf4a596-67b7-4e9d-9275-43a299567606	3f7dc447-b162-4977-a3e4-dbc3004c0226	allowed-protocol-mapper-types	oidc-usermodel-attribute-mapper
44211f5d-b2b0-4c91-8b3c-7fec8c797a39	3f7dc447-b162-4977-a3e4-dbc3004c0226	allowed-protocol-mapper-types	oidc-usermodel-property-mapper
fe5bb888-35de-4f62-96dd-dc64262c560e	af0edcc2-7cb2-4025-b914-dd686091dc00	allow-default-scopes	true
512eb79c-5faf-495b-8c13-455bb920b64f	372bc261-1147-4da9-bfcf-5f16c412d290	max-clients	200
8ab9ab79-5e7a-40da-b882-e07c51ee90bc	6a8e427b-98c3-4f1d-ac32-4e04060ee5fc	allow-default-scopes	true
841c4593-713a-4850-9a67-6704c48228f9	a38f5adf-0c95-45df-95cf-046b808a89b2	privateKey	MIIEowIBAAKCAQEAzvc68C9ZIiVXZXpVqc1usmCs6OmbSjDKpg5gNE3JuAceaMgXyiIzTLwhDgZOCPwy93ynHa6fwv0liF3WdDZIRs3KUCgV5MaIDEgM90R7alHWUjeAQA7UCERhMonZvDjZjKk7uqasnqJWSU5zpcWpJGD2IEh53w1o+gZVaDQnMLFcXRQ4NHzKsQ8Qp6DKeqLTEHb1BZmPUtPuY683uQfcxCEFjHWR4YEZg7Zuf7iB4DKNfMqfWDwAUEUrqgXi/ATJvBjpOPIfxnRiZxze8WAidIVmdo4zW6Gt+XJMEjDcNZww0g08jvyT2GC7bWzfwLz+Pk7PWRuHzrvoqiZRCUOXUwIDAQABAoIBAAVOmJ/NDwONopKTEvxCLMr9KKHmT5mU67VbXAMrVXdXE2QLcXS48MjQcCaMadbYJLRs6Voc/rLAzAQVp+id9bd/EmeAx6Lwpk9uT4rNoj6FL7I3Ax5hYvV9T2K83yzw5j8xnbr5CCcfMYg6r0N6cI5iwBzuztU14lG69NixsamRbuQGu6X8LbreeieyBcVN5ePuCQVn5v3CORyiZ9Q6Gvg6f3EY/p1SCcTh/zvSWEWVhuq94USor9GDS4Hm12oNCiV5O6G/YzZjpzXS1U98Uatbg1mxwEwAmQg7K8cC+7wsoclK7LEiV+pvYnHXsj6LuXWc7X63lCwNoTf6l+0NkNUCgYEA8UAGHSCAy6/5hzUrqgf6u6j0NrLxwwIEoBoTv61+FhYJW5qwFzL5Wx/fRIQIHFLj+5o/h4Qekgb2d45i2NFC6gNckFDuN77SB5fr1ghJRDukzmWL6fMD0dRJJMCgS1SqbD7kEN8gl+0OtlAgvcX8gQMXvX2Fys+nlChWudFucv8CgYEA256ZAl3RO7PlA6uOa2ximMN042zx7NCWMx4JYngp2dLPbkpdP9UMQxYb2YBchY2kaSueg60fuCOCzJqhslynfWMQuaRzkw9//OXiB0MtFd+7sncO7pP44A5HixITw/aYqFP8T2aUm3LG9LQqEo6Fr9Tc3uEiSOWEaF7NZXVNH60CgYBzruG/odBg29dpsGNpuz3OMuw4NoKboiIZq6eAqG7npFWEaZ664SSVP6lOL4m8GztbcNG55+7I0zHojoxzr5TIpigCw+wXKxeHsJ/UGFEZuQgEOMlou7E/Mu6IAx5aQRUfpuCx/mygrXn6jl3E4mV8b8E4ijJX2E9hSh6cKAMwfQKBgQC070ft7C8aOc5epLNUC1p7suQVDkeOLBbijEd9CbSpEYX1vmxuz24nwwo0ugz/tr8SKm6Q20u7n/395RN8Z9tRcRFxcGwLZ4SxbQ83nn+Beu8fS/lQUzaCGSGWENGZ7Aq++1pua/vYycniBqB241Z+kydYtDBT0Euy1Q/xG5/rjQKBgAxPpj7LCkz/gidx6O6IkOyK6lYuuR7Sa427FYsaCP5D2+0aimFvhPm/IKL3LYZ6j0lTbmipzSJHJTDtew0rBNmkxVCxm1U1/sI/Dh638U8RYM6eaLjARvU0fEHIb1QVP2cLT5ziDO1QZBUB5JcuoCH4xFZ/3e1fDjq30HjuwCHx
a4dde31d-ed08-49f2-833b-043e2f7ea39c	a38f5adf-0c95-45df-95cf-046b808a89b2	keyUse	ENC
25ccc4c2-e4f3-4238-a2a6-c8eae0e386dc	a38f5adf-0c95-45df-95cf-046b808a89b2	priority	100
9e981236-a672-4d7a-9af4-28cfe796a53f	a38f5adf-0c95-45df-95cf-046b808a89b2	certificate	MIICmzCCAYMCBgGWkdyiCDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDDAZtYXN0ZXIwHhcNMjUwNTAyMTYzNjE3WhcNMzUwNTAyMTYzNzU3WjARMQ8wDQYDVQQDDAZtYXN0ZXIwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDO9zrwL1kiJVdlelWpzW6yYKzo6ZtKMMqmDmA0Tcm4Bx5oyBfKIjNMvCEOBk4I/DL3fKcdrp/C/SWIXdZ0NkhGzcpQKBXkxogMSAz3RHtqUdZSN4BADtQIRGEyidm8ONmMqTu6pqyeolZJTnOlxakkYPYgSHnfDWj6BlVoNCcwsVxdFDg0fMqxDxCnoMp6otMQdvUFmY9S0+5jrze5B9zEIQWMdZHhgRmDtm5/uIHgMo18yp9YPABQRSuqBeL8BMm8GOk48h/GdGJnHN7xYCJ0hWZ2jjNboa35ckwSMNw1nDDSDTyO/JPYYLttbN/AvP4+Ts9ZG4fOu+iqJlEJQ5dTAgMBAAEwDQYJKoZIhvcNAQELBQADggEBADpbdw/DFakvbz2EPostgh2p78feTRa4CaKoos49cHP+Mq7dJ730fVEfCF78lyxTYSMWIsAkFRqzQOQXuSbCQI0GkKfBC6rKocFyk2U1ylvqAmteJjQvPOQDDsD2MWdCLVTYtMOiKiLFxV9B3Gih0j6lRwCc7FgG/qD0d3pYl4vWq4eJR21FVVU9Ui1CUH0/PrH3FScMWvCW4R5u9TSfcA1DQTE99WLuLxn7XiQY3T0EZgChswUaj3dNOLBUi1xKgAP8Gt9M7hEjLK0SE8g1AS8ocy9W6nUhY/Bsq3X0BKov5wp7SMgIPpI/tMm8901gVio4kmncZQXtYL95q1vCIXc=
dd8acb12-a8e4-4bf1-bb62-9cce08aece87	a38f5adf-0c95-45df-95cf-046b808a89b2	algorithm	RSA-OAEP
8a6ae0fc-7f51-4fd3-8f1d-8e47165c6652	09aa0ce0-b997-451d-a270-ee08a66351ac	secret	saSlcmADl01kkuNMEaiXpg
d35d4c0a-3220-45fa-8bea-4d5bebe1edde	09aa0ce0-b997-451d-a270-ee08a66351ac	kid	1cbd1ffd-d96b-419c-8f08-f151b0bc51f9
6c302871-230f-44dd-a859-1cd3bd893c30	09aa0ce0-b997-451d-a270-ee08a66351ac	priority	100
ba3589aa-c6b2-4fe7-8766-e6538a344081	8d78f68a-c00d-4a6a-80d9-4677237b0225	kc.user.profile.config	{"attributes":[{"name":"username","displayName":"${username}","validations":{"length":{"min":3,"max":255},"username-prohibited-characters":{},"up-username-not-idn-homograph":{}},"permissions":{"view":["admin","user"],"edit":["admin","user"]},"multivalued":false},{"name":"email","displayName":"${email}","validations":{"email":{},"length":{"max":255}},"permissions":{"view":["admin","user"],"edit":["admin","user"]},"multivalued":false},{"name":"firstName","displayName":"${firstName}","validations":{"length":{"max":255},"person-name-prohibited-characters":{}},"permissions":{"view":["admin","user"],"edit":["admin","user"]},"multivalued":false},{"name":"lastName","displayName":"${lastName}","validations":{"length":{"max":255},"person-name-prohibited-characters":{}},"permissions":{"view":["admin","user"],"edit":["admin","user"]},"multivalued":false}],"groups":[{"name":"user-metadata","displayHeader":"User metadata","displayDescription":"Attributes, which refer to user metadata"}]}
c9396cc3-840b-4826-a782-ad0b2b0ee318	c8b68653-fc86-4768-83a7-2a9d1467511d	secret	2-HN4fPiX2pqVIgcvND_xE3cTtHBjs0bLfo4p7dJrCahSiArkGF8SQKNXxYKV0ScYlFYh1TgnxVBQ4COgnzPxjkq-vB-YhLXKYmSnXQ-oOMdtTxBbrYrqLwqtzpOBdpeA0tDyDsMKBc40uzRyc3129wFx9ByOQRJqAiBsHtm5WY
144870d2-02eb-4f3c-ba3f-4af1e00ad00e	c8b68653-fc86-4768-83a7-2a9d1467511d	priority	100
6b6c2a43-4534-4f91-b6a3-efeb2af982e8	c8b68653-fc86-4768-83a7-2a9d1467511d	kid	d22b6fce-8f44-43d4-a1dd-8848216334e7
abc9ca44-3b3d-475c-af64-1176b251b24a	c8b68653-fc86-4768-83a7-2a9d1467511d	algorithm	HS512
c4e17198-7dc6-4a3f-bd68-d2a5d69f9b40	3dffe99c-8d2d-4ce6-b68e-94be0b77ae33	keyUse	SIG
845ee63e-7d62-4037-8554-bed9fbbb7744	3dffe99c-8d2d-4ce6-b68e-94be0b77ae33	priority	100
797d2474-dbd8-4944-ab61-960b4b718d6f	3dffe99c-8d2d-4ce6-b68e-94be0b77ae33	certificate	MIICmzCCAYMCBgGWkdygfDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDDAZtYXN0ZXIwHhcNMjUwNTAyMTYzNjE3WhcNMzUwNTAyMTYzNzU3WjARMQ8wDQYDVQQDDAZtYXN0ZXIwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCgrkhEgeni+t2MHs0rY52ybCQ115sV2vDqsQvvPCwr0k30Wxr54cJ83Au6iWwKBlbufp122ahPeXSwTzjuZHEYqBE6XAOq0Fu48I8pMuHEGtCgyaHHP0p9SRLhV4vfglZX5kXC/saRQerNMqMRycFWrF0EYJ5HxvebU9A38lxZNFJGeltsoPkuh5/Jjn1Zyh2Fh+eLFN6kLR3FuPNc2Ra94CKK11JrNGVDVpfhQdQQVnxzerSKhwvrHYziX5n/vEk0EMDRSa3tCh7TrKHlHp9cFs0FAbm8AAhbLkIfARrJoaSiIjQ8p9RAISln1B+U2wkQVphxtmXdEh5srU3dSScnAgMBAAEwDQYJKoZIhvcNAQELBQADggEBABk7YaDXvVfTTeovfJAodGOxHLZlYdWZ4JXna6WaeejR9WmTPk9LgkSrC7DCpqKy8CBQNXC0a/iLlSTEK0vtWfJy46T44ZDG/YPvrwrkigxBHJCGIjtLmVK9xFuAnHfpm0B3TUfes0RS8+B9LKli4djdOe6lprKc9xdqo5W4Mf/MfhzImDb5ou11rPboLwMkl0DuR6wGZpNBogRFIpyVviJxbMw2rJfXtis0CO1UFeWiqJdsyWmDOn+aYAoRMOPFGovCaz5uX7NG8dYS4sCA7hxxbLTOFbK93uABtcxFkv6GJjK7+6HqhF6QNc8qs5FDpJTd6HHeLdN+7TANTJsULRw=
f6454fa7-85e0-4320-a691-549025475fad	3dffe99c-8d2d-4ce6-b68e-94be0b77ae33	privateKey	MIIEowIBAAKCAQEAoK5IRIHp4vrdjB7NK2OdsmwkNdebFdrw6rEL7zwsK9JN9Fsa+eHCfNwLuolsCgZW7n6ddtmoT3l0sE847mRxGKgROlwDqtBbuPCPKTLhxBrQoMmhxz9KfUkS4VeL34JWV+ZFwv7GkUHqzTKjEcnBVqxdBGCeR8b3m1PQN/JcWTRSRnpbbKD5LoefyY59WcodhYfnixTepC0dxbjzXNkWveAiitdSazRlQ1aX4UHUEFZ8c3q0iocL6x2M4l+Z/7xJNBDA0Umt7Qoe06yh5R6fXBbNBQG5vAAIWy5CHwEayaGkoiI0PKfUQCEpZ9QflNsJEFaYcbZl3RIebK1N3UknJwIDAQABAoIBAB6eZ24KlY+nv10Kp40rm+ramaHa9pYZFQyb9Uq+3CnzluBIFiFk6GNTqTaAJmLYp2smHIp/2odefSJ1zkL7R+PrbvEAhMBhmQDqclVm+Ued1oC1O4tU37R1HtBrFt/eHeb9HfEVDLC0b3JvwkxK9nk2Ojlx0eeanidutsBagkeLF6TKFJo0l2rL9JGLePzQASOg/o4YbfP8xk6nGduBCuw4qOOKgks/W2AH62Qjl8wMKFebL1QGcKmXvmRJ7p2AlgUOjUbJigRdhMrmbbzT9xiu4YeLeUI2n9bk/nylGH3gyUU8GNVuxF++bk/ZeCRkoBp93vGM3A57FQ9sjEzFRVECgYEA4R1lRmCSTXQmk7DFDR3eHxBPg3uGOQgBXLRD+quB+xlr8WK7bflL/IRvhBpPV3jtPhA7IT1iLiucP6mtTijY/LSFktEWuxYVJGYFtQme9toH4QL0agWUPfP1iU5EDx1JUOQ1BvXbpHKXJ39DuLYo9HTPeG8Nn0QC7pu6ToWrp5cCgYEAtrnMuTTTWDfN0SRgzSOpX6kmwhETDuy0zbJtFEWUbotsTtW8g7ngUeGsRIMQyQoAKzdB2iQey3EhLsztZXwdZGL/XuIz5ULaGdrQbr5AvRC7FmQT1YPaTySnqghpYw92KQBYciwwIgRl5cc8xuOufkbY+nKmCXfridY5tsJu7vECgYEA2AlL3eRjwy0KsIXeNZ5KQml2xWnP//9svzjIXFInpYBaFQd5dCrg/29hTdep+Po2Q290L4wnIsP7aSU/ClktFCdyYNmEBPtGQu4d4AVhpujK0ufxA6ZjA6mSI7kWm6Kxb43yTcG4jfLimKcLqMI4P5GyYZPB8OxmG/MbMqwZdfUCgYBramH85h7vly54qcf2D+a7g3ZzUxI/DctjuGYDKrwNGAz9cww064oA2IcqZ1nwtN5QiVU+5UjtE34MQw+zPvkQUFoK7zLOrTQFSuqIj3MDMdipWv+F3tLw/31IqVU6lJZDmB5mT6+j763vG+aQjLvBI+jdoZQVsNdX2gVneHk6IQKBgF4EptIaKAHC/aEI7Jfo/H+v+kQGBw1w3stXybHTUQs0ndsuyEz5IC/kbbREhSNtBfBtyZlLIGV0GW20lATT1+v4RYmg0dlkF+rsZBNeX/Dwx+ocgVP2TCbdtr4/obai1Jnu8QosiIySXzUzbwvrvJP6Rzlkw3FSg9KawvNQS26z
5e7f7296-f6c8-4c02-8b9a-fc8cd79b33f8	4d507ad8-5f6e-49e8-8691-ffcfacd435fe	client-uris-must-match	true
b2602930-1e10-4d9c-98e2-7beb32b8b654	e23d1d65-7e45-4b81-b9bf-bebe17117d22	priority	100
b6bd0849-b43e-4dfc-8321-f7ef707ab3be	e23d1d65-7e45-4b81-b9bf-bebe17117d22	algorithm	HS512
79bd298a-078e-4450-b6a7-961429b0bb08	e23d1d65-7e45-4b81-b9bf-bebe17117d22	kid	46641863-485f-44ab-9921-b9794dc417a4
ecdc682c-af3a-4581-8f54-a87f26c16785	e23d1d65-7e45-4b81-b9bf-bebe17117d22	secret	LXiqHc-bK2PTpY_yvrJVUD7XkBJcz7MZ_dooo_ohGKruIW6wNbm3hsGn2HyNqjzFn_1bDPVyUbi3p51Fnjtm0biVolN3R1fs0ZfoOnjTlrc-jc8ECI2PHQT4e_xcVUUc33OnF7clEdxdpGf2h_UXH45ZYOxlo0eDCqonisS_Qns
09f4002c-c574-4943-81f4-3108349e0ccd	9d28dc73-d7b8-41d2-9a75-7d6e317069d5	keyUse	ENC
3385b70a-2fb7-44a2-9746-03354eb2ba69	9d28dc73-d7b8-41d2-9a75-7d6e317069d5	certificate	MIICmzCCAYMCBgGWqm8cTjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDDAZTT1VSU0QwHhcNMjUwNTA3MTEwNzEwWhcNMzUwNTA3MTEwODUwWjARMQ8wDQYDVQQDDAZTT1VSU0QwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCsv8jR84QONXhy4Qs9Bqc5tec2FJbRGyENtsIKtb9UvNHGRoGGnTx2/TCJT75HWchebtVk/5RL6yuiHtCBo34NtunrzDqK2+5u/9lgpmCRg50WCvVPu2tAOVfRy1vBd0HaYgG/NaX6cFRR1YJKMotaT+NNSJX+HGQtUdwB6iiaN0aXOVcR+NCgdx/APqrY75NkGqftqEkBvm6vB2EmrPo676DsqV2feLaKIMtJ9RlCrb/KFIMNKQNjTgc3h6Ax21xQ3MSk8/yyaxwoKpWZc94JQpyw7KeJyk3kR5CoEU4omEKC4UIPNSzunAfe1vE8qjPEchPV/VidyFA8hoZwXNbnAgMBAAEwDQYJKoZIhvcNAQELBQADggEBAFATkD6DFQg0M3NkPGvMp11bg7W7psI11i2qtH7RRIn2B2LiaidKQJ3kLuGtIOREcgujtRx5PXYX7vmyDXeXy1K4BUS6Yep1MGiH08CFvopHfE5fMBImE8HdfUyRzPEiZj0Wn05NQIfdvX59KbcqWlBluopxTWQsD75/rOzVTpkoqRpyK7RCO1XUdT9lbCoFwP5/6ccjZOKRlgdKgWtSzQ31WdCxyTIVQJDVXeiQjdQS6c66VT8HdsztsW/12r3E209KMtCdXvrXVZCqocwlHCqjufqiwhH7/HI/F8IWE697xMinc/NWwrUCCa0WFr7MEzTyRx2oRt2yGIdRk7v3VDk=
217133a1-0be3-4e75-a301-d8442d47a1d8	9d28dc73-d7b8-41d2-9a75-7d6e317069d5	algorithm	RSA-OAEP
107607a8-6382-4c37-94a4-b5d88114db12	9d28dc73-d7b8-41d2-9a75-7d6e317069d5	privateKey	MIIEogIBAAKCAQEArL/I0fOEDjV4cuELPQanObXnNhSW0RshDbbCCrW/VLzRxkaBhp08dv0wiU++R1nIXm7VZP+US+sroh7QgaN+Dbbp68w6itvubv/ZYKZgkYOdFgr1T7trQDlX0ctbwXdB2mIBvzWl+nBUUdWCSjKLWk/jTUiV/hxkLVHcAeoomjdGlzlXEfjQoHcfwD6q2O+TZBqn7ahJAb5urwdhJqz6Ou+g7Kldn3i2iiDLSfUZQq2/yhSDDSkDY04HN4egMdtcUNzEpPP8smscKCqVmXPeCUKcsOynicpN5EeQqBFOKJhCguFCDzUs7pwH3tbxPKozxHIT1f1YnchQPIaGcFzW5wIDAQABAoIBAAUyWcSzGihhRGfUTEXAMvyh87wlP2o38jUa59hxojlW2sqnqVLW3RBJSpH+45763PO2StYYeCoWf4AHhEc6F1srQvs0cBhoSFJvgOcO6j3GY03b84g7/5x1fSZTA0YdI86Bf0L0xrLzeR3jGeHIhnenipNzGQwFZ6ATY9Zs6F7HOTLDCq7vqVL90oTgRxD9QUo2I/pECxcvJgIn466C+lKBsX/gOqi+UZlQcZuZxEkfm4+mL7Wq7aQ1sAPVuHOhlH9l/PTesCNFoNsFW21dI616E/7CpgiWf8cRvAC4T07kuIxL31vzS5TTW5FJ7xzawT4AzgRYo6Eoqm4wcLy4TN0CgYEA554Rd2eN84p6elxMSRYmCco1z+khm8DdDpsL/NLKUGbKN0Tqg7ZURk7Ymo6XNBXrAJlVE0Gtz2wHYldSj1fg6f+4QTQWcifWGUzdHQnonYDCnfsNSBsl3YEm9ACQ72HTyrh9KGm+n+8YG71tDMAh55vSKagBpcFn/geroGTRWbUCgYEAvu9BhriXXlUCnihv0yaJGHDex/5KYULtS+lng3CPxocT8nGRdsYFS3d2TB/jIu7WAXIYZwyEtPRPxPIpNlUjI05Jq2NoOGqKFlCYRYA2hPMCTa4xVcrlk5FaQZH4emh+CB31xaf5oW8QkG/occqGVlGFfNN1DAeDXn8EM1mlH6sCgYAq2f7HRZxoq30feEYQ240sEIJGNg6mv1bmpd7g5qrRl0LgWNq+hZQv8dR3O9xToZ553OR1jJg4oPb4xckbhhmxkUMopRdmBWLCCYt7HOMxiKn5CoKZjZRC1+s6B4TJFSNXBSz6th2zf0vJjhFH46AiNpz6Yf/0B8VSpV6mbSCiZQKBgFjibqG12xmZ/477ChvE67uKB9wYgC3JB0j4jiy9QOFNzrZlsi8Vvi9EnLiRe56uise/gqauSDUpKt1nUlItzh7IejkkHMduqXv75vcr2bWIn0DkX6ktvDQ3TUoLFx58+Hb0444xRV+moZJr1kzq2CDk8HyMwAdqk/hwrtbs25bjAoGAI7FRHQREe9dr9Ga5At2dkner0P1iEXXJs39OXggAxMNWyy5N9pgrtmuZiDK9Hlb5Gs5MnccPx3eadHhVqtg5CZtoi/vRb4L42m2dWPFWvSJf7Zjpk4VMABjdOXHVgEfJXiPx/WlOWixhOEQTQRxKz88PtRKt+7g0z1yxKCEQs2M=
0aace0a3-d1b6-4265-a386-bc31d98fa08c	9d28dc73-d7b8-41d2-9a75-7d6e317069d5	priority	100
40bf616d-a885-41b8-8649-9fe24c036b8b	404be791-97ce-4a6b-8f62-045ebeae0881	secret	VSxCxR83mPsjlU8aqiOy0A
4921b294-2018-4bc6-aabb-2d7c3375349f	404be791-97ce-4a6b-8f62-045ebeae0881	priority	100
005aa614-6e1a-4e24-9bc0-ea13ad527334	404be791-97ce-4a6b-8f62-045ebeae0881	kid	760be799-9ca4-4bf0-a70c-6da31ebfc785
1bb5b8b9-0770-4395-b348-ec192afd2ed5	d88df42c-15a1-485b-a20f-b9c6afd86075	keyUse	SIG
de125bbe-68dd-4d36-a932-97ec27fc6416	d88df42c-15a1-485b-a20f-b9c6afd86075	priority	100
68d710c5-3a75-450c-b792-7b4110db31c8	d88df42c-15a1-485b-a20f-b9c6afd86075	privateKey	MIIEpAIBAAKCAQEAt8wNz+5tgGSMsD7PeaAUrAo27Z+WloZHyNAPSikPNRQdcmtuP4nwsE92nVQNqlNRDqJzmWqiPB+UZVek2EZKb/ECd69NzAAMSesksNse8LoV+ZmPdQDiNZKyhDughyK5TGXdYEnndTfA2JF09ub6Y7g5Dp3OqfslwGgwDX9GJQknM1OOy5prEu6Fog1XWg+WjGTJK7mpsTq+negOQyiMXmVyCAJvbxvGllVIHYvoQVpYYzvluhM7iFdf+o80SpLm6GU5yEFYtrxm0aTBX3EN1RF+p9KgUx/IDzSbG1AhGTOyeyJ1biFSEPVgm07WIFRDzKJq/806CvB19/gkkb5JUwIDAQABAoIBACyn3Fc/08UVKQWNTTV8ymj+VlgnpRvPZlOJEZ3wGezIhVsOdQvlBOChfe09xdAzTAdlOvb0bJR1C8YPpFKTyXQnN3VC14EQJewzwIdjxcGxRLOPNsazv0JK8SqlnhwXOLQyL7Y8XoshT66OsL9oYT+nO92sQ9ES3xo/diVhXfaTODW3OdiFjMqfnPPivVILIZ7SQSrSa1W4sxwgA8uxPy3KtGVaXmUp7r4m1vYRdrr0gMCY92zgfXh6VzJRLxGYD30jnxxZBmu1rvt/ryVboM7RRG6OOZ22hjAcjkmNnQdh2hDV2pZ2ZI7ELrVo6vU6UaGkoXXYn4Xt/nDJjCD2IUkCgYEA49CAoFbC1xxjuKjeJiOVIikQZBkHYzqO8R3ui5r9k2wZ+2L2gpQlGdzaKJ8RjXUK3FP24444rvD6PJ1/DqjSHbNvGZurM7EipNoQkvbN4XXHEQ00Z6V7mJj8v44CbgHGyZiLz1Tztms+HEEX/Ek9ZwB5klD3fjjIcgiwvYcEImUCgYEAzolnE09Pp6OTkdUxKpvGTAjZJVdSPhnfOIu9xKSlb5StmMKNZnz4UOvfyBlUD8Y6v99U1AghkswydTwpo7bUE9W3oQCtUNpiCdiaZJKeed/DiPRV1pt4vvVMQN6sNYb8/OgOWqiCHD9nVrgk71E1ZUuFMXRcMunIH7xpCagGJVcCgYEAmJoGT2FOysFdm0ii5nFXaLaRIDwT0shbD/C45hNAYQw8q0QzVGzgHV7vU96Z52PLjqM/8lZGaglJ1mi5v5weg366oTDBkbLKPhtElu10I969JhLuU69qB2ITjE0YG5BdFJV2sb96MWvNAygnZPu6gdCznutVndtzic+AdLSIdHECgYEAzfdgf3U8bmVGKMx+d4tZOUIpqn9mWN/cJ7vTx2KaSKfwZsK92FMQH0Laq+X2WrTIqcfCBKEHOinAuAEDVWxiGlWrBjhynorp8f+8GEfPGqL3kIB5iccJpwVgweBNxCOV73BLwEUDW8AvAeAplS9bHGUvsp3jxDI3jM6LwUF6v4kCgYBEiOXCIonsLM2A+bPZpI/RK8ZsjAIgOhejpyk3tdNxWBbBg0CjUmS9DMwcyXwKG8GWXC9H7KlQKXpwFjR0SYM0dhezVMsY/xCZfyJMw9MJtVWzksZrKW1xlo0TdX2PCZd3QIGdL/Vc0+a6DqExbSSb0qr0T13O9AWJHXynlQ8jeA==
e534d3f1-7434-4904-929f-59e640eb571f	d88df42c-15a1-485b-a20f-b9c6afd86075	certificate	MIICmzCCAYMCBgGWqm8bADANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDDAZTT1VSU0QwHhcNMjUwNTA3MTEwNzEwWhcNMzUwNTA3MTEwODUwWjARMQ8wDQYDVQQDDAZTT1VSU0QwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC3zA3P7m2AZIywPs95oBSsCjbtn5aWhkfI0A9KKQ81FB1ya24/ifCwT3adVA2qU1EOonOZaqI8H5RlV6TYRkpv8QJ3r03MAAxJ6ySw2x7wuhX5mY91AOI1krKEO6CHIrlMZd1gSed1N8DYkXT25vpjuDkOnc6p+yXAaDANf0YlCSczU47LmmsS7oWiDVdaD5aMZMkruamxOr6d6A5DKIxeZXIIAm9vG8aWVUgdi+hBWlhjO+W6EzuIV1/6jzRKkuboZTnIQVi2vGbRpMFfcQ3VEX6n0qBTH8gPNJsbUCEZM7J7InVuIVIQ9WCbTtYgVEPMomr/zToK8HX3+CSRvklTAgMBAAEwDQYJKoZIhvcNAQELBQADggEBALJiBN0X1ybmYtPyVGk3Y+CoUleGCsqXp7UO0ur8bIUV83WtI1TE//qOMqoeyPlpOXlwDufTEUxDm05O17WNhWYXcFANPNCjIQQE0UzJ472VQSIWV1wT9Z/wR+V/YRGVei2jRJO1PVGozQ6qKciD6GQ9S+cRRje6KXHDAeX5IKo2sdk85dqb+akJ7j9GAdCySW1yFV3435URiw2dfia0tZy6pJyLBq51GSYL+I32SiyaKbiluXJInwQZEG2TxbsA3VoBgAD3WlQI6QNzWHZFBoXxpYZGPMCTIwIZUi9OrOdIpGlPBq8TJkLzEAjJx1KeuES4gUWH84ezwC2uXO4CZk8=
7c43ce0d-3033-46da-bcec-b8fec548cff2	172fe63d-75b6-45c4-886d-72609eb30bc7	allow-default-scopes	true
019a08af-3415-4174-ad4c-91fbbc021f6e	851b7d8c-87fd-4721-88f6-8525af05d436	max-clients	200
7ae1a5a4-232b-4a58-9c90-8c5f611a765a	1fa59620-6c22-4e94-88a8-e17fa8baa0ea	allowed-protocol-mapper-types	oidc-usermodel-attribute-mapper
236c9164-e138-42a8-aae4-fb2be30a33dc	1fa59620-6c22-4e94-88a8-e17fa8baa0ea	allowed-protocol-mapper-types	saml-role-list-mapper
366f2682-f384-4900-bf1e-78ab4b06d246	1fa59620-6c22-4e94-88a8-e17fa8baa0ea	allowed-protocol-mapper-types	saml-user-property-mapper
925ae49b-e5fa-43bc-8e74-e828a0d6becf	1fa59620-6c22-4e94-88a8-e17fa8baa0ea	allowed-protocol-mapper-types	oidc-usermodel-property-mapper
f31bdb2e-c81d-4623-96d0-6393e995bd38	1fa59620-6c22-4e94-88a8-e17fa8baa0ea	allowed-protocol-mapper-types	saml-user-attribute-mapper
1a6214ce-454b-4da2-9ccb-32b673495807	1fa59620-6c22-4e94-88a8-e17fa8baa0ea	allowed-protocol-mapper-types	oidc-sha256-pairwise-sub-mapper
ea7c47ae-58a8-476a-9d4c-4a46753d3a8f	1fa59620-6c22-4e94-88a8-e17fa8baa0ea	allowed-protocol-mapper-types	oidc-address-mapper
39e14b98-d54e-46f9-af0a-75af84f55a81	1fa59620-6c22-4e94-88a8-e17fa8baa0ea	allowed-protocol-mapper-types	oidc-full-name-mapper
5a2aafc3-1178-4516-bfac-8cb589800411	ad7922fc-a9ec-4b0a-9a84-c78dd21bb781	allow-default-scopes	true
d6d282fb-6f19-404f-85c1-412a2343085f	fd6f84f5-212b-4f50-b18d-65faaf966e23	allowed-protocol-mapper-types	oidc-sha256-pairwise-sub-mapper
4b08ecea-29d8-47e3-883e-f378e047a9d8	fd6f84f5-212b-4f50-b18d-65faaf966e23	allowed-protocol-mapper-types	oidc-address-mapper
4062cc7c-da7e-4d05-a071-703a0357d017	fd6f84f5-212b-4f50-b18d-65faaf966e23	allowed-protocol-mapper-types	saml-role-list-mapper
90e1bf23-f92c-4050-9e83-109a5fb7bc13	fd6f84f5-212b-4f50-b18d-65faaf966e23	allowed-protocol-mapper-types	saml-user-property-mapper
c2615a47-da26-4e6f-952f-88e3da21aa75	fd6f84f5-212b-4f50-b18d-65faaf966e23	allowed-protocol-mapper-types	saml-user-attribute-mapper
7784f0e6-72e8-43c8-8c4e-d4dcfeebf922	fd6f84f5-212b-4f50-b18d-65faaf966e23	allowed-protocol-mapper-types	oidc-full-name-mapper
62475ee0-eac9-44cc-ae2a-dea109da96e5	fd6f84f5-212b-4f50-b18d-65faaf966e23	allowed-protocol-mapper-types	oidc-usermodel-attribute-mapper
2aeae56c-44d4-4390-bc84-aec34afed1ae	fd6f84f5-212b-4f50-b18d-65faaf966e23	allowed-protocol-mapper-types	oidc-usermodel-property-mapper
db3f98f5-d2fd-4437-bfba-29fd0d4dab10	3a770e0c-3d32-4cd1-8290-6e46b11c7079	host-sending-registration-request-must-match	true
a2c8e6d4-0527-4b32-9e15-e09f65c05e2b	3a770e0c-3d32-4cd1-8290-6e46b11c7079	client-uris-must-match	true
a5789deb-0145-4be2-9af4-7cd532fa3e15	67d19dc5-bfb3-4cb4-8ecd-11fb4e404d42	certificate	MIICnTCCAYUCBgGZWFM01TANBgkqhkiG9w0BAQsFADASMRAwDgYDVQQDDAdHQVRFV0FZMB4XDTI1MDkxNzE1MzYxMloXDTM1MDkxNzE1Mzc1MlowEjEQMA4GA1UEAwwHR0FURVdBWTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAIGQmMLgAFQAIbBKAAjojOtKXqKAuGTTCv00s5vXgKHpPAp/jcAR1r/dhEQGHf3yRYnO9pyUuDNL1Zd4bWsTC71KeA/1R3kzB9G3kl8CL4i5mOsUaXS1kONBsrrVZZZyGJlS7eXBVeaiKsoa2kMUYhwU5Y7P6anqswKBa3kWI38pmByI8xuUYICHe7WvGNIzcUfuLFcRFgji0Z4TXUycMcL3WdktR4kWUJe36CC51QgUpop7U6WrM6a/HCC8NJrhTeNKSPaLkrrGJMpT++kfdiTOW+T+p3AmhxX8pyvBOrKqY1qxSSJLG+wL0OV3/5Bk6VTOoo9G7fcfTXTIIlgsTUkCAwEAATANBgkqhkiG9w0BAQsFAAOCAQEADNsPSYR95CiE4znTC5qeDjybudm+khgBZ23mK51PrY8JResc5W/3GUNk/2E2yswFsyH4eEWYdrJvEFl6ZHenOl66/QbRafpT16s8EI/d4qL1BgKqPGdjb3x2eUlb93EpjhLlscLsjPzThgnW6chUuf6GdeBcJdQu01oRubH9SQKaobRBkaVluFZoIhQrHqGo7rfD9VjrIE4OG/vHbfWnSGtm2qj8MgrUsIFtHlItY76ivRqcBp++wekZ7pRpC667se4iuCPdH9MNLrm1RKlGcIH0hPvt6atAdzDBX6F3ZbR5VA75E4rw+exVu4VeD/NWuflpnWvuhlFKNZ16ROxGlw==
a4e108c0-64ed-4b60-bcfd-a33183b808f0	67d19dc5-bfb3-4cb4-8ecd-11fb4e404d42	algorithm	RSA-OAEP
8dfc8b2d-4a2a-4f08-b1b6-394424fbd336	67d19dc5-bfb3-4cb4-8ecd-11fb4e404d42	privateKey	MIIEogIBAAKCAQEAgZCYwuAAVAAhsEoACOiM60peooC4ZNMK/TSzm9eAoek8Cn+NwBHWv92ERAYd/fJFic72nJS4M0vVl3htaxMLvUp4D/VHeTMH0beSXwIviLmY6xRpdLWQ40GyutVllnIYmVLt5cFV5qIqyhraQxRiHBTljs/pqeqzAoFreRYjfymYHIjzG5RggId7ta8Y0jNxR+4sVxEWCOLRnhNdTJwxwvdZ2S1HiRZQl7foILnVCBSmintTpaszpr8cILw0muFN40pI9ouSusYkylP76R92JM5b5P6ncCaHFfynK8E6sqpjWrFJIksb7AvQ5Xf/kGTpVM6ij0bt9x9NdMgiWCxNSQIDAQABAoIBAAtZjFg94Sl6nXjg8qHVJUsTR7j6h6ylZCgMLtOvDCCi2tScmeFCbsp98DE5S/VL/NV2oNnUmVI9CWfsb8FaeMPLOztCpFE0rDGt4A+clGdowsGNFzPXF+sgfTSqrux/8DG2NwrSZeD/QbpUodwQdAu7tOROyExPOAE3Lx/7VX61GSqh9IuvMrukekEGtrQ60BuTliznK4173S3oUS1s3SO3X7nijjTUnE0vuQoVyTJNRMQeOJUgkrbxUmh/y7hCYYcgHqbxdZ4i3qXeqPGSoosx5ObTka5Ew7/vkuyWW3GCIe/qjwAKH8pXjQcUtzYS9EGj5UgP46U9TIjGzhYBkZECgYEAtmexMPElxEyX5ncThL0av+qSxo2+pNBfzwU+kxdVc4MvlxlCdm4h/Cq1KRPiu2a6O80cnBpx+avZIkTG0bAJauCoXMqgcV/WZTy8EgE3Tu300YabugX1H/WRYEqrSJ8//r8oEy52j0rCPTwPovwHQfUCcvbsyjdCnznZkz7tmgUCgYEAtdcg1gZp3WceGLj35RuVceTAJBTM02HUXDELaSTR+jLqQT6LbnOcTNq0bvjqZUxXSuJWQgeVF5O2P1c+us4IXgQH0vl7AI3LMVzAgBRtkNvz48mE1sUBjihXh3DKrHl1vnUTcr+nEtRrLq2nwf118QNO17UEUGE9xDXgveIwlXUCgYBn7zfA2neZncckFA+0IAjA+EmAB75srSsajDN2nuIa+tJAN61uTBzjUfZ+HI2iGMvfTWWS8WKmUCxeYXAkhTkohDCLBw5a66//aZcEb1rzh5VrWlcbrU9aUZPvmTx2Gf/eCVAtddkqlv+M4s9KIG+GPrSRi2+rXceBcPYv97htfQKBgHtS1nswyFWW3MuJjt48EeO3bzRJQwzNWXfY71M03I+iPktXfrq+/68D2ME2Ycmnt8AatsN7Xvspe72DjxCkMPqKI0BLYMdkYv0sWYXD1PccpVDEWCpMXByscYhyz5GfomI0BqeZIVdc5wA2WALxwi5dvvf+VVmqSXirzasaHzcNAoGAa8Uxi9dUSeuLrevJqr+V2j3t2Iu8cvVGj49H5KbRD6L28l4IfM/HVftjLWMto9HXjWIzbcbhBQGXwF3GN/6lPmPmFsmhLBO+RSAhrxEXwwCk6BJNZKLCaoTA8p4hlvCi65SbDaP9O0khg5sWk7V0prsQn+fA4ojCW/bz2TqGGv4=
b2b2f6dd-79f5-4607-86b5-f9f1721b9477	67d19dc5-bfb3-4cb4-8ecd-11fb4e404d42	priority	100
d72e326f-cec9-42f3-a140-4a9d4fe0f812	67d19dc5-bfb3-4cb4-8ecd-11fb4e404d42	keyUse	ENC
baf66deb-5a9b-47a8-9bb6-8793065b586b	4c45f52b-b6ee-4d24-bdb6-c84793bcbf06	certificate	MIICnTCCAYUCBgGZWFMxrDANBgkqhkiG9w0BAQsFADASMRAwDgYDVQQDDAdHQVRFV0FZMB4XDTI1MDkxNzE1MzYxMVoXDTM1MDkxNzE1Mzc1MVowEjEQMA4GA1UEAwwHR0FURVdBWTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAJrrG1L90gv6O97mnC182uhof/FoR3S5zscUBvqip5lfQ7fQe3ORozc7J7cFl79QooNTkALlwlwcS0KTDY1JoT/7XTO3KD6q7uzypQAZVTr2oWewnqpbCHDL9R63Ndc32DUmB+ZuZisg+g81kzbs/L2W3gJQ+xwJKGWAgct6sjkzHPbweXdrFeQcWUbWqavPD8cl/ODXylPYhEVN9CeGEgaMULy6H8cZCoqrI/X90pAD64mtWTVriB4BK5JSzuFBn2C0U5AcEBpLobdkVD+4mbWYFZvpocm2jLb/vGE/FV3zVIfulvPNcHbNDzOGjx3UHkPVM1ySaRdTL41znxqOM9sCAwEAATANBgkqhkiG9w0BAQsFAAOCAQEARN0zUC6F5hQu5bDxTcbbEAYH93HL8lTff8/wbvezacCiEuI3aEQQYCVLeprK2Xlif23X5/7NzKny/941j6K1c3hmRDLCFDCRsQpVsxydf93VQV0mpwwE8d9MYYhLgTdsCfFzcEQqXKHPpIRvEcMZIjdb8MoZU66Dy6BK5m6dgZdB9C2jO3mPihTuq2f3ls/8retxNQpsqPx359KNejmEhQxuexZygZJCw1TAEHfiVPKUd/loP5P7/YhnVxrqYrF9srAhxRLeSm22w5hOaUce75wQwmXPh9+Y5yAja5EU5zE9ZAJtUBAaptmp7o5lxwN91bXVrGatP/pWIk+OVNJ8IA==
4960ed34-ffef-4f93-af66-3be9cdd0336d	4c45f52b-b6ee-4d24-bdb6-c84793bcbf06	priority	100
ae9f5e9a-8604-441c-b9e9-0ef8392e59a5	4c45f52b-b6ee-4d24-bdb6-c84793bcbf06	privateKey	MIIEowIBAAKCAQEAmusbUv3SC/o73uacLXza6Gh/8WhHdLnOxxQG+qKnmV9Dt9B7c5GjNzsntwWXv1Cig1OQAuXCXBxLQpMNjUmhP/tdM7coPqru7PKlABlVOvahZ7CeqlsIcMv1Hrc11zfYNSYH5m5mKyD6DzWTNuz8vZbeAlD7HAkoZYCBy3qyOTMc9vB5d2sV5BxZRtapq88PxyX84NfKU9iERU30J4YSBoxQvLofxxkKiqsj9f3SkAPria1ZNWuIHgErklLO4UGfYLRTkBwQGkuht2RUP7iZtZgVm+mhybaMtv+8YT8VXfNUh+6W881wds0PM4aPHdQeQ9UzXJJpF1MvjXOfGo4z2wIDAQABAoIBAEmLI0WayYR2HsYKpEnT4/hA47wuzP1U2B0aHNYPMZFV8Efq6TBMCzfFFW2FciyYkw3VNaCqgkJIDFJmjSBtu+cr5WsPoENf0l0aM8qAPD3pp2YaKrikzrT9njgesaiiEjno/AcgkdAXr55YyLJifvliDbL7zrnYfxzwjK2UaddM9scHpS8UJP93enujwQwqFe1yYVztIwExaUyvhk/fzPiCBsur+f+vu0Bppa001a25E3Lg0e5ZpBoWfsEwvV4s0gSKVJ/ZcZfMKyyN9I3UVwf8nbMWBHeMFq7MAcYQV+FKlB9e49xeEkP5PW4VCdJlwsUKig87KvKyJLvJ0fme7IECgYEA2NNnwXDqxf7yznF/kepC8sJuwnvocIdcg+sUngV3WgKhla6fsDra5ypEPp/TAdZHq79y7COkgZNQI9eo89A10/zD6fCivl55Y/fhOLsQX5Yy5MBlne4yTtTU/j4yLd0t8UFls0UVk0el+i88U/lih9GTMLyiZz/y6ZMk+xmB+AMCgYEAtuhebGapv9YuyttpKBTsiEECrN9ijE00fjqN9wS23btAo+ctSAWMDYVbMcVT7us/TOw5umwxpQWRjt+6Y90GZSZ8rf+6ec/Z2kcr8Z8L2UGHgW6Ku6pnwNrWi7JWcxukGcwBp58qzwO+eNDLDf1pcs+fS0hpLRtmIvmYUbFCKUkCgYAnDmWJHarcgWEBOMaO5RCsI8PJuoITCv7qMEUldbya9RBgIvVWzDM0IpPqZ+WdVhjQ4gp0aLMwN/XejvE7Ac1AYy5zDEp0WhYpoLPsAR4g6bA/LjzfptFfC81WAqQNSOMGqw4DrbUGM4i9ORb31VsfNev6gnAKgyVhV4T4yg50OwKBgQCdlT9cp2qSQ6aW0Ugc50IN9eynIeJWvGGAa1RKQL6H9D8xtwdVKKpML9us2rSAgB9OV6s4yORQp6aLcIe2aAONfAYpJszzC7dGjtD2X6+mowVq5uER5DN1fVUgkCpZC7RrIU8/qisIpdIhZsm6qNyDtQspoh4zZYqukVnA8DXvOQKBgByFoeG2BRWLvNMXba1ckMwMQDlM4zs1FE4FZP0wuV3PGZKOsDxuVco5su0tDVVmERbM0zMcY4cW+2wSBowM/1mKrGpLm0J+1SImfjZFSp9VN/p3dRMkDFdRAF9nXxzsZ8GGRkTOa/z3JmVPl0jVxm4JBdhGLtLyDlr7jhbE2gPa
e8648260-810f-4726-b011-44fe8cba09a6	4c45f52b-b6ee-4d24-bdb6-c84793bcbf06	keyUse	SIG
18ec1a2e-1df4-4a23-9a97-116e0e181c37	d0e55477-0625-4967-91ec-9450bda31325	kid	5eae64cf-15ca-49cf-a4b5-a5f400b0bbe6
8ccbb275-c307-4dab-926f-5c6b632efa72	d0e55477-0625-4967-91ec-9450bda31325	secret	NUxpWuPp4XM_tYcKJ7qkZg
daeef0df-a400-4725-bcec-d6c88f916cd7	d0e55477-0625-4967-91ec-9450bda31325	priority	100
e63eaedd-aa09-46c1-bd9a-2ff18167acff	610ab409-b27d-448b-88ea-c3bbea55862e	kid	dcb5a1a9-c0a6-4fd7-aa2f-af0e46504113
47314213-320c-4448-8b56-e9710a6351d6	610ab409-b27d-448b-88ea-c3bbea55862e	algorithm	HS512
539bf89f-2eee-4171-98b0-3c0a749481e8	610ab409-b27d-448b-88ea-c3bbea55862e	priority	100
4452f6a2-799e-425d-b0c1-28aa4c159e11	610ab409-b27d-448b-88ea-c3bbea55862e	secret	BCPH7vEiw417Fv8hvP3xQj0cziETuX6UG6FNhdGJ2rH3zLzNgyRqJn4ylUIKnDIVKtwySU3-HgiRr0ORs_bL3KtfBfV0m3_1TqspkZ1NijS8692N1tHaOsCFUEQR7O15DtgpB426a9yJ9GA8j2aCahsSmGVrSfdimfc726XmL5o
a6292a1a-4f12-412a-bf7c-11b06eeb9bc2	4d507ad8-5f6e-49e8-8691-ffcfacd435fe	host-sending-registration-request-must-match	true
6e9ad0a2-9903-48a8-971c-66ebd6849c1f	d9a0d751-3913-4221-8ab9-48420f813908	allowed-protocol-mapper-types	saml-user-attribute-mapper
3b34878d-5b57-42a0-a8c6-f57202f6cc20	d9a0d751-3913-4221-8ab9-48420f813908	allowed-protocol-mapper-types	oidc-usermodel-property-mapper
575e78c4-de9a-45e5-8edf-f2786f4f93de	d9a0d751-3913-4221-8ab9-48420f813908	allowed-protocol-mapper-types	oidc-full-name-mapper
6faa0973-ab19-493e-aa2f-fbcf8b349da9	d9a0d751-3913-4221-8ab9-48420f813908	allowed-protocol-mapper-types	oidc-sha256-pairwise-sub-mapper
a2034aa7-e691-411c-9152-fc6db096a670	d9a0d751-3913-4221-8ab9-48420f813908	allowed-protocol-mapper-types	oidc-address-mapper
e62b94e0-28f3-4e1e-a670-023ea3c6e687	d9a0d751-3913-4221-8ab9-48420f813908	allowed-protocol-mapper-types	saml-user-property-mapper
94ce5394-31bb-406e-9169-37f8d518f18f	d9a0d751-3913-4221-8ab9-48420f813908	allowed-protocol-mapper-types	saml-role-list-mapper
efdcd4f4-151a-4a59-84c4-0bb93cb9f86e	d9a0d751-3913-4221-8ab9-48420f813908	allowed-protocol-mapper-types	oidc-usermodel-attribute-mapper
aea1dd48-a0fe-426e-9345-f27bde7efaf4	99414f2c-2a79-4e97-90b2-dc743967099f	allowed-protocol-mapper-types	saml-role-list-mapper
014697f4-8b5f-4c61-aeb6-562cb5486e69	99414f2c-2a79-4e97-90b2-dc743967099f	allowed-protocol-mapper-types	oidc-usermodel-attribute-mapper
6fe1cb28-99ab-4fae-adda-c98bdc4e4217	99414f2c-2a79-4e97-90b2-dc743967099f	allowed-protocol-mapper-types	oidc-usermodel-property-mapper
a6bf9f6e-01b2-4872-89b1-9ef601aa8ff9	99414f2c-2a79-4e97-90b2-dc743967099f	allowed-protocol-mapper-types	oidc-sha256-pairwise-sub-mapper
0444d79e-b48e-4940-9d2b-66f5a1efb0f9	99414f2c-2a79-4e97-90b2-dc743967099f	allowed-protocol-mapper-types	saml-user-attribute-mapper
920f32d1-5406-48c3-b2a2-85849eb59f6a	99414f2c-2a79-4e97-90b2-dc743967099f	allowed-protocol-mapper-types	oidc-address-mapper
fbbf3b17-a0d8-49ee-9872-89b246419f85	99414f2c-2a79-4e97-90b2-dc743967099f	allowed-protocol-mapper-types	oidc-full-name-mapper
31f46ae6-213d-417a-869a-ee360773575b	99414f2c-2a79-4e97-90b2-dc743967099f	allowed-protocol-mapper-types	saml-user-property-mapper
8b35bbdf-b567-4306-ab0b-363fe53c3a5e	a11b4c24-a16a-4efe-9511-a607f6218dab	max-clients	200
f2b2c0ae-d2a2-4887-a7a5-5b80b2036a0a	d0107c04-883b-41de-9dc4-1da82cbbaf7b	allow-default-scopes	true
17c0c7a6-2e06-4ddf-80dc-0d23b0a4f65a	a1d8ffaa-cd79-4654-8f9a-d008e1e4f156	allow-default-scopes	true
2135d1ab-a4e8-494d-bd86-5ee7f46744b5	ad28d10a-3ce4-4065-bacc-30b73110370f	cachePolicy	DEFAULT
772e4779-4ddb-42e9-b3d1-88e10c307ba0	ad28d10a-3ce4-4065-bacc-30b73110370f	enabled	true
8084b1d1-ef7f-40e9-82f9-f94ade6db6f1	ad28d10a-3ce4-4065-bacc-30b73110370f	apiUrl	https://2175a2470d67.ngrok-free.app/api/federation/validate
\.


--
-- TOC entry 4623 (class 0 OID 20413)
-- Dependencies: 232
-- Data for Name: composite_role; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.composite_role (composite, child_role) FROM stdin;
cd6344cb-fbb5-436b-8a77-dd60fbe40c27	efb884b0-ef69-4e16-8491-1fad00b44878
cd6344cb-fbb5-436b-8a77-dd60fbe40c27	63cc1358-5792-45ac-b816-244a4e18bf09
cd6344cb-fbb5-436b-8a77-dd60fbe40c27	1f1ddf50-19de-4bc1-9783-3c318b4df5b2
cd6344cb-fbb5-436b-8a77-dd60fbe40c27	b2ce55fe-e9f2-4496-ba1c-9080c1f7f012
cd6344cb-fbb5-436b-8a77-dd60fbe40c27	ffa6bbc7-13aa-40d1-a871-bee63832b195
cd6344cb-fbb5-436b-8a77-dd60fbe40c27	0e8fd425-209a-4ad3-980e-a6d31917d9d7
cd6344cb-fbb5-436b-8a77-dd60fbe40c27	46cbdb19-2cf3-42c3-91de-8cd3f97e9411
cd6344cb-fbb5-436b-8a77-dd60fbe40c27	d28b5214-51d1-443e-8e63-ecf2e5cef7f3
cd6344cb-fbb5-436b-8a77-dd60fbe40c27	9631bb48-25e2-42bb-bc6b-1f47b9b08d5d
cd6344cb-fbb5-436b-8a77-dd60fbe40c27	2394a878-9bdf-428b-8e4f-f5d231362dcb
cd6344cb-fbb5-436b-8a77-dd60fbe40c27	881b2475-727c-4faa-9634-13a7d62f648c
cd6344cb-fbb5-436b-8a77-dd60fbe40c27	8a99120d-cdda-4113-b75d-49ea84b9e7d7
cd6344cb-fbb5-436b-8a77-dd60fbe40c27	8db5dac6-ab76-4c0a-8762-e6591ae394c7
cd6344cb-fbb5-436b-8a77-dd60fbe40c27	cce740bd-352a-4cbb-990c-f24ffeb5c830
cd6344cb-fbb5-436b-8a77-dd60fbe40c27	918f0c5f-52da-4da8-83e8-b97f8eea053e
cd6344cb-fbb5-436b-8a77-dd60fbe40c27	92fd977f-0530-454a-9128-5e56f4399c70
cd6344cb-fbb5-436b-8a77-dd60fbe40c27	e65c88a2-16cb-4cfa-a0ee-2455305867c3
cd6344cb-fbb5-436b-8a77-dd60fbe40c27	30284747-d0b6-4322-81ac-af69cf433daf
6a3d63b8-8120-496e-a754-46e48e6a77b6	313bbcd7-d573-4f88-aa58-c217dbd310a8
b2ce55fe-e9f2-4496-ba1c-9080c1f7f012	30284747-d0b6-4322-81ac-af69cf433daf
b2ce55fe-e9f2-4496-ba1c-9080c1f7f012	918f0c5f-52da-4da8-83e8-b97f8eea053e
ffa6bbc7-13aa-40d1-a871-bee63832b195	92fd977f-0530-454a-9128-5e56f4399c70
6a3d63b8-8120-496e-a754-46e48e6a77b6	adb5fe1e-3a1e-4828-9e5e-de17410695de
adb5fe1e-3a1e-4828-9e5e-de17410695de	794f997f-e057-4ba2-9f60-879574231ddc
8a05a143-0b30-4c35-9db1-df98c612e697	b612d24d-48a7-4b8f-9728-1d789e5dcdae
cd6344cb-fbb5-436b-8a77-dd60fbe40c27	385fb1af-9ba3-474d-9708-0e1f77d412f8
6a3d63b8-8120-496e-a754-46e48e6a77b6	a62273e8-ab4b-48fc-8f92-428f5d748452
6a3d63b8-8120-496e-a754-46e48e6a77b6	d30c30e5-1581-467a-952a-190182bd8904
cd6344cb-fbb5-436b-8a77-dd60fbe40c27	23fd4323-8cc4-4b20-98f7-21010c9d5a8b
cd6344cb-fbb5-436b-8a77-dd60fbe40c27	2c5ad8df-06c8-41e5-b1e9-37e5827e3365
cd6344cb-fbb5-436b-8a77-dd60fbe40c27	a8d8fa2f-7e95-4f0d-bb26-6a8503b6621d
cd6344cb-fbb5-436b-8a77-dd60fbe40c27	e2039cd6-3211-44cc-a391-d5c8c9f329c3
cd6344cb-fbb5-436b-8a77-dd60fbe40c27	b4ac9d89-455b-42af-89b8-462e2eca973d
cd6344cb-fbb5-436b-8a77-dd60fbe40c27	91bbab83-b906-43c5-a7f1-dbfbc7ce62d5
cd6344cb-fbb5-436b-8a77-dd60fbe40c27	2d20ce51-760b-4157-bd8c-2d1c8e9aa3c1
cd6344cb-fbb5-436b-8a77-dd60fbe40c27	d9f7a05a-a6a5-4dff-8506-17dd0799cfa1
cd6344cb-fbb5-436b-8a77-dd60fbe40c27	b9cd6ebe-b6e9-4c25-81dc-32b8b2af0ed3
cd6344cb-fbb5-436b-8a77-dd60fbe40c27	9fcaeb3a-4545-435c-a2a6-99ee0a39411b
cd6344cb-fbb5-436b-8a77-dd60fbe40c27	cc9afc7f-f949-472e-929e-4be48690d022
cd6344cb-fbb5-436b-8a77-dd60fbe40c27	50fee5fb-d0a6-4f50-a3d0-ba67e975bdbb
cd6344cb-fbb5-436b-8a77-dd60fbe40c27	7554fb21-5876-456f-8be2-4cac91beda09
cd6344cb-fbb5-436b-8a77-dd60fbe40c27	17717551-af2f-4b9e-9caf-a8c614c1e671
cd6344cb-fbb5-436b-8a77-dd60fbe40c27	71ed90ec-a4e8-4547-9d91-38604e515414
cd6344cb-fbb5-436b-8a77-dd60fbe40c27	26c331f3-c0cc-4253-ad87-eded7097ddc9
cd6344cb-fbb5-436b-8a77-dd60fbe40c27	9f0d8fc2-bc32-4793-9b6a-f7a067770ca1
a8d8fa2f-7e95-4f0d-bb26-6a8503b6621d	17717551-af2f-4b9e-9caf-a8c614c1e671
a8d8fa2f-7e95-4f0d-bb26-6a8503b6621d	9f0d8fc2-bc32-4793-9b6a-f7a067770ca1
e2039cd6-3211-44cc-a391-d5c8c9f329c3	71ed90ec-a4e8-4547-9d91-38604e515414
018886e3-9ff8-4651-a714-28cfd2f964de	8a5437dc-620a-424d-93ad-7a41346dc385
018886e3-9ff8-4651-a714-28cfd2f964de	3996470f-df14-4291-b206-62694af0ab39
018886e3-9ff8-4651-a714-28cfd2f964de	3f459fb1-203d-4d56-915a-234bbd27e483
018886e3-9ff8-4651-a714-28cfd2f964de	3af56b88-35bf-417b-a6ef-724254c00816
018886e3-9ff8-4651-a714-28cfd2f964de	acb62ce9-59f0-4b29-87f1-dc31aafd2d6b
018886e3-9ff8-4651-a714-28cfd2f964de	63abec50-6a86-4c7d-95b8-d91990b9ff45
018886e3-9ff8-4651-a714-28cfd2f964de	da09e718-2f43-4702-9889-e50063a38c04
018886e3-9ff8-4651-a714-28cfd2f964de	325eb064-a63c-4292-b6c7-e3caf7e11e56
018886e3-9ff8-4651-a714-28cfd2f964de	60eeb573-adcd-4a2d-bc3e-316133266861
018886e3-9ff8-4651-a714-28cfd2f964de	41e7c022-b0fd-412d-9f94-3e8c8e776f9b
018886e3-9ff8-4651-a714-28cfd2f964de	4db5fd0a-168c-404c-9ef4-6cd563eb9892
018886e3-9ff8-4651-a714-28cfd2f964de	720e76e6-c357-40b1-9052-02900f96e428
018886e3-9ff8-4651-a714-28cfd2f964de	d5a4d17b-ddb7-4422-ae14-76069490b4f3
018886e3-9ff8-4651-a714-28cfd2f964de	4ad45ead-c31f-41f6-9647-b4aa9b44fe98
018886e3-9ff8-4651-a714-28cfd2f964de	0566f538-35d9-4d4f-9e09-7f2df4c65970
018886e3-9ff8-4651-a714-28cfd2f964de	d5573143-64e2-4089-8889-e1e9abd17bc9
018886e3-9ff8-4651-a714-28cfd2f964de	13efbea1-a8ad-4792-b840-2ed6db8c2888
38b8a18d-3182-4cab-84a5-3e0060de74ef	ae76fc70-e837-410f-8ff2-21ff45afe23b
3af56b88-35bf-417b-a6ef-724254c00816	0566f538-35d9-4d4f-9e09-7f2df4c65970
3f459fb1-203d-4d56-915a-234bbd27e483	4ad45ead-c31f-41f6-9647-b4aa9b44fe98
3f459fb1-203d-4d56-915a-234bbd27e483	13efbea1-a8ad-4792-b840-2ed6db8c2888
38b8a18d-3182-4cab-84a5-3e0060de74ef	079a673e-5870-4eda-a663-f54f338c89b6
079a673e-5870-4eda-a663-f54f338c89b6	8bdf34d4-1e2d-47a4-a6e9-f349c17d4807
1d285d5d-72d1-4c3d-b32c-f4c9ab5e336a	8b213433-8154-4229-85da-87b508eef114
cd6344cb-fbb5-436b-8a77-dd60fbe40c27	f61cea99-1cbe-47ce-836b-00025542815a
018886e3-9ff8-4651-a714-28cfd2f964de	6aed831c-66eb-4b8d-80ad-88f26a6d6bfd
38b8a18d-3182-4cab-84a5-3e0060de74ef	0ab555c5-a077-43c6-9169-8dcc41722a69
38b8a18d-3182-4cab-84a5-3e0060de74ef	65e12f51-4a3a-4eac-b3fd-3bbbab68c708
99adcfe6-bbd5-437a-9675-ab228482f3eb	079a673e-5870-4eda-a663-f54f338c89b6
99adcfe6-bbd5-437a-9675-ab228482f3eb	0ab555c5-a077-43c6-9169-8dcc41722a69
99adcfe6-bbd5-437a-9675-ab228482f3eb	65e12f51-4a3a-4eac-b3fd-3bbbab68c708
99adcfe6-bbd5-437a-9675-ab228482f3eb	ae76fc70-e837-410f-8ff2-21ff45afe23b
cd6344cb-fbb5-436b-8a77-dd60fbe40c27	a7d43235-5a80-4c78-8274-0f662f24b6e1
cd6344cb-fbb5-436b-8a77-dd60fbe40c27	966d148e-8578-4a28-a84b-b0c95909701d
cd6344cb-fbb5-436b-8a77-dd60fbe40c27	42aaf434-492c-4484-a722-04fbcb7f99b8
cd6344cb-fbb5-436b-8a77-dd60fbe40c27	0bce5b06-322c-4a28-9f42-db928e7c01fd
cd6344cb-fbb5-436b-8a77-dd60fbe40c27	be3f8208-3f7e-4e47-b3c5-b3d957d5d54b
cd6344cb-fbb5-436b-8a77-dd60fbe40c27	5150bf9d-aec9-4772-b46b-d5641711740b
cd6344cb-fbb5-436b-8a77-dd60fbe40c27	77fccd5b-c255-4b06-80bf-9e2898995cec
cd6344cb-fbb5-436b-8a77-dd60fbe40c27	f27ffedf-44c9-4be0-b57d-e7bb974e6a07
cd6344cb-fbb5-436b-8a77-dd60fbe40c27	600022eb-409c-4b70-8f99-430b5ef7e8e5
cd6344cb-fbb5-436b-8a77-dd60fbe40c27	fa0f090f-733e-4427-b0ba-6e0ab3ced058
cd6344cb-fbb5-436b-8a77-dd60fbe40c27	a3c44f70-cc34-4799-990d-8cbac90fe1c4
cd6344cb-fbb5-436b-8a77-dd60fbe40c27	ae4baccf-a3b0-4932-a201-9a5e24fd78a2
cd6344cb-fbb5-436b-8a77-dd60fbe40c27	7efed7f4-bd9f-43c2-b12a-c564e675315c
cd6344cb-fbb5-436b-8a77-dd60fbe40c27	ccd3df8e-9598-46ce-89e4-2571d3d3bd3f
cd6344cb-fbb5-436b-8a77-dd60fbe40c27	50b162dc-cdab-4098-8bec-0e62d7d8ffc4
cd6344cb-fbb5-436b-8a77-dd60fbe40c27	914bf0ef-9404-4d10-9dff-874f90a1ca45
cd6344cb-fbb5-436b-8a77-dd60fbe40c27	5d6f6c28-b22e-4200-a896-365808bbcf54
0bce5b06-322c-4a28-9f42-db928e7c01fd	50b162dc-cdab-4098-8bec-0e62d7d8ffc4
42aaf434-492c-4484-a722-04fbcb7f99b8	5d6f6c28-b22e-4200-a896-365808bbcf54
42aaf434-492c-4484-a722-04fbcb7f99b8	ccd3df8e-9598-46ce-89e4-2571d3d3bd3f
ef9e3db7-3c79-4ee0-949b-3d255574f08f	c3faf0b6-04e8-469f-ba05-651052bf8c47
ef9e3db7-3c79-4ee0-949b-3d255574f08f	53dffe38-3cf2-46a3-a483-4e4fd9c4da9d
ef9e3db7-3c79-4ee0-949b-3d255574f08f	d009c625-940d-48d0-95c4-2954cf5426f3
ef9e3db7-3c79-4ee0-949b-3d255574f08f	9b8dca3e-72a4-40ad-bbe2-28a741d64a2e
ef9e3db7-3c79-4ee0-949b-3d255574f08f	f2568f24-0a1a-4e5d-a79b-1727939ecbc3
ef9e3db7-3c79-4ee0-949b-3d255574f08f	25d27a37-f113-4b31-b5af-f67951583820
ef9e3db7-3c79-4ee0-949b-3d255574f08f	0ae3f80d-98d8-47cc-ad6d-47875bbdacc9
ef9e3db7-3c79-4ee0-949b-3d255574f08f	460b3184-0b34-4d71-87d5-a5b0cfa8a1e0
ef9e3db7-3c79-4ee0-949b-3d255574f08f	63da58b8-07f1-458c-8f24-9711b09cac73
ef9e3db7-3c79-4ee0-949b-3d255574f08f	85e071e7-7395-49fd-a94a-32dd1660d8df
ef9e3db7-3c79-4ee0-949b-3d255574f08f	ff4c4d2a-01da-4e23-8822-95323e7c2c6b
ef9e3db7-3c79-4ee0-949b-3d255574f08f	0451e462-a764-47b5-b2d2-ed2b9267863b
ef9e3db7-3c79-4ee0-949b-3d255574f08f	45736706-b6f1-40b7-b2e5-e99b9476a9b4
ef9e3db7-3c79-4ee0-949b-3d255574f08f	ab499563-de2d-4dc1-8a0f-4cc821226028
ef9e3db7-3c79-4ee0-949b-3d255574f08f	da490c21-bad2-49b1-9c69-228dd623f86d
ef9e3db7-3c79-4ee0-949b-3d255574f08f	9fe3779c-bd24-4544-911e-7d708f3030bf
ef9e3db7-3c79-4ee0-949b-3d255574f08f	3a6c5ab2-83a0-4375-8839-c69eeb433abd
0ab4a22c-a6b0-4ecd-bce5-12ae08d53d94	962d2f24-c2f1-4bde-81f1-867d4cb96840
9b8dca3e-72a4-40ad-bbe2-28a741d64a2e	da490c21-bad2-49b1-9c69-228dd623f86d
d009c625-940d-48d0-95c4-2954cf5426f3	ab499563-de2d-4dc1-8a0f-4cc821226028
d009c625-940d-48d0-95c4-2954cf5426f3	3a6c5ab2-83a0-4375-8839-c69eeb433abd
0ab4a22c-a6b0-4ecd-bce5-12ae08d53d94	8b91fbd6-3c22-46ed-87b0-dac8523d9f55
8b91fbd6-3c22-46ed-87b0-dac8523d9f55	85c263f6-1e22-48e5-a950-c3cd75cb119b
b4ead508-9f30-4624-a5b5-a8615c4a7df9	d52f7491-beb2-40b1-a2ee-a25c26bc7fb8
cd6344cb-fbb5-436b-8a77-dd60fbe40c27	08accca9-a5e2-42a0-8ac9-52afe9b41d19
ef9e3db7-3c79-4ee0-949b-3d255574f08f	dba28f75-4b8c-44dd-8b15-c8179bd26cfe
0ab4a22c-a6b0-4ecd-bce5-12ae08d53d94	b62b33ed-2537-4b0e-be48-ddb885f95d26
0ab4a22c-a6b0-4ecd-bce5-12ae08d53d94	cecb45c6-f63c-4aa3-9c8a-2438000e3206
\.


--
-- TOC entry 4624 (class 0 OID 20416)
-- Dependencies: 233
-- Data for Name: credential; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.credential (id, salt, type, user_id, created_date, user_label, secret_data, credential_data, priority, version) FROM stdin;
a322fb46-59b3-4ebe-bad9-13bdd0fdfdc4	\N	password	8d9ec690-d72f-4ac0-beea-42d640575100	1746203878338	\N	{"value":"Ny71fzGPqDcMmDIQSloYeaojZFtnfHEyvmeKo15SFNs=","salt":"oyTOGU1BgNjJ9/XffKPvPw==","additionalParameters":{}}	{"hashIterations":5,"algorithm":"argon2","additionalParameters":{"hashLength":["32"],"memory":["7168"],"type":["id"],"version":["1.3"],"parallelism":["1"]}}	10	0
1ba001ff-3813-464f-8c48-f0c8d0ca4bbb	\N	password	5ee2f9d0-3998-48d1-a9d7-5a13f584cd80	1747648272453	My password	{"value":"hLbukoAMagLWlBniY1x0fvmNYGl9vXd3sAPP7vLYNuQ=","salt":"pi279hQjJBg55RwA4JoH2w==","additionalParameters":{}}	{"hashIterations":5,"algorithm":"argon2","additionalParameters":{"hashLength":["32"],"memory":["7168"],"type":["id"],"version":["1.3"],"parallelism":["1"]}}	10	0
7cceedcd-7fc6-4d4a-9b12-01387f6531a4	\N	password	e92db568-6bac-4fc2-8d86-49a1189e500c	1747215968490	My password	{"value":"SeXoYpvTdU3uEQpXS7B+XwVboupHtKso1b/OIcPxmpY=","salt":"ld5SeKVct27aQKd5SfeXpA==","additionalParameters":{}}	{"hashIterations":5,"algorithm":"argon2","additionalParameters":{"hashLength":["32"],"memory":["7168"],"type":["id"],"version":["1.3"],"parallelism":["1"]}}	10	0
5244076d-2a57-4dd9-826c-9789bbbf8505	\N	password	3a1c49bd-501b-4680-99e6-9676ece145f2	1746719549622	\N	{"value":"UiwKJY6F7qz4IA0CgbiJ5BuvnTx55y5UdoX77k40+7Y=","salt":"0gV2Xdxc/nyDqGRv40BA9g==","additionalParameters":{}}	{"hashIterations":5,"algorithm":"argon2","additionalParameters":{"hashLength":["32"],"memory":["7168"],"type":["id"],"version":["1.3"],"parallelism":["1"]}}	10	0
7c929cc6-d051-4da3-90cf-9ecce2d80edb	\N	password	c121b1ce-58e7-45fe-8ad1-b55ebe88ea96	1746719915416	My password	{"value":"odvy/RIjxvqq11TgVjDx30g/XntuGtqAnimoiZ/2vzI=","salt":"EC0rsjNfBB8zf0tGWXLzZA==","additionalParameters":{}}	{"hashIterations":5,"algorithm":"argon2","additionalParameters":{"hashLength":["32"],"memory":["7168"],"type":["id"],"version":["1.3"],"parallelism":["1"]}}	10	0
60d7b289-eb28-4a55-a7c1-1b268ea2d3c1	\N	password	0db3e4c1-2406-450d-9892-0de23888555e	1747664693547	My password	{"value":"mtG8hooftGRIWJYW9xoIMwTYbT1i2GjFqVSNFm+OsyM=","salt":"QB37IyXvBQeP13FbNr95hQ==","additionalParameters":{}}	{"hashIterations":5,"algorithm":"argon2","additionalParameters":{"hashLength":["32"],"memory":["7168"],"type":["id"],"version":["1.3"],"parallelism":["1"]}}	10	0
55677bec-d5ef-441f-b3a5-82bd5a5f5954	\N	password	7fe7978e-ea45-4673-90c8-fff2f50a8c5d	1747664758041	My password	{"value":"RKtYq1+nuG3u5Y3kD/EMqwFUuciOlcFi00wWd2z5T68=","salt":"vwCqqJgwqjJCq/ZlpCXXVw==","additionalParameters":{}}	{"hashIterations":5,"algorithm":"argon2","additionalParameters":{"hashLength":["32"],"memory":["7168"],"type":["id"],"version":["1.3"],"parallelism":["1"]}}	10	0
a86860b6-a059-4b42-aceb-5802458ae5c4	\N	password	04543a1f-6955-43da-9361-e113adf8ba99	1747664768009	My password	{"value":"baUBgWDJub2XuZvGi91Vru82w8Wa6TW/yUsc6COtkHY=","salt":"N9bsqbvhop7VkGSkSy5y+w==","additionalParameters":{}}	{"hashIterations":5,"algorithm":"argon2","additionalParameters":{"hashLength":["32"],"memory":["7168"],"type":["id"],"version":["1.3"],"parallelism":["1"]}}	10	0
c143ca6c-44ff-4815-847b-58254c4f4af8	\N	password	b4941c21-d7ca-4eba-9260-ff4c80ae695a	1747664780313	My password	{"value":"TG812QEXB53bRYcjdD+WiwSUEjO0plS5R5Zkb5wRwTg=","salt":"m0P/yLEzCUzaoeATCdtpBg==","additionalParameters":{}}	{"hashIterations":5,"algorithm":"argon2","additionalParameters":{"hashLength":["32"],"memory":["7168"],"type":["id"],"version":["1.3"],"parallelism":["1"]}}	10	0
a07e1a8c-7a1c-48db-8549-dd9d083a5279	\N	password	04a67026-cdd5-482a-8952-d7296978de92	1747664797034	My password	{"value":"a3bmy5/azLH8JK0nJa+0Px8+PbkiGjt6tKlNzcVZ7BM=","salt":"OqM3Lwgcz4xjTQh9g8PKCQ==","additionalParameters":{}}	{"hashIterations":5,"algorithm":"argon2","additionalParameters":{"hashLength":["32"],"memory":["7168"],"type":["id"],"version":["1.3"],"parallelism":["1"]}}	10	0
69d7c05f-a8f4-46fb-a225-aa46fa463d99	\N	password	8eac955d-b612-4869-85d9-14f1c1c89ddd	1747664852501	My password	{"value":"19DNTSuWpKmmoFo4rMza78WkUFEHYTHnnQ59UZM2MeA=","salt":"8bgKwRadmODl94vc3EgN7A==","additionalParameters":{}}	{"hashIterations":5,"algorithm":"argon2","additionalParameters":{"hashLength":["32"],"memory":["7168"],"type":["id"],"version":["1.3"],"parallelism":["1"]}}	10	0
f81c2f5e-bfad-4434-a4e9-9cfa7c9edc04	\N	password	cd7ccf85-b3b3-4580-9403-444d5b099e43	1747664867375	My password	{"value":"SeUyZYdo3djO48Tb5yOVYWJW8fFtpSsrKmUaD2ILpNg=","salt":"Fx8g5qGFEYasdTtncISvjA==","additionalParameters":{}}	{"hashIterations":5,"algorithm":"argon2","additionalParameters":{"hashLength":["32"],"memory":["7168"],"type":["id"],"version":["1.3"],"parallelism":["1"]}}	10	0
d0818a95-612d-40c0-85b0-1aeca0262de5	\N	password	6799aaad-e948-460e-a6da-e7a2cde36688	1747664632849	My password	{"value":"MHjPRaLZ5IzPqk6XNuKtT2Xp2dcPTjG9zWp+5QGSLSs=","salt":"HoMGQkU4vrz9B9pum7NeCw==","additionalParameters":{}}	{"hashIterations":5,"algorithm":"argon2","additionalParameters":{"hashLength":["32"],"memory":["7168"],"type":["id"],"version":["1.3"],"parallelism":["1"]}}	10	0
b1a08311-1ef5-4e81-ab28-f23b85d04610	\N	password	72716858-9b45-42ec-9292-dc24c877f931	1747664675448	My password	{"value":"2tgk7mDHo5lLtxSZms8w1SMf7VXE0vM/dVee08jqhnE=","salt":"j/HQrLaZ/vhFpiBzDzWUOw==","additionalParameters":{}}	{"hashIterations":5,"algorithm":"argon2","additionalParameters":{"hashLength":["32"],"memory":["7168"],"type":["id"],"version":["1.3"],"parallelism":["1"]}}	10	0
98bceacd-fa94-42a1-aee3-13e93cfe0dd6	\N	password	f73dfa67-b6a0-4645-ba55-6123061b7e94	1747664725232	My password	{"value":"kFQ3p+VQPQPX7Z+rbwX5+uu2jliP+3O30u6dQNgS1i8=","salt":"PGDFjd3VhYS35dDN4PvcFg==","additionalParameters":{}}	{"hashIterations":5,"algorithm":"argon2","additionalParameters":{"hashLength":["32"],"memory":["7168"],"type":["id"],"version":["1.3"],"parallelism":["1"]}}	10	0
69442568-44fa-44ce-998b-129ed0fa8508	\N	password	26c81ec3-f96b-4d3a-a828-7dfd8b02fce0	1747664703963	My password	{"value":"0g/p3DMrg3KeQLEz3jZOfIMjVWthySrpaJJ4muxNEaw=","salt":"9AVIA05W/TV7HOjvNmJq8g==","additionalParameters":{}}	{"hashIterations":5,"algorithm":"argon2","additionalParameters":{"hashLength":["32"],"memory":["7168"],"type":["id"],"version":["1.3"],"parallelism":["1"]}}	10	0
bd7c0856-f953-4865-a5d7-0113bc374514	\N	password	57ca4c58-2582-440b-9232-e13d009d4c7e	1747664906987	My password	{"value":"V6MiYB480nOhttHeXEXWkPmVGTEJakSOMDZCRcfO9as=","salt":"tUAMkRNqsWlrzVlK/FlUnA==","additionalParameters":{}}	{"hashIterations":5,"algorithm":"argon2","additionalParameters":{"hashLength":["32"],"memory":["7168"],"type":["id"],"version":["1.3"],"parallelism":["1"]}}	10	0
4c8b9857-d492-428a-95b6-0786fdd21afd	\N	password	ed1ecc24-0dd6-45b8-a6b0-aec6fe606d6a	1747664714647	My password	{"value":"bybZP0ZOkwu2ebRtAzkuJc1dpQekCYq4f/4hccXWDag=","salt":"n6wOlvFTqvf78LZ3bwPt7Q==","additionalParameters":{}}	{"hashIterations":5,"algorithm":"argon2","additionalParameters":{"hashLength":["32"],"memory":["7168"],"type":["id"],"version":["1.3"],"parallelism":["1"]}}	10	0
c5c8d8f3-2302-4852-ba59-61099b0b91a7	\N	password	ca6de359-b616-4b39-a5f9-af5e125a0a5a	1747664748681	My password	{"value":"LCfqDJKWRLgf0RrmJ0gDKPjiqa4OyhMc5C/qMJ+sRCo=","salt":"k6xjw2nWq6Ol26884RYNHQ==","additionalParameters":{}}	{"hashIterations":5,"algorithm":"argon2","additionalParameters":{"hashLength":["32"],"memory":["7168"],"type":["id"],"version":["1.3"],"parallelism":["1"]}}	10	0
fdf63034-9d2b-4e40-820f-6b8c5621bfe6	\N	password	5c534c54-bc7f-4131-9ad4-68e91d6fa552	1747664919125	My password	{"value":"qKwHSdxUblRyXK0vBAl3Q+xtqeHwkFtz0i7vgjw+uCA=","salt":"ysdLmYLqsAK4RqXVlrww7A==","additionalParameters":{}}	{"hashIterations":5,"algorithm":"argon2","additionalParameters":{"hashLength":["32"],"memory":["7168"],"type":["id"],"version":["1.3"],"parallelism":["1"]}}	10	0
cc5fa68c-fb9a-4d21-8413-e33012b56dec	\N	password	53d093a8-bb85-4bdd-a2eb-edc0c5cfb853	1747664826211	My password	{"value":"VutTFqTSWSYcDq9tfXwnYQMr9apoYMryM6g0fMpk/l0=","salt":"hrCEpPU90UCr+p9g5Nr8MA==","additionalParameters":{}}	{"hashIterations":5,"algorithm":"argon2","additionalParameters":{"hashLength":["32"],"memory":["7168"],"type":["id"],"version":["1.3"],"parallelism":["1"]}}	10	0
5ed5ed44-4e02-43d5-9388-877996d6d252	\N	password	b667c709-6ff4-41a1-8bdb-c9a1ebbe369a	1747664893569	My password	{"value":"ZuEvAAjD6xZv9AFKcEjQmcTZED43O/zoEsLMvv+9R68=","salt":"QESFIDS+KW24HjX0F/HLKA==","additionalParameters":{}}	{"hashIterations":5,"algorithm":"argon2","additionalParameters":{"hashLength":["32"],"memory":["7168"],"type":["id"],"version":["1.3"],"parallelism":["1"]}}	10	0
b24b02e2-0f21-4cbd-a327-b6a43a881847	\N	password	a3fac73d-eb8c-46c6-bf54-9587a7dddb18	1747665557686	\N	{"value":"nJQRMueE1/5o6ch8txq/CA5N5JRom6kC+kwQOeuOncQ=","salt":"P011scYOY50rzICAm6XJbg==","additionalParameters":{}}	{"hashIterations":5,"algorithm":"argon2","additionalParameters":{"hashLength":["32"],"memory":["7168"],"type":["id"],"version":["1.3"],"parallelism":["1"]}}	10	0
74d00f5b-b4ed-4ea1-b8ac-d7787ddb0804	\N	password	2758f21b-fa5e-4335-b68a-5919703838b0	1747903847400	My password	{"value":"DP3DSpmJErj7q1SC1geFHkr6VQowLEVvfZ4DnfccEjI=","salt":"6QITL96+W/lvP7fVO7AFlg==","additionalParameters":{}}	{"hashIterations":5,"algorithm":"argon2","additionalParameters":{"hashLength":["32"],"memory":["7168"],"type":["id"],"version":["1.3"],"parallelism":["1"]}}	10	0
94830c18-0d99-43a6-8f32-251fca6821df	\N	password	190af348-0a88-45f2-af1f-7e26dbf988a2	1757507566761	\N	{"value":"nCB+XEuA4POHdG+sSCisVxOWko3veE6wCIrArg7jHlc=","salt":"Ghd35peu/TfchrCqSTLv5g==","additionalParameters":{}}	{"hashIterations":5,"algorithm":"argon2","additionalParameters":{"hashLength":["32"],"memory":["7168"],"type":["id"],"version":["1.3"],"parallelism":["1"]}}	10	0
2f6bf6f8-d42b-4559-bc83-02538c08a4b2	\N	password	a7c5d58a-c275-4518-bd11-65429d371f54	1753716020561	\N	{"value":"DQwL2FD10Or1Pu25pSrgcBRU1fOnemnNbuZ/Yk54WAI=","salt":"DjOTHIIhfHkHwVhwTwv/hQ==","additionalParameters":{}}	{"hashIterations":5,"algorithm":"argon2","additionalParameters":{"hashLength":["32"],"memory":["7168"],"type":["id"],"version":["1.3"],"parallelism":["1"]}}	10	0
b1995de0-f561-454e-ade4-b11f9f0f6524	\N	password	aeac7a1e-6a52-485a-be56-59f1b11e63b8	1753459755275	\N	{"value":"bRgz/zJquZ0j8dEg0ptGTAt1N2crUdwYeIVmFT/SIgU=","salt":"OjoJH1USA0O5CQ4c4GWWWg==","additionalParameters":{}}	{"hashIterations":5,"algorithm":"argon2","additionalParameters":{"hashLength":["32"],"memory":["7168"],"type":["id"],"version":["1.3"],"parallelism":["1"]}}	10	0
232d6c7f-0f28-45e6-8c87-3a567f146fe1	\N	password	25ac9f70-b14a-4b63-8b1e-1c7c58df2f3b	1756906588213	\N	{"value":"LEt3AS2Lbcw8u3nbpDr9KqTzCKTBOJ7S/D1rGHB4zGU=","salt":"Q8lNJwwlRvaJcAMdtvpW9Q==","additionalParameters":{}}	{"hashIterations":5,"algorithm":"argon2","additionalParameters":{"hashLength":["32"],"memory":["7168"],"type":["id"],"version":["1.3"],"parallelism":["1"]}}	10	0
7cd37f06-e27d-45ce-892f-9e126002f9f7	\N	password	5539052c-be47-4345-bfce-c67c6f3b82c5	1762266529888	\N	{"value":"wXt4fP7e93CtPM2F861nuijyPoOuXQzOx5ZDLC1LqqM=","salt":"96rELsz9Hsgqk8gQjc85Lg==","additionalParameters":{}}	{"hashIterations":5,"algorithm":"argon2","additionalParameters":{"hashLength":["32"],"memory":["7168"],"type":["id"],"version":["1.3"],"parallelism":["1"]}}	10	0
8f1badca-39c9-476d-b6f9-c1dfbfadf811	\N	password	1575de97-4d60-435e-bf1b-a0376b7acdc2	1762256856464	My password	{"value":"JAcAQUL1znn/hGBd8u++vNJ8XGqoEp4m6pc8NhTuUpU=","salt":"Js2YCz+COwQw4SaFCLb5jQ==","additionalParameters":{}}	{"hashIterations":5,"algorithm":"argon2","additionalParameters":{"hashLength":["32"],"memory":["7168"],"type":["id"],"version":["1.3"],"parallelism":["1"]}}	10	0
2bf39cbf-aa41-400f-8ce1-13c8ee2f09f6	\N	password	5edbed6e-f610-4646-ad1d-c3faf155443a	1762257010776	My password	{"value":"PWRR1v3RpwOZPs6M7srwKmI6rbuA3no47+Q2Befb6UE=","salt":"mCvUFpBiWufM8EoX2POP0g==","additionalParameters":{}}	{"hashIterations":5,"algorithm":"argon2","additionalParameters":{"hashLength":["32"],"memory":["7168"],"type":["id"],"version":["1.3"],"parallelism":["1"]}}	10	0
cb71c45d-af9d-4f9e-bc46-987d05c271fa	\N	password	c5f13a1e-ba33-4144-a68e-6833d464e300	1762420186598	\N	{"value":"DSFbgfJ9BM+osCvsS6S1YRI5Euxumfk7Mu61gJJqqew=","salt":"su3pj7d3B2TpE3lI+jYI5A==","additionalParameters":{}}	{"hashIterations":5,"algorithm":"argon2","additionalParameters":{"hashLength":["32"],"memory":["7168"],"type":["id"],"version":["1.3"],"parallelism":["1"]}}	10	0
65ce2c41-e059-4448-aaac-1512243ca4c3	\N	password	b483eb56-3ac4-4e72-a9ac-fd7f217f619b	1763543375109	\N	{"value":"gOOXAYeY5XLFsbGPYT+hx2fwO+fzkFXxFJ+pXV+eTOQ=","salt":"6OnxSPGbUPScoZWWYaxUoQ==","additionalParameters":{}}	{"hashIterations":5,"algorithm":"argon2","additionalParameters":{"hashLength":["32"],"memory":["7168"],"type":["id"],"version":["1.3"],"parallelism":["1"]}}	10	0
\.


--
-- TOC entry 4625 (class 0 OID 20422)
-- Dependencies: 234
-- Data for Name: databasechangelog; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.databasechangelog (id, author, filename, dateexecuted, orderexecuted, exectype, md5sum, description, comments, tag, liquibase, contexts, labels, deployment_id) FROM stdin;
1.0.0.Final-KEYCLOAK-5461	sthorger@redhat.com	META-INF/jpa-changelog-1.0.0.Final.xml	2025-05-02 16:37:36.933352	1	EXECUTED	9:6f1016664e21e16d26517a4418f5e3df	createTable tableName=APPLICATION_DEFAULT_ROLES; createTable tableName=CLIENT; createTable tableName=CLIENT_SESSION; createTable tableName=CLIENT_SESSION_ROLE; createTable tableName=COMPOSITE_ROLE; createTable tableName=CREDENTIAL; createTable tab...		\N	4.29.1	\N	\N	6203855948
1.0.0.Final-KEYCLOAK-5461	sthorger@redhat.com	META-INF/db2-jpa-changelog-1.0.0.Final.xml	2025-05-02 16:37:36.962415	2	MARK_RAN	9:828775b1596a07d1200ba1d49e5e3941	createTable tableName=APPLICATION_DEFAULT_ROLES; createTable tableName=CLIENT; createTable tableName=CLIENT_SESSION; createTable tableName=CLIENT_SESSION_ROLE; createTable tableName=COMPOSITE_ROLE; createTable tableName=CREDENTIAL; createTable tab...		\N	4.29.1	\N	\N	6203855948
1.1.0.Beta1	sthorger@redhat.com	META-INF/jpa-changelog-1.1.0.Beta1.xml	2025-05-02 16:37:37.081797	3	EXECUTED	9:5f090e44a7d595883c1fb61f4b41fd38	delete tableName=CLIENT_SESSION_ROLE; delete tableName=CLIENT_SESSION; delete tableName=USER_SESSION; createTable tableName=CLIENT_ATTRIBUTES; createTable tableName=CLIENT_SESSION_NOTE; createTable tableName=APP_NODE_REGISTRATIONS; addColumn table...		\N	4.29.1	\N	\N	6203855948
1.1.0.Final	sthorger@redhat.com	META-INF/jpa-changelog-1.1.0.Final.xml	2025-05-02 16:37:37.099783	4	EXECUTED	9:c07e577387a3d2c04d1adc9aaad8730e	renameColumn newColumnName=EVENT_TIME, oldColumnName=TIME, tableName=EVENT_ENTITY		\N	4.29.1	\N	\N	6203855948
1.2.0.Beta1	psilva@redhat.com	META-INF/jpa-changelog-1.2.0.Beta1.xml	2025-05-02 16:37:37.382883	5	EXECUTED	9:b68ce996c655922dbcd2fe6b6ae72686	delete tableName=CLIENT_SESSION_ROLE; delete tableName=CLIENT_SESSION_NOTE; delete tableName=CLIENT_SESSION; delete tableName=USER_SESSION; createTable tableName=PROTOCOL_MAPPER; createTable tableName=PROTOCOL_MAPPER_CONFIG; createTable tableName=...		\N	4.29.1	\N	\N	6203855948
1.2.0.Beta1	psilva@redhat.com	META-INF/db2-jpa-changelog-1.2.0.Beta1.xml	2025-05-02 16:37:37.395163	6	MARK_RAN	9:543b5c9989f024fe35c6f6c5a97de88e	delete tableName=CLIENT_SESSION_ROLE; delete tableName=CLIENT_SESSION_NOTE; delete tableName=CLIENT_SESSION; delete tableName=USER_SESSION; createTable tableName=PROTOCOL_MAPPER; createTable tableName=PROTOCOL_MAPPER_CONFIG; createTable tableName=...		\N	4.29.1	\N	\N	6203855948
1.2.0.RC1	bburke@redhat.com	META-INF/jpa-changelog-1.2.0.CR1.xml	2025-05-02 16:37:37.634136	7	EXECUTED	9:765afebbe21cf5bbca048e632df38336	delete tableName=CLIENT_SESSION_ROLE; delete tableName=CLIENT_SESSION_NOTE; delete tableName=CLIENT_SESSION; delete tableName=USER_SESSION_NOTE; delete tableName=USER_SESSION; createTable tableName=MIGRATION_MODEL; createTable tableName=IDENTITY_P...		\N	4.29.1	\N	\N	6203855948
1.2.0.RC1	bburke@redhat.com	META-INF/db2-jpa-changelog-1.2.0.CR1.xml	2025-05-02 16:37:37.647987	8	MARK_RAN	9:db4a145ba11a6fdaefb397f6dbf829a1	delete tableName=CLIENT_SESSION_ROLE; delete tableName=CLIENT_SESSION_NOTE; delete tableName=CLIENT_SESSION; delete tableName=USER_SESSION_NOTE; delete tableName=USER_SESSION; createTable tableName=MIGRATION_MODEL; createTable tableName=IDENTITY_P...		\N	4.29.1	\N	\N	6203855948
1.2.0.Final	keycloak	META-INF/jpa-changelog-1.2.0.Final.xml	2025-05-02 16:37:37.669267	9	EXECUTED	9:9d05c7be10cdb873f8bcb41bc3a8ab23	update tableName=CLIENT; update tableName=CLIENT; update tableName=CLIENT		\N	4.29.1	\N	\N	6203855948
1.3.0	bburke@redhat.com	META-INF/jpa-changelog-1.3.0.xml	2025-05-02 16:37:37.934631	10	EXECUTED	9:18593702353128d53111f9b1ff0b82b8	delete tableName=CLIENT_SESSION_ROLE; delete tableName=CLIENT_SESSION_PROT_MAPPER; delete tableName=CLIENT_SESSION_NOTE; delete tableName=CLIENT_SESSION; delete tableName=USER_SESSION_NOTE; delete tableName=USER_SESSION; createTable tableName=ADMI...		\N	4.29.1	\N	\N	6203855948
1.4.0	bburke@redhat.com	META-INF/jpa-changelog-1.4.0.xml	2025-05-02 16:37:38.097859	11	EXECUTED	9:6122efe5f090e41a85c0f1c9e52cbb62	delete tableName=CLIENT_SESSION_AUTH_STATUS; delete tableName=CLIENT_SESSION_ROLE; delete tableName=CLIENT_SESSION_PROT_MAPPER; delete tableName=CLIENT_SESSION_NOTE; delete tableName=CLIENT_SESSION; delete tableName=USER_SESSION_NOTE; delete table...		\N	4.29.1	\N	\N	6203855948
1.4.0	bburke@redhat.com	META-INF/db2-jpa-changelog-1.4.0.xml	2025-05-02 16:37:38.107594	12	MARK_RAN	9:e1ff28bf7568451453f844c5d54bb0b5	delete tableName=CLIENT_SESSION_AUTH_STATUS; delete tableName=CLIENT_SESSION_ROLE; delete tableName=CLIENT_SESSION_PROT_MAPPER; delete tableName=CLIENT_SESSION_NOTE; delete tableName=CLIENT_SESSION; delete tableName=USER_SESSION_NOTE; delete table...		\N	4.29.1	\N	\N	6203855948
1.5.0	bburke@redhat.com	META-INF/jpa-changelog-1.5.0.xml	2025-05-02 16:37:38.186352	13	EXECUTED	9:7af32cd8957fbc069f796b61217483fd	delete tableName=CLIENT_SESSION_AUTH_STATUS; delete tableName=CLIENT_SESSION_ROLE; delete tableName=CLIENT_SESSION_PROT_MAPPER; delete tableName=CLIENT_SESSION_NOTE; delete tableName=CLIENT_SESSION; delete tableName=USER_SESSION_NOTE; delete table...		\N	4.29.1	\N	\N	6203855948
1.6.1_from15	mposolda@redhat.com	META-INF/jpa-changelog-1.6.1.xml	2025-05-02 16:37:38.235001	14	EXECUTED	9:6005e15e84714cd83226bf7879f54190	addColumn tableName=REALM; addColumn tableName=KEYCLOAK_ROLE; addColumn tableName=CLIENT; createTable tableName=OFFLINE_USER_SESSION; createTable tableName=OFFLINE_CLIENT_SESSION; addPrimaryKey constraintName=CONSTRAINT_OFFL_US_SES_PK2, tableName=...		\N	4.29.1	\N	\N	6203855948
1.6.1_from16-pre	mposolda@redhat.com	META-INF/jpa-changelog-1.6.1.xml	2025-05-02 16:37:38.240175	15	MARK_RAN	9:bf656f5a2b055d07f314431cae76f06c	delete tableName=OFFLINE_CLIENT_SESSION; delete tableName=OFFLINE_USER_SESSION		\N	4.29.1	\N	\N	6203855948
1.6.1_from16	mposolda@redhat.com	META-INF/jpa-changelog-1.6.1.xml	2025-05-02 16:37:38.248285	16	MARK_RAN	9:f8dadc9284440469dcf71e25ca6ab99b	dropPrimaryKey constraintName=CONSTRAINT_OFFLINE_US_SES_PK, tableName=OFFLINE_USER_SESSION; dropPrimaryKey constraintName=CONSTRAINT_OFFLINE_CL_SES_PK, tableName=OFFLINE_CLIENT_SESSION; addColumn tableName=OFFLINE_USER_SESSION; update tableName=OF...		\N	4.29.1	\N	\N	6203855948
1.6.1	mposolda@redhat.com	META-INF/jpa-changelog-1.6.1.xml	2025-05-02 16:37:38.259526	17	EXECUTED	9:d41d8cd98f00b204e9800998ecf8427e	empty		\N	4.29.1	\N	\N	6203855948
1.7.0	bburke@redhat.com	META-INF/jpa-changelog-1.7.0.xml	2025-05-02 16:37:38.395167	18	EXECUTED	9:3368ff0be4c2855ee2dd9ca813b38d8e	createTable tableName=KEYCLOAK_GROUP; createTable tableName=GROUP_ROLE_MAPPING; createTable tableName=GROUP_ATTRIBUTE; createTable tableName=USER_GROUP_MEMBERSHIP; createTable tableName=REALM_DEFAULT_GROUPS; addColumn tableName=IDENTITY_PROVIDER; ...		\N	4.29.1	\N	\N	6203855948
1.8.0	mposolda@redhat.com	META-INF/jpa-changelog-1.8.0.xml	2025-05-02 16:37:38.508203	19	EXECUTED	9:8ac2fb5dd030b24c0570a763ed75ed20	addColumn tableName=IDENTITY_PROVIDER; createTable tableName=CLIENT_TEMPLATE; createTable tableName=CLIENT_TEMPLATE_ATTRIBUTES; createTable tableName=TEMPLATE_SCOPE_MAPPING; dropNotNullConstraint columnName=CLIENT_ID, tableName=PROTOCOL_MAPPER; ad...		\N	4.29.1	\N	\N	6203855948
1.8.0-2	keycloak	META-INF/jpa-changelog-1.8.0.xml	2025-05-02 16:37:38.526457	20	EXECUTED	9:f91ddca9b19743db60e3057679810e6c	dropDefaultValue columnName=ALGORITHM, tableName=CREDENTIAL; update tableName=CREDENTIAL		\N	4.29.1	\N	\N	6203855948
1.8.0	mposolda@redhat.com	META-INF/db2-jpa-changelog-1.8.0.xml	2025-05-02 16:37:38.533779	21	MARK_RAN	9:831e82914316dc8a57dc09d755f23c51	addColumn tableName=IDENTITY_PROVIDER; createTable tableName=CLIENT_TEMPLATE; createTable tableName=CLIENT_TEMPLATE_ATTRIBUTES; createTable tableName=TEMPLATE_SCOPE_MAPPING; dropNotNullConstraint columnName=CLIENT_ID, tableName=PROTOCOL_MAPPER; ad...		\N	4.29.1	\N	\N	6203855948
1.8.0-2	keycloak	META-INF/db2-jpa-changelog-1.8.0.xml	2025-05-02 16:37:38.548145	22	MARK_RAN	9:f91ddca9b19743db60e3057679810e6c	dropDefaultValue columnName=ALGORITHM, tableName=CREDENTIAL; update tableName=CREDENTIAL		\N	4.29.1	\N	\N	6203855948
1.9.0	mposolda@redhat.com	META-INF/jpa-changelog-1.9.0.xml	2025-05-02 16:37:38.75405	23	EXECUTED	9:bc3d0f9e823a69dc21e23e94c7a94bb1	update tableName=REALM; update tableName=REALM; update tableName=REALM; update tableName=REALM; update tableName=CREDENTIAL; update tableName=CREDENTIAL; update tableName=CREDENTIAL; update tableName=REALM; update tableName=REALM; customChange; dr...		\N	4.29.1	\N	\N	6203855948
1.9.1	keycloak	META-INF/jpa-changelog-1.9.1.xml	2025-05-02 16:37:38.772496	24	EXECUTED	9:c9999da42f543575ab790e76439a2679	modifyDataType columnName=PRIVATE_KEY, tableName=REALM; modifyDataType columnName=PUBLIC_KEY, tableName=REALM; modifyDataType columnName=CERTIFICATE, tableName=REALM		\N	4.29.1	\N	\N	6203855948
1.9.1	keycloak	META-INF/db2-jpa-changelog-1.9.1.xml	2025-05-02 16:37:38.7778	25	MARK_RAN	9:0d6c65c6f58732d81569e77b10ba301d	modifyDataType columnName=PRIVATE_KEY, tableName=REALM; modifyDataType columnName=CERTIFICATE, tableName=REALM		\N	4.29.1	\N	\N	6203855948
1.9.2	keycloak	META-INF/jpa-changelog-1.9.2.xml	2025-05-02 16:37:39.620109	26	EXECUTED	9:fc576660fc016ae53d2d4778d84d86d0	createIndex indexName=IDX_USER_EMAIL, tableName=USER_ENTITY; createIndex indexName=IDX_USER_ROLE_MAPPING, tableName=USER_ROLE_MAPPING; createIndex indexName=IDX_USER_GROUP_MAPPING, tableName=USER_GROUP_MEMBERSHIP; createIndex indexName=IDX_USER_CO...		\N	4.29.1	\N	\N	6203855948
authz-2.0.0	psilva@redhat.com	META-INF/jpa-changelog-authz-2.0.0.xml	2025-05-02 16:37:39.802789	27	EXECUTED	9:43ed6b0da89ff77206289e87eaa9c024	createTable tableName=RESOURCE_SERVER; addPrimaryKey constraintName=CONSTRAINT_FARS, tableName=RESOURCE_SERVER; addUniqueConstraint constraintName=UK_AU8TT6T700S9V50BU18WS5HA6, tableName=RESOURCE_SERVER; createTable tableName=RESOURCE_SERVER_RESOU...		\N	4.29.1	\N	\N	6203855948
authz-2.5.1	psilva@redhat.com	META-INF/jpa-changelog-authz-2.5.1.xml	2025-05-02 16:37:39.816257	28	EXECUTED	9:44bae577f551b3738740281eceb4ea70	update tableName=RESOURCE_SERVER_POLICY		\N	4.29.1	\N	\N	6203855948
2.1.0-KEYCLOAK-5461	bburke@redhat.com	META-INF/jpa-changelog-2.1.0.xml	2025-05-02 16:37:39.96283	29	EXECUTED	9:bd88e1f833df0420b01e114533aee5e8	createTable tableName=BROKER_LINK; createTable tableName=FED_USER_ATTRIBUTE; createTable tableName=FED_USER_CONSENT; createTable tableName=FED_USER_CONSENT_ROLE; createTable tableName=FED_USER_CONSENT_PROT_MAPPER; createTable tableName=FED_USER_CR...		\N	4.29.1	\N	\N	6203855948
2.2.0	bburke@redhat.com	META-INF/jpa-changelog-2.2.0.xml	2025-05-02 16:37:39.999384	30	EXECUTED	9:a7022af5267f019d020edfe316ef4371	addColumn tableName=ADMIN_EVENT_ENTITY; createTable tableName=CREDENTIAL_ATTRIBUTE; createTable tableName=FED_CREDENTIAL_ATTRIBUTE; modifyDataType columnName=VALUE, tableName=CREDENTIAL; addForeignKeyConstraint baseTableName=FED_CREDENTIAL_ATTRIBU...		\N	4.29.1	\N	\N	6203855948
2.3.0	bburke@redhat.com	META-INF/jpa-changelog-2.3.0.xml	2025-05-02 16:37:40.058626	31	EXECUTED	9:fc155c394040654d6a79227e56f5e25a	createTable tableName=FEDERATED_USER; addPrimaryKey constraintName=CONSTR_FEDERATED_USER, tableName=FEDERATED_USER; dropDefaultValue columnName=TOTP, tableName=USER_ENTITY; dropColumn columnName=TOTP, tableName=USER_ENTITY; addColumn tableName=IDE...		\N	4.29.1	\N	\N	6203855948
2.4.0	bburke@redhat.com	META-INF/jpa-changelog-2.4.0.xml	2025-05-02 16:37:40.080871	32	EXECUTED	9:eac4ffb2a14795e5dc7b426063e54d88	customChange		\N	4.29.1	\N	\N	6203855948
2.5.0	bburke@redhat.com	META-INF/jpa-changelog-2.5.0.xml	2025-05-02 16:37:40.109404	33	EXECUTED	9:54937c05672568c4c64fc9524c1e9462	customChange; modifyDataType columnName=USER_ID, tableName=OFFLINE_USER_SESSION		\N	4.29.1	\N	\N	6203855948
2.5.0-unicode-oracle	hmlnarik@redhat.com	META-INF/jpa-changelog-2.5.0.xml	2025-05-02 16:37:40.115172	34	MARK_RAN	9:3a32bace77c84d7678d035a7f5a8084e	modifyDataType columnName=DESCRIPTION, tableName=AUTHENTICATION_FLOW; modifyDataType columnName=DESCRIPTION, tableName=CLIENT_TEMPLATE; modifyDataType columnName=DESCRIPTION, tableName=RESOURCE_SERVER_POLICY; modifyDataType columnName=DESCRIPTION,...		\N	4.29.1	\N	\N	6203855948
2.5.0-unicode-other-dbs	hmlnarik@redhat.com	META-INF/jpa-changelog-2.5.0.xml	2025-05-02 16:37:40.198419	35	EXECUTED	9:33d72168746f81f98ae3a1e8e0ca3554	modifyDataType columnName=DESCRIPTION, tableName=AUTHENTICATION_FLOW; modifyDataType columnName=DESCRIPTION, tableName=CLIENT_TEMPLATE; modifyDataType columnName=DESCRIPTION, tableName=RESOURCE_SERVER_POLICY; modifyDataType columnName=DESCRIPTION,...		\N	4.29.1	\N	\N	6203855948
2.5.0-duplicate-email-support	slawomir@dabek.name	META-INF/jpa-changelog-2.5.0.xml	2025-05-02 16:37:40.217369	36	EXECUTED	9:61b6d3d7a4c0e0024b0c839da283da0c	addColumn tableName=REALM		\N	4.29.1	\N	\N	6203855948
2.5.0-unique-group-names	hmlnarik@redhat.com	META-INF/jpa-changelog-2.5.0.xml	2025-05-02 16:37:40.232864	37	EXECUTED	9:8dcac7bdf7378e7d823cdfddebf72fda	addUniqueConstraint constraintName=SIBLING_NAMES, tableName=KEYCLOAK_GROUP		\N	4.29.1	\N	\N	6203855948
2.5.1	bburke@redhat.com	META-INF/jpa-changelog-2.5.1.xml	2025-05-02 16:37:40.250863	38	EXECUTED	9:a2b870802540cb3faa72098db5388af3	addColumn tableName=FED_USER_CONSENT		\N	4.29.1	\N	\N	6203855948
3.0.0	bburke@redhat.com	META-INF/jpa-changelog-3.0.0.xml	2025-05-02 16:37:40.262929	39	EXECUTED	9:132a67499ba24bcc54fb5cbdcfe7e4c0	addColumn tableName=IDENTITY_PROVIDER		\N	4.29.1	\N	\N	6203855948
3.2.0-fix	keycloak	META-INF/jpa-changelog-3.2.0.xml	2025-05-02 16:37:40.267944	40	MARK_RAN	9:938f894c032f5430f2b0fafb1a243462	addNotNullConstraint columnName=REALM_ID, tableName=CLIENT_INITIAL_ACCESS		\N	4.29.1	\N	\N	6203855948
3.2.0-fix-with-keycloak-5416	keycloak	META-INF/jpa-changelog-3.2.0.xml	2025-05-02 16:37:40.275646	41	MARK_RAN	9:845c332ff1874dc5d35974b0babf3006	dropIndex indexName=IDX_CLIENT_INIT_ACC_REALM, tableName=CLIENT_INITIAL_ACCESS; addNotNullConstraint columnName=REALM_ID, tableName=CLIENT_INITIAL_ACCESS; createIndex indexName=IDX_CLIENT_INIT_ACC_REALM, tableName=CLIENT_INITIAL_ACCESS		\N	4.29.1	\N	\N	6203855948
3.2.0-fix-offline-sessions	hmlnarik	META-INF/jpa-changelog-3.2.0.xml	2025-05-02 16:37:40.294145	42	EXECUTED	9:fc86359c079781adc577c5a217e4d04c	customChange		\N	4.29.1	\N	\N	6203855948
3.2.0-fixed	keycloak	META-INF/jpa-changelog-3.2.0.xml	2025-05-02 16:37:43.75482	43	EXECUTED	9:59a64800e3c0d09b825f8a3b444fa8f4	addColumn tableName=REALM; dropPrimaryKey constraintName=CONSTRAINT_OFFL_CL_SES_PK2, tableName=OFFLINE_CLIENT_SESSION; dropColumn columnName=CLIENT_SESSION_ID, tableName=OFFLINE_CLIENT_SESSION; addPrimaryKey constraintName=CONSTRAINT_OFFL_CL_SES_P...		\N	4.29.1	\N	\N	6203855948
3.3.0	keycloak	META-INF/jpa-changelog-3.3.0.xml	2025-05-02 16:37:43.768277	44	EXECUTED	9:d48d6da5c6ccf667807f633fe489ce88	addColumn tableName=USER_ENTITY		\N	4.29.1	\N	\N	6203855948
authz-3.4.0.CR1-resource-server-pk-change-part1	glavoie@gmail.com	META-INF/jpa-changelog-authz-3.4.0.CR1.xml	2025-05-02 16:37:43.785925	45	EXECUTED	9:dde36f7973e80d71fceee683bc5d2951	addColumn tableName=RESOURCE_SERVER_POLICY; addColumn tableName=RESOURCE_SERVER_RESOURCE; addColumn tableName=RESOURCE_SERVER_SCOPE		\N	4.29.1	\N	\N	6203855948
authz-3.4.0.CR1-resource-server-pk-change-part2-KEYCLOAK-6095	hmlnarik@redhat.com	META-INF/jpa-changelog-authz-3.4.0.CR1.xml	2025-05-02 16:37:43.802538	46	EXECUTED	9:b855e9b0a406b34fa323235a0cf4f640	customChange		\N	4.29.1	\N	\N	6203855948
authz-3.4.0.CR1-resource-server-pk-change-part3-fixed	glavoie@gmail.com	META-INF/jpa-changelog-authz-3.4.0.CR1.xml	2025-05-02 16:37:43.807639	47	MARK_RAN	9:51abbacd7b416c50c4421a8cabf7927e	dropIndex indexName=IDX_RES_SERV_POL_RES_SERV, tableName=RESOURCE_SERVER_POLICY; dropIndex indexName=IDX_RES_SRV_RES_RES_SRV, tableName=RESOURCE_SERVER_RESOURCE; dropIndex indexName=IDX_RES_SRV_SCOPE_RES_SRV, tableName=RESOURCE_SERVER_SCOPE		\N	4.29.1	\N	\N	6203855948
authz-3.4.0.CR1-resource-server-pk-change-part3-fixed-nodropindex	glavoie@gmail.com	META-INF/jpa-changelog-authz-3.4.0.CR1.xml	2025-05-02 16:37:44.112375	48	EXECUTED	9:bdc99e567b3398bac83263d375aad143	addNotNullConstraint columnName=RESOURCE_SERVER_CLIENT_ID, tableName=RESOURCE_SERVER_POLICY; addNotNullConstraint columnName=RESOURCE_SERVER_CLIENT_ID, tableName=RESOURCE_SERVER_RESOURCE; addNotNullConstraint columnName=RESOURCE_SERVER_CLIENT_ID, ...		\N	4.29.1	\N	\N	6203855948
authn-3.4.0.CR1-refresh-token-max-reuse	glavoie@gmail.com	META-INF/jpa-changelog-authz-3.4.0.CR1.xml	2025-05-02 16:37:44.123956	49	EXECUTED	9:d198654156881c46bfba39abd7769e69	addColumn tableName=REALM		\N	4.29.1	\N	\N	6203855948
3.4.0	keycloak	META-INF/jpa-changelog-3.4.0.xml	2025-05-02 16:37:44.224446	50	EXECUTED	9:cfdd8736332ccdd72c5256ccb42335db	addPrimaryKey constraintName=CONSTRAINT_REALM_DEFAULT_ROLES, tableName=REALM_DEFAULT_ROLES; addPrimaryKey constraintName=CONSTRAINT_COMPOSITE_ROLE, tableName=COMPOSITE_ROLE; addPrimaryKey constraintName=CONSTR_REALM_DEFAULT_GROUPS, tableName=REALM...		\N	4.29.1	\N	\N	6203855948
3.4.0-KEYCLOAK-5230	hmlnarik@redhat.com	META-INF/jpa-changelog-3.4.0.xml	2025-05-02 16:37:45.008463	51	EXECUTED	9:7c84de3d9bd84d7f077607c1a4dcb714	createIndex indexName=IDX_FU_ATTRIBUTE, tableName=FED_USER_ATTRIBUTE; createIndex indexName=IDX_FU_CONSENT, tableName=FED_USER_CONSENT; createIndex indexName=IDX_FU_CONSENT_RU, tableName=FED_USER_CONSENT; createIndex indexName=IDX_FU_CREDENTIAL, t...		\N	4.29.1	\N	\N	6203855948
3.4.1	psilva@redhat.com	META-INF/jpa-changelog-3.4.1.xml	2025-05-02 16:37:45.020333	52	EXECUTED	9:5a6bb36cbefb6a9d6928452c0852af2d	modifyDataType columnName=VALUE, tableName=CLIENT_ATTRIBUTES		\N	4.29.1	\N	\N	6203855948
3.4.2	keycloak	META-INF/jpa-changelog-3.4.2.xml	2025-05-02 16:37:45.031695	53	EXECUTED	9:8f23e334dbc59f82e0a328373ca6ced0	update tableName=REALM		\N	4.29.1	\N	\N	6203855948
3.4.2-KEYCLOAK-5172	mkanis@redhat.com	META-INF/jpa-changelog-3.4.2.xml	2025-05-02 16:37:45.04185	54	EXECUTED	9:9156214268f09d970cdf0e1564d866af	update tableName=CLIENT		\N	4.29.1	\N	\N	6203855948
4.0.0-KEYCLOAK-6335	bburke@redhat.com	META-INF/jpa-changelog-4.0.0.xml	2025-05-02 16:37:45.059566	55	EXECUTED	9:db806613b1ed154826c02610b7dbdf74	createTable tableName=CLIENT_AUTH_FLOW_BINDINGS; addPrimaryKey constraintName=C_CLI_FLOW_BIND, tableName=CLIENT_AUTH_FLOW_BINDINGS		\N	4.29.1	\N	\N	6203855948
4.0.0-CLEANUP-UNUSED-TABLE	bburke@redhat.com	META-INF/jpa-changelog-4.0.0.xml	2025-05-02 16:37:45.072459	56	EXECUTED	9:229a041fb72d5beac76bb94a5fa709de	dropTable tableName=CLIENT_IDENTITY_PROV_MAPPING		\N	4.29.1	\N	\N	6203855948
4.0.0-KEYCLOAK-6228	bburke@redhat.com	META-INF/jpa-changelog-4.0.0.xml	2025-05-02 16:37:45.195433	57	EXECUTED	9:079899dade9c1e683f26b2aa9ca6ff04	dropUniqueConstraint constraintName=UK_JKUWUVD56ONTGSUHOGM8UEWRT, tableName=USER_CONSENT; dropNotNullConstraint columnName=CLIENT_ID, tableName=USER_CONSENT; addColumn tableName=USER_CONSENT; addUniqueConstraint constraintName=UK_JKUWUVD56ONTGSUHO...		\N	4.29.1	\N	\N	6203855948
4.0.0-KEYCLOAK-5579-fixed	mposolda@redhat.com	META-INF/jpa-changelog-4.0.0.xml	2025-05-02 16:37:46.104619	58	EXECUTED	9:139b79bcbbfe903bb1c2d2a4dbf001d9	dropForeignKeyConstraint baseTableName=CLIENT_TEMPLATE_ATTRIBUTES, constraintName=FK_CL_TEMPL_ATTR_TEMPL; renameTable newTableName=CLIENT_SCOPE_ATTRIBUTES, oldTableName=CLIENT_TEMPLATE_ATTRIBUTES; renameColumn newColumnName=SCOPE_ID, oldColumnName...		\N	4.29.1	\N	\N	6203855948
authz-4.0.0.CR1	psilva@redhat.com	META-INF/jpa-changelog-authz-4.0.0.CR1.xml	2025-05-02 16:37:46.16782	59	EXECUTED	9:b55738ad889860c625ba2bf483495a04	createTable tableName=RESOURCE_SERVER_PERM_TICKET; addPrimaryKey constraintName=CONSTRAINT_FAPMT, tableName=RESOURCE_SERVER_PERM_TICKET; addForeignKeyConstraint baseTableName=RESOURCE_SERVER_PERM_TICKET, constraintName=FK_FRSRHO213XCX4WNKOG82SSPMT...		\N	4.29.1	\N	\N	6203855948
authz-4.0.0.Beta3	psilva@redhat.com	META-INF/jpa-changelog-authz-4.0.0.Beta3.xml	2025-05-02 16:37:46.198993	60	EXECUTED	9:e0057eac39aa8fc8e09ac6cfa4ae15fe	addColumn tableName=RESOURCE_SERVER_POLICY; addColumn tableName=RESOURCE_SERVER_PERM_TICKET; addForeignKeyConstraint baseTableName=RESOURCE_SERVER_PERM_TICKET, constraintName=FK_FRSRPO2128CX4WNKOG82SSRFY, referencedTableName=RESOURCE_SERVER_POLICY		\N	4.29.1	\N	\N	6203855948
authz-4.2.0.Final	mhajas@redhat.com	META-INF/jpa-changelog-authz-4.2.0.Final.xml	2025-05-02 16:37:46.224062	61	EXECUTED	9:42a33806f3a0443fe0e7feeec821326c	createTable tableName=RESOURCE_URIS; addForeignKeyConstraint baseTableName=RESOURCE_URIS, constraintName=FK_RESOURCE_SERVER_URIS, referencedTableName=RESOURCE_SERVER_RESOURCE; customChange; dropColumn columnName=URI, tableName=RESOURCE_SERVER_RESO...		\N	4.29.1	\N	\N	6203855948
authz-4.2.0.Final-KEYCLOAK-9944	hmlnarik@redhat.com	META-INF/jpa-changelog-authz-4.2.0.Final.xml	2025-05-02 16:37:46.238881	62	EXECUTED	9:9968206fca46eecc1f51db9c024bfe56	addPrimaryKey constraintName=CONSTRAINT_RESOUR_URIS_PK, tableName=RESOURCE_URIS		\N	4.29.1	\N	\N	6203855948
4.2.0-KEYCLOAK-6313	wadahiro@gmail.com	META-INF/jpa-changelog-4.2.0.xml	2025-05-02 16:37:46.24941	63	EXECUTED	9:92143a6daea0a3f3b8f598c97ce55c3d	addColumn tableName=REQUIRED_ACTION_PROVIDER		\N	4.29.1	\N	\N	6203855948
4.3.0-KEYCLOAK-7984	wadahiro@gmail.com	META-INF/jpa-changelog-4.3.0.xml	2025-05-02 16:37:46.26007	64	EXECUTED	9:82bab26a27195d889fb0429003b18f40	update tableName=REQUIRED_ACTION_PROVIDER		\N	4.29.1	\N	\N	6203855948
4.6.0-KEYCLOAK-7950	psilva@redhat.com	META-INF/jpa-changelog-4.6.0.xml	2025-05-02 16:37:46.27465	65	EXECUTED	9:e590c88ddc0b38b0ae4249bbfcb5abc3	update tableName=RESOURCE_SERVER_RESOURCE		\N	4.29.1	\N	\N	6203855948
4.6.0-KEYCLOAK-8377	keycloak	META-INF/jpa-changelog-4.6.0.xml	2025-05-02 16:37:46.376598	66	EXECUTED	9:5c1f475536118dbdc38d5d7977950cc0	createTable tableName=ROLE_ATTRIBUTE; addPrimaryKey constraintName=CONSTRAINT_ROLE_ATTRIBUTE_PK, tableName=ROLE_ATTRIBUTE; addForeignKeyConstraint baseTableName=ROLE_ATTRIBUTE, constraintName=FK_ROLE_ATTRIBUTE_ID, referencedTableName=KEYCLOAK_ROLE...		\N	4.29.1	\N	\N	6203855948
4.6.0-KEYCLOAK-8555	gideonray@gmail.com	META-INF/jpa-changelog-4.6.0.xml	2025-05-02 16:37:46.449619	67	EXECUTED	9:e7c9f5f9c4d67ccbbcc215440c718a17	createIndex indexName=IDX_COMPONENT_PROVIDER_TYPE, tableName=COMPONENT		\N	4.29.1	\N	\N	6203855948
4.7.0-KEYCLOAK-1267	sguilhen@redhat.com	META-INF/jpa-changelog-4.7.0.xml	2025-05-02 16:37:46.464404	68	EXECUTED	9:88e0bfdda924690d6f4e430c53447dd5	addColumn tableName=REALM		\N	4.29.1	\N	\N	6203855948
4.7.0-KEYCLOAK-7275	keycloak	META-INF/jpa-changelog-4.7.0.xml	2025-05-02 16:37:46.563041	69	EXECUTED	9:f53177f137e1c46b6a88c59ec1cb5218	renameColumn newColumnName=CREATED_ON, oldColumnName=LAST_SESSION_REFRESH, tableName=OFFLINE_USER_SESSION; addNotNullConstraint columnName=CREATED_ON, tableName=OFFLINE_USER_SESSION; addColumn tableName=OFFLINE_USER_SESSION; customChange; createIn...		\N	4.29.1	\N	\N	6203855948
4.8.0-KEYCLOAK-8835	sguilhen@redhat.com	META-INF/jpa-changelog-4.8.0.xml	2025-05-02 16:37:46.580476	70	EXECUTED	9:a74d33da4dc42a37ec27121580d1459f	addNotNullConstraint columnName=SSO_MAX_LIFESPAN_REMEMBER_ME, tableName=REALM; addNotNullConstraint columnName=SSO_IDLE_TIMEOUT_REMEMBER_ME, tableName=REALM		\N	4.29.1	\N	\N	6203855948
authz-7.0.0-KEYCLOAK-10443	psilva@redhat.com	META-INF/jpa-changelog-authz-7.0.0.xml	2025-05-02 16:37:46.600816	71	EXECUTED	9:fd4ade7b90c3b67fae0bfcfcb42dfb5f	addColumn tableName=RESOURCE_SERVER		\N	4.29.1	\N	\N	6203855948
8.0.0-adding-credential-columns	keycloak	META-INF/jpa-changelog-8.0.0.xml	2025-05-02 16:37:46.63821	72	EXECUTED	9:aa072ad090bbba210d8f18781b8cebf4	addColumn tableName=CREDENTIAL; addColumn tableName=FED_USER_CREDENTIAL		\N	4.29.1	\N	\N	6203855948
8.0.0-updating-credential-data-not-oracle-fixed	keycloak	META-INF/jpa-changelog-8.0.0.xml	2025-05-02 16:37:46.660684	73	EXECUTED	9:1ae6be29bab7c2aa376f6983b932be37	update tableName=CREDENTIAL; update tableName=CREDENTIAL; update tableName=CREDENTIAL; update tableName=FED_USER_CREDENTIAL; update tableName=FED_USER_CREDENTIAL; update tableName=FED_USER_CREDENTIAL		\N	4.29.1	\N	\N	6203855948
8.0.0-updating-credential-data-oracle-fixed	keycloak	META-INF/jpa-changelog-8.0.0.xml	2025-05-02 16:37:46.666963	74	MARK_RAN	9:14706f286953fc9a25286dbd8fb30d97	update tableName=CREDENTIAL; update tableName=CREDENTIAL; update tableName=CREDENTIAL; update tableName=FED_USER_CREDENTIAL; update tableName=FED_USER_CREDENTIAL; update tableName=FED_USER_CREDENTIAL		\N	4.29.1	\N	\N	6203855948
8.0.0-credential-cleanup-fixed	keycloak	META-INF/jpa-changelog-8.0.0.xml	2025-05-02 16:37:46.729426	75	EXECUTED	9:2b9cc12779be32c5b40e2e67711a218b	dropDefaultValue columnName=COUNTER, tableName=CREDENTIAL; dropDefaultValue columnName=DIGITS, tableName=CREDENTIAL; dropDefaultValue columnName=PERIOD, tableName=CREDENTIAL; dropDefaultValue columnName=ALGORITHM, tableName=CREDENTIAL; dropColumn ...		\N	4.29.1	\N	\N	6203855948
8.0.0-resource-tag-support	keycloak	META-INF/jpa-changelog-8.0.0.xml	2025-05-02 16:37:46.82281	76	EXECUTED	9:91fa186ce7a5af127a2d7a91ee083cc5	addColumn tableName=MIGRATION_MODEL; createIndex indexName=IDX_UPDATE_TIME, tableName=MIGRATION_MODEL		\N	4.29.1	\N	\N	6203855948
9.0.0-always-display-client	keycloak	META-INF/jpa-changelog-9.0.0.xml	2025-05-02 16:37:46.836006	77	EXECUTED	9:6335e5c94e83a2639ccd68dd24e2e5ad	addColumn tableName=CLIENT		\N	4.29.1	\N	\N	6203855948
9.0.0-drop-constraints-for-column-increase	keycloak	META-INF/jpa-changelog-9.0.0.xml	2025-05-02 16:37:46.845983	78	MARK_RAN	9:6bdb5658951e028bfe16fa0a8228b530	dropUniqueConstraint constraintName=UK_FRSR6T700S9V50BU18WS5PMT, tableName=RESOURCE_SERVER_PERM_TICKET; dropUniqueConstraint constraintName=UK_FRSR6T700S9V50BU18WS5HA6, tableName=RESOURCE_SERVER_RESOURCE; dropPrimaryKey constraintName=CONSTRAINT_O...		\N	4.29.1	\N	\N	6203855948
9.0.0-increase-column-size-federated-fk	keycloak	META-INF/jpa-changelog-9.0.0.xml	2025-05-02 16:37:46.898108	79	EXECUTED	9:d5bc15a64117ccad481ce8792d4c608f	modifyDataType columnName=CLIENT_ID, tableName=FED_USER_CONSENT; modifyDataType columnName=CLIENT_REALM_CONSTRAINT, tableName=KEYCLOAK_ROLE; modifyDataType columnName=OWNER, tableName=RESOURCE_SERVER_POLICY; modifyDataType columnName=CLIENT_ID, ta...		\N	4.29.1	\N	\N	6203855948
9.0.0-recreate-constraints-after-column-increase	keycloak	META-INF/jpa-changelog-9.0.0.xml	2025-05-02 16:37:46.903903	80	MARK_RAN	9:077cba51999515f4d3e7ad5619ab592c	addNotNullConstraint columnName=CLIENT_ID, tableName=OFFLINE_CLIENT_SESSION; addNotNullConstraint columnName=OWNER, tableName=RESOURCE_SERVER_PERM_TICKET; addNotNullConstraint columnName=REQUESTER, tableName=RESOURCE_SERVER_PERM_TICKET; addNotNull...		\N	4.29.1	\N	\N	6203855948
9.0.1-add-index-to-client.client_id	keycloak	META-INF/jpa-changelog-9.0.1.xml	2025-05-02 16:37:46.981039	81	EXECUTED	9:be969f08a163bf47c6b9e9ead8ac2afb	createIndex indexName=IDX_CLIENT_ID, tableName=CLIENT		\N	4.29.1	\N	\N	6203855948
9.0.1-KEYCLOAK-12579-drop-constraints	keycloak	META-INF/jpa-changelog-9.0.1.xml	2025-05-02 16:37:46.986135	82	MARK_RAN	9:6d3bb4408ba5a72f39bd8a0b301ec6e3	dropUniqueConstraint constraintName=SIBLING_NAMES, tableName=KEYCLOAK_GROUP		\N	4.29.1	\N	\N	6203855948
9.0.1-KEYCLOAK-12579-add-not-null-constraint	keycloak	META-INF/jpa-changelog-9.0.1.xml	2025-05-02 16:37:47.003442	83	EXECUTED	9:966bda61e46bebf3cc39518fbed52fa7	addNotNullConstraint columnName=PARENT_GROUP, tableName=KEYCLOAK_GROUP		\N	4.29.1	\N	\N	6203855948
9.0.1-KEYCLOAK-12579-recreate-constraints	keycloak	META-INF/jpa-changelog-9.0.1.xml	2025-05-02 16:37:47.008972	84	MARK_RAN	9:8dcac7bdf7378e7d823cdfddebf72fda	addUniqueConstraint constraintName=SIBLING_NAMES, tableName=KEYCLOAK_GROUP		\N	4.29.1	\N	\N	6203855948
9.0.1-add-index-to-events	keycloak	META-INF/jpa-changelog-9.0.1.xml	2025-05-02 16:37:47.123988	85	EXECUTED	9:7d93d602352a30c0c317e6a609b56599	createIndex indexName=IDX_EVENT_TIME, tableName=EVENT_ENTITY		\N	4.29.1	\N	\N	6203855948
map-remove-ri	keycloak	META-INF/jpa-changelog-11.0.0.xml	2025-05-02 16:37:47.138616	86	EXECUTED	9:71c5969e6cdd8d7b6f47cebc86d37627	dropForeignKeyConstraint baseTableName=REALM, constraintName=FK_TRAF444KK6QRKMS7N56AIWQ5Y; dropForeignKeyConstraint baseTableName=KEYCLOAK_ROLE, constraintName=FK_KJHO5LE2C0RAL09FL8CM9WFW9		\N	4.29.1	\N	\N	6203855948
map-remove-ri	keycloak	META-INF/jpa-changelog-12.0.0.xml	2025-05-02 16:37:47.160465	87	EXECUTED	9:a9ba7d47f065f041b7da856a81762021	dropForeignKeyConstraint baseTableName=REALM_DEFAULT_GROUPS, constraintName=FK_DEF_GROUPS_GROUP; dropForeignKeyConstraint baseTableName=REALM_DEFAULT_ROLES, constraintName=FK_H4WPD7W4HSOOLNI3H0SW7BTJE; dropForeignKeyConstraint baseTableName=CLIENT...		\N	4.29.1	\N	\N	6203855948
12.1.0-add-realm-localization-table	keycloak	META-INF/jpa-changelog-12.0.0.xml	2025-05-02 16:37:47.183102	88	EXECUTED	9:fffabce2bc01e1a8f5110d5278500065	createTable tableName=REALM_LOCALIZATIONS; addPrimaryKey tableName=REALM_LOCALIZATIONS		\N	4.29.1	\N	\N	6203855948
default-roles	keycloak	META-INF/jpa-changelog-13.0.0.xml	2025-05-02 16:37:47.203033	89	EXECUTED	9:fa8a5b5445e3857f4b010bafb5009957	addColumn tableName=REALM; customChange		\N	4.29.1	\N	\N	6203855948
default-roles-cleanup	keycloak	META-INF/jpa-changelog-13.0.0.xml	2025-05-02 16:37:47.220383	90	EXECUTED	9:67ac3241df9a8582d591c5ed87125f39	dropTable tableName=REALM_DEFAULT_ROLES; dropTable tableName=CLIENT_DEFAULT_ROLES		\N	4.29.1	\N	\N	6203855948
13.0.0-KEYCLOAK-16844	keycloak	META-INF/jpa-changelog-13.0.0.xml	2025-05-02 16:37:47.298819	91	EXECUTED	9:ad1194d66c937e3ffc82386c050ba089	createIndex indexName=IDX_OFFLINE_USS_PRELOAD, tableName=OFFLINE_USER_SESSION		\N	4.29.1	\N	\N	6203855948
map-remove-ri-13.0.0	keycloak	META-INF/jpa-changelog-13.0.0.xml	2025-05-02 16:37:47.323437	92	EXECUTED	9:d9be619d94af5a2f5d07b9f003543b91	dropForeignKeyConstraint baseTableName=DEFAULT_CLIENT_SCOPE, constraintName=FK_R_DEF_CLI_SCOPE_SCOPE; dropForeignKeyConstraint baseTableName=CLIENT_SCOPE_CLIENT, constraintName=FK_C_CLI_SCOPE_SCOPE; dropForeignKeyConstraint baseTableName=CLIENT_SC...		\N	4.29.1	\N	\N	6203855948
13.0.0-KEYCLOAK-17992-drop-constraints	keycloak	META-INF/jpa-changelog-13.0.0.xml	2025-05-02 16:37:47.328367	93	MARK_RAN	9:544d201116a0fcc5a5da0925fbbc3bde	dropPrimaryKey constraintName=C_CLI_SCOPE_BIND, tableName=CLIENT_SCOPE_CLIENT; dropIndex indexName=IDX_CLSCOPE_CL, tableName=CLIENT_SCOPE_CLIENT; dropIndex indexName=IDX_CL_CLSCOPE, tableName=CLIENT_SCOPE_CLIENT		\N	4.29.1	\N	\N	6203855948
13.0.0-increase-column-size-federated	keycloak	META-INF/jpa-changelog-13.0.0.xml	2025-05-02 16:37:47.350127	94	EXECUTED	9:43c0c1055b6761b4b3e89de76d612ccf	modifyDataType columnName=CLIENT_ID, tableName=CLIENT_SCOPE_CLIENT; modifyDataType columnName=SCOPE_ID, tableName=CLIENT_SCOPE_CLIENT		\N	4.29.1	\N	\N	6203855948
13.0.0-KEYCLOAK-17992-recreate-constraints	keycloak	META-INF/jpa-changelog-13.0.0.xml	2025-05-02 16:37:47.355344	95	MARK_RAN	9:8bd711fd0330f4fe980494ca43ab1139	addNotNullConstraint columnName=CLIENT_ID, tableName=CLIENT_SCOPE_CLIENT; addNotNullConstraint columnName=SCOPE_ID, tableName=CLIENT_SCOPE_CLIENT; addPrimaryKey constraintName=C_CLI_SCOPE_BIND, tableName=CLIENT_SCOPE_CLIENT; createIndex indexName=...		\N	4.29.1	\N	\N	6203855948
json-string-accomodation-fixed	keycloak	META-INF/jpa-changelog-13.0.0.xml	2025-05-02 16:37:47.373892	96	EXECUTED	9:e07d2bc0970c348bb06fb63b1f82ddbf	addColumn tableName=REALM_ATTRIBUTE; update tableName=REALM_ATTRIBUTE; dropColumn columnName=VALUE, tableName=REALM_ATTRIBUTE; renameColumn newColumnName=VALUE, oldColumnName=VALUE_NEW, tableName=REALM_ATTRIBUTE		\N	4.29.1	\N	\N	6203855948
14.0.0-KEYCLOAK-11019	keycloak	META-INF/jpa-changelog-14.0.0.xml	2025-05-02 16:37:47.579361	97	EXECUTED	9:24fb8611e97f29989bea412aa38d12b7	createIndex indexName=IDX_OFFLINE_CSS_PRELOAD, tableName=OFFLINE_CLIENT_SESSION; createIndex indexName=IDX_OFFLINE_USS_BY_USER, tableName=OFFLINE_USER_SESSION; createIndex indexName=IDX_OFFLINE_USS_BY_USERSESS, tableName=OFFLINE_USER_SESSION		\N	4.29.1	\N	\N	6203855948
14.0.0-KEYCLOAK-18286	keycloak	META-INF/jpa-changelog-14.0.0.xml	2025-05-02 16:37:47.58405	98	MARK_RAN	9:259f89014ce2506ee84740cbf7163aa7	createIndex indexName=IDX_CLIENT_ATT_BY_NAME_VALUE, tableName=CLIENT_ATTRIBUTES		\N	4.29.1	\N	\N	6203855948
14.0.0-KEYCLOAK-18286-revert	keycloak	META-INF/jpa-changelog-14.0.0.xml	2025-05-02 16:37:47.60907	99	MARK_RAN	9:04baaf56c116ed19951cbc2cca584022	dropIndex indexName=IDX_CLIENT_ATT_BY_NAME_VALUE, tableName=CLIENT_ATTRIBUTES		\N	4.29.1	\N	\N	6203855948
14.0.0-KEYCLOAK-18286-supported-dbs	keycloak	META-INF/jpa-changelog-14.0.0.xml	2025-05-02 16:37:47.707349	100	EXECUTED	9:60ca84a0f8c94ec8c3504a5a3bc88ee8	createIndex indexName=IDX_CLIENT_ATT_BY_NAME_VALUE, tableName=CLIENT_ATTRIBUTES		\N	4.29.1	\N	\N	6203855948
14.0.0-KEYCLOAK-18286-unsupported-dbs	keycloak	META-INF/jpa-changelog-14.0.0.xml	2025-05-02 16:37:47.71299	101	MARK_RAN	9:d3d977031d431db16e2c181ce49d73e9	createIndex indexName=IDX_CLIENT_ATT_BY_NAME_VALUE, tableName=CLIENT_ATTRIBUTES		\N	4.29.1	\N	\N	6203855948
KEYCLOAK-17267-add-index-to-user-attributes	keycloak	META-INF/jpa-changelog-14.0.0.xml	2025-05-02 16:37:47.793681	102	EXECUTED	9:0b305d8d1277f3a89a0a53a659ad274c	createIndex indexName=IDX_USER_ATTRIBUTE_NAME, tableName=USER_ATTRIBUTE		\N	4.29.1	\N	\N	6203855948
KEYCLOAK-18146-add-saml-art-binding-identifier	keycloak	META-INF/jpa-changelog-14.0.0.xml	2025-05-02 16:37:47.811048	103	EXECUTED	9:2c374ad2cdfe20e2905a84c8fac48460	customChange		\N	4.29.1	\N	\N	6203855948
15.0.0-KEYCLOAK-18467	keycloak	META-INF/jpa-changelog-15.0.0.xml	2025-05-02 16:37:47.832941	104	EXECUTED	9:47a760639ac597360a8219f5b768b4de	addColumn tableName=REALM_LOCALIZATIONS; update tableName=REALM_LOCALIZATIONS; dropColumn columnName=TEXTS, tableName=REALM_LOCALIZATIONS; renameColumn newColumnName=TEXTS, oldColumnName=TEXTS_NEW, tableName=REALM_LOCALIZATIONS; addNotNullConstrai...		\N	4.29.1	\N	\N	6203855948
17.0.0-9562	keycloak	META-INF/jpa-changelog-17.0.0.xml	2025-05-02 16:37:47.931236	105	EXECUTED	9:a6272f0576727dd8cad2522335f5d99e	createIndex indexName=IDX_USER_SERVICE_ACCOUNT, tableName=USER_ENTITY		\N	4.29.1	\N	\N	6203855948
18.0.0-10625-IDX_ADMIN_EVENT_TIME	keycloak	META-INF/jpa-changelog-18.0.0.xml	2025-05-02 16:37:48.013028	106	EXECUTED	9:015479dbd691d9cc8669282f4828c41d	createIndex indexName=IDX_ADMIN_EVENT_TIME, tableName=ADMIN_EVENT_ENTITY		\N	4.29.1	\N	\N	6203855948
18.0.15-30992-index-consent	keycloak	META-INF/jpa-changelog-18.0.15.xml	2025-05-02 16:37:48.097799	107	EXECUTED	9:80071ede7a05604b1f4906f3bf3b00f0	createIndex indexName=IDX_USCONSENT_SCOPE_ID, tableName=USER_CONSENT_CLIENT_SCOPE		\N	4.29.1	\N	\N	6203855948
19.0.0-10135	keycloak	META-INF/jpa-changelog-19.0.0.xml	2025-05-02 16:37:48.11455	108	EXECUTED	9:9518e495fdd22f78ad6425cc30630221	customChange		\N	4.29.1	\N	\N	6203855948
20.0.0-12964-supported-dbs	keycloak	META-INF/jpa-changelog-20.0.0.xml	2025-05-02 16:37:48.190328	109	EXECUTED	9:e5f243877199fd96bcc842f27a1656ac	createIndex indexName=IDX_GROUP_ATT_BY_NAME_VALUE, tableName=GROUP_ATTRIBUTE		\N	4.29.1	\N	\N	6203855948
20.0.0-12964-unsupported-dbs	keycloak	META-INF/jpa-changelog-20.0.0.xml	2025-05-02 16:37:48.195254	110	MARK_RAN	9:1a6fcaa85e20bdeae0a9ce49b41946a5	createIndex indexName=IDX_GROUP_ATT_BY_NAME_VALUE, tableName=GROUP_ATTRIBUTE		\N	4.29.1	\N	\N	6203855948
client-attributes-string-accomodation-fixed	keycloak	META-INF/jpa-changelog-20.0.0.xml	2025-05-02 16:37:48.222945	111	EXECUTED	9:3f332e13e90739ed0c35b0b25b7822ca	addColumn tableName=CLIENT_ATTRIBUTES; update tableName=CLIENT_ATTRIBUTES; dropColumn columnName=VALUE, tableName=CLIENT_ATTRIBUTES; renameColumn newColumnName=VALUE, oldColumnName=VALUE_NEW, tableName=CLIENT_ATTRIBUTES		\N	4.29.1	\N	\N	6203855948
21.0.2-17277	keycloak	META-INF/jpa-changelog-21.0.2.xml	2025-05-02 16:37:48.241034	112	EXECUTED	9:7ee1f7a3fb8f5588f171fb9a6ab623c0	customChange		\N	4.29.1	\N	\N	6203855948
21.1.0-19404	keycloak	META-INF/jpa-changelog-21.1.0.xml	2025-05-02 16:37:48.288008	113	EXECUTED	9:3d7e830b52f33676b9d64f7f2b2ea634	modifyDataType columnName=DECISION_STRATEGY, tableName=RESOURCE_SERVER_POLICY; modifyDataType columnName=LOGIC, tableName=RESOURCE_SERVER_POLICY; modifyDataType columnName=POLICY_ENFORCE_MODE, tableName=RESOURCE_SERVER		\N	4.29.1	\N	\N	6203855948
21.1.0-19404-2	keycloak	META-INF/jpa-changelog-21.1.0.xml	2025-05-02 16:37:48.294943	114	MARK_RAN	9:627d032e3ef2c06c0e1f73d2ae25c26c	addColumn tableName=RESOURCE_SERVER_POLICY; update tableName=RESOURCE_SERVER_POLICY; dropColumn columnName=DECISION_STRATEGY, tableName=RESOURCE_SERVER_POLICY; renameColumn newColumnName=DECISION_STRATEGY, oldColumnName=DECISION_STRATEGY_NEW, tabl...		\N	4.29.1	\N	\N	6203855948
22.0.0-17484-updated	keycloak	META-INF/jpa-changelog-22.0.0.xml	2025-05-02 16:37:48.311889	115	EXECUTED	9:90af0bfd30cafc17b9f4d6eccd92b8b3	customChange		\N	4.29.1	\N	\N	6203855948
22.0.5-24031	keycloak	META-INF/jpa-changelog-22.0.0.xml	2025-05-02 16:37:48.316401	116	MARK_RAN	9:a60d2d7b315ec2d3eba9e2f145f9df28	customChange		\N	4.29.1	\N	\N	6203855948
23.0.0-12062	keycloak	META-INF/jpa-changelog-23.0.0.xml	2025-05-02 16:37:48.335593	117	EXECUTED	9:2168fbe728fec46ae9baf15bf80927b8	addColumn tableName=COMPONENT_CONFIG; update tableName=COMPONENT_CONFIG; dropColumn columnName=VALUE, tableName=COMPONENT_CONFIG; renameColumn newColumnName=VALUE, oldColumnName=VALUE_NEW, tableName=COMPONENT_CONFIG		\N	4.29.1	\N	\N	6203855948
23.0.0-17258	keycloak	META-INF/jpa-changelog-23.0.0.xml	2025-05-02 16:37:48.347021	118	EXECUTED	9:36506d679a83bbfda85a27ea1864dca8	addColumn tableName=EVENT_ENTITY		\N	4.29.1	\N	\N	6203855948
24.0.0-9758	keycloak	META-INF/jpa-changelog-24.0.0.xml	2025-05-02 16:37:48.63509	119	EXECUTED	9:502c557a5189f600f0f445a9b49ebbce	addColumn tableName=USER_ATTRIBUTE; addColumn tableName=FED_USER_ATTRIBUTE; createIndex indexName=USER_ATTR_LONG_VALUES, tableName=USER_ATTRIBUTE; createIndex indexName=FED_USER_ATTR_LONG_VALUES, tableName=FED_USER_ATTRIBUTE; createIndex indexName...		\N	4.29.1	\N	\N	6203855948
24.0.0-9758-2	keycloak	META-INF/jpa-changelog-24.0.0.xml	2025-05-02 16:37:48.649416	120	EXECUTED	9:bf0fdee10afdf597a987adbf291db7b2	customChange		\N	4.29.1	\N	\N	6203855948
24.0.0-26618-drop-index-if-present	keycloak	META-INF/jpa-changelog-24.0.0.xml	2025-05-02 16:37:48.662953	121	MARK_RAN	9:04baaf56c116ed19951cbc2cca584022	dropIndex indexName=IDX_CLIENT_ATT_BY_NAME_VALUE, tableName=CLIENT_ATTRIBUTES		\N	4.29.1	\N	\N	6203855948
24.0.0-26618-reindex	keycloak	META-INF/jpa-changelog-24.0.0.xml	2025-05-02 16:37:48.740019	122	EXECUTED	9:08707c0f0db1cef6b352db03a60edc7f	createIndex indexName=IDX_CLIENT_ATT_BY_NAME_VALUE, tableName=CLIENT_ATTRIBUTES		\N	4.29.1	\N	\N	6203855948
24.0.2-27228	keycloak	META-INF/jpa-changelog-24.0.2.xml	2025-05-02 16:37:48.75421	123	EXECUTED	9:eaee11f6b8aa25d2cc6a84fb86fc6238	customChange		\N	4.29.1	\N	\N	6203855948
24.0.2-27967-drop-index-if-present	keycloak	META-INF/jpa-changelog-24.0.2.xml	2025-05-02 16:37:48.758644	124	MARK_RAN	9:04baaf56c116ed19951cbc2cca584022	dropIndex indexName=IDX_CLIENT_ATT_BY_NAME_VALUE, tableName=CLIENT_ATTRIBUTES		\N	4.29.1	\N	\N	6203855948
24.0.2-27967-reindex	keycloak	META-INF/jpa-changelog-24.0.2.xml	2025-05-02 16:37:48.765235	125	MARK_RAN	9:d3d977031d431db16e2c181ce49d73e9	createIndex indexName=IDX_CLIENT_ATT_BY_NAME_VALUE, tableName=CLIENT_ATTRIBUTES		\N	4.29.1	\N	\N	6203855948
25.0.0-28265-tables	keycloak	META-INF/jpa-changelog-25.0.0.xml	2025-05-02 16:37:48.792424	126	EXECUTED	9:deda2df035df23388af95bbd36c17cef	addColumn tableName=OFFLINE_USER_SESSION; addColumn tableName=OFFLINE_CLIENT_SESSION		\N	4.29.1	\N	\N	6203855948
25.0.0-28265-index-creation	keycloak	META-INF/jpa-changelog-25.0.0.xml	2025-05-02 16:37:48.864024	127	EXECUTED	9:3e96709818458ae49f3c679ae58d263a	createIndex indexName=IDX_OFFLINE_USS_BY_LAST_SESSION_REFRESH, tableName=OFFLINE_USER_SESSION		\N	4.29.1	\N	\N	6203855948
25.0.0-28265-index-cleanup-uss-createdon	keycloak	META-INF/jpa-changelog-25.0.0.xml	2025-05-02 16:37:48.986778	128	EXECUTED	9:78ab4fc129ed5e8265dbcc3485fba92f	dropIndex indexName=IDX_OFFLINE_USS_CREATEDON, tableName=OFFLINE_USER_SESSION		\N	4.29.1	\N	\N	6203855948
25.0.0-28265-index-cleanup-uss-preload	keycloak	META-INF/jpa-changelog-25.0.0.xml	2025-05-02 16:37:49.07769	129	EXECUTED	9:de5f7c1f7e10994ed8b62e621d20eaab	dropIndex indexName=IDX_OFFLINE_USS_PRELOAD, tableName=OFFLINE_USER_SESSION		\N	4.29.1	\N	\N	6203855948
25.0.0-28265-index-cleanup-uss-by-usersess	keycloak	META-INF/jpa-changelog-25.0.0.xml	2025-05-02 16:37:49.178468	130	EXECUTED	9:6eee220d024e38e89c799417ec33667f	dropIndex indexName=IDX_OFFLINE_USS_BY_USERSESS, tableName=OFFLINE_USER_SESSION		\N	4.29.1	\N	\N	6203855948
25.0.0-28265-index-cleanup-css-preload	keycloak	META-INF/jpa-changelog-25.0.0.xml	2025-05-02 16:37:49.259074	131	EXECUTED	9:5411d2fb2891d3e8d63ddb55dfa3c0c9	dropIndex indexName=IDX_OFFLINE_CSS_PRELOAD, tableName=OFFLINE_CLIENT_SESSION		\N	4.29.1	\N	\N	6203855948
25.0.0-28265-index-2-mysql	keycloak	META-INF/jpa-changelog-25.0.0.xml	2025-05-02 16:37:49.26381	132	MARK_RAN	9:b7ef76036d3126bb83c2423bf4d449d6	createIndex indexName=IDX_OFFLINE_USS_BY_BROKER_SESSION_ID, tableName=OFFLINE_USER_SESSION		\N	4.29.1	\N	\N	6203855948
25.0.0-28265-index-2-not-mysql	keycloak	META-INF/jpa-changelog-25.0.0.xml	2025-05-02 16:37:49.347472	133	EXECUTED	9:23396cf51ab8bc1ae6f0cac7f9f6fcf7	createIndex indexName=IDX_OFFLINE_USS_BY_BROKER_SESSION_ID, tableName=OFFLINE_USER_SESSION		\N	4.29.1	\N	\N	6203855948
25.0.0-org	keycloak	META-INF/jpa-changelog-25.0.0.xml	2025-05-02 16:37:49.391771	134	EXECUTED	9:5c859965c2c9b9c72136c360649af157	createTable tableName=ORG; addUniqueConstraint constraintName=UK_ORG_NAME, tableName=ORG; addUniqueConstraint constraintName=UK_ORG_GROUP, tableName=ORG; createTable tableName=ORG_DOMAIN		\N	4.29.1	\N	\N	6203855948
unique-consentuser	keycloak	META-INF/jpa-changelog-25.0.0.xml	2025-05-02 16:37:49.435796	135	EXECUTED	9:5857626a2ea8767e9a6c66bf3a2cb32f	customChange; dropUniqueConstraint constraintName=UK_JKUWUVD56ONTGSUHOGM8UEWRT, tableName=USER_CONSENT; addUniqueConstraint constraintName=UK_LOCAL_CONSENT, tableName=USER_CONSENT; addUniqueConstraint constraintName=UK_EXTERNAL_CONSENT, tableName=...		\N	4.29.1	\N	\N	6203855948
unique-consentuser-mysql	keycloak	META-INF/jpa-changelog-25.0.0.xml	2025-05-02 16:37:49.441096	136	MARK_RAN	9:b79478aad5adaa1bc428e31563f55e8e	customChange; dropUniqueConstraint constraintName=UK_JKUWUVD56ONTGSUHOGM8UEWRT, tableName=USER_CONSENT; addUniqueConstraint constraintName=UK_LOCAL_CONSENT, tableName=USER_CONSENT; addUniqueConstraint constraintName=UK_EXTERNAL_CONSENT, tableName=...		\N	4.29.1	\N	\N	6203855948
25.0.0-28861-index-creation	keycloak	META-INF/jpa-changelog-25.0.0.xml	2025-05-02 16:37:49.603371	137	EXECUTED	9:b9acb58ac958d9ada0fe12a5d4794ab1	createIndex indexName=IDX_PERM_TICKET_REQUESTER, tableName=RESOURCE_SERVER_PERM_TICKET; createIndex indexName=IDX_PERM_TICKET_OWNER, tableName=RESOURCE_SERVER_PERM_TICKET		\N	4.29.1	\N	\N	6203855948
26.0.0-org-alias	keycloak	META-INF/jpa-changelog-26.0.0.xml	2025-05-02 16:37:49.623837	138	EXECUTED	9:6ef7d63e4412b3c2d66ed179159886a4	addColumn tableName=ORG; update tableName=ORG; addNotNullConstraint columnName=ALIAS, tableName=ORG; addUniqueConstraint constraintName=UK_ORG_ALIAS, tableName=ORG		\N	4.29.1	\N	\N	6203855948
26.0.0-org-group	keycloak	META-INF/jpa-changelog-26.0.0.xml	2025-05-02 16:37:49.646467	139	EXECUTED	9:da8e8087d80ef2ace4f89d8c5b9ca223	addColumn tableName=KEYCLOAK_GROUP; update tableName=KEYCLOAK_GROUP; addNotNullConstraint columnName=TYPE, tableName=KEYCLOAK_GROUP; customChange		\N	4.29.1	\N	\N	6203855948
26.0.0-org-indexes	keycloak	META-INF/jpa-changelog-26.0.0.xml	2025-05-02 16:37:49.726865	140	EXECUTED	9:79b05dcd610a8c7f25ec05135eec0857	createIndex indexName=IDX_ORG_DOMAIN_ORG_ID, tableName=ORG_DOMAIN		\N	4.29.1	\N	\N	6203855948
26.0.0-org-group-membership	keycloak	META-INF/jpa-changelog-26.0.0.xml	2025-05-02 16:37:49.7464	141	EXECUTED	9:a6ace2ce583a421d89b01ba2a28dc2d4	addColumn tableName=USER_GROUP_MEMBERSHIP; update tableName=USER_GROUP_MEMBERSHIP; addNotNullConstraint columnName=MEMBERSHIP_TYPE, tableName=USER_GROUP_MEMBERSHIP		\N	4.29.1	\N	\N	6203855948
31296-persist-revoked-access-tokens	keycloak	META-INF/jpa-changelog-26.0.0.xml	2025-05-02 16:37:49.763645	142	EXECUTED	9:64ef94489d42a358e8304b0e245f0ed4	createTable tableName=REVOKED_TOKEN; addPrimaryKey constraintName=CONSTRAINT_RT, tableName=REVOKED_TOKEN		\N	4.29.1	\N	\N	6203855948
31725-index-persist-revoked-access-tokens	keycloak	META-INF/jpa-changelog-26.0.0.xml	2025-05-02 16:37:49.842029	143	EXECUTED	9:b994246ec2bf7c94da881e1d28782c7b	createIndex indexName=IDX_REV_TOKEN_ON_EXPIRE, tableName=REVOKED_TOKEN		\N	4.29.1	\N	\N	6203855948
26.0.0-idps-for-login	keycloak	META-INF/jpa-changelog-26.0.0.xml	2025-05-02 16:37:50.006521	144	EXECUTED	9:51f5fffadf986983d4bd59582c6c1604	addColumn tableName=IDENTITY_PROVIDER; createIndex indexName=IDX_IDP_REALM_ORG, tableName=IDENTITY_PROVIDER; createIndex indexName=IDX_IDP_FOR_LOGIN, tableName=IDENTITY_PROVIDER; customChange		\N	4.29.1	\N	\N	6203855948
26.0.0-32583-drop-redundant-index-on-client-session	keycloak	META-INF/jpa-changelog-26.0.0.xml	2025-05-02 16:37:50.087639	145	EXECUTED	9:24972d83bf27317a055d234187bb4af9	dropIndex indexName=IDX_US_SESS_ID_ON_CL_SESS, tableName=OFFLINE_CLIENT_SESSION		\N	4.29.1	\N	\N	6203855948
26.0.0.32582-remove-tables-user-session-user-session-note-and-client-session	keycloak	META-INF/jpa-changelog-26.0.0.xml	2025-05-02 16:37:50.117876	146	EXECUTED	9:febdc0f47f2ed241c59e60f58c3ceea5	dropTable tableName=CLIENT_SESSION_ROLE; dropTable tableName=CLIENT_SESSION_NOTE; dropTable tableName=CLIENT_SESSION_PROT_MAPPER; dropTable tableName=CLIENT_SESSION_AUTH_STATUS; dropTable tableName=CLIENT_USER_SESSION_NOTE; dropTable tableName=CLI...		\N	4.29.1	\N	\N	6203855948
26.0.0-33201-org-redirect-url	keycloak	META-INF/jpa-changelog-26.0.0.xml	2025-05-02 16:37:50.128316	147	EXECUTED	9:4d0e22b0ac68ebe9794fa9cb752ea660	addColumn tableName=ORG		\N	4.29.1	\N	\N	6203855948
29399-jdbc-ping-default	keycloak	META-INF/jpa-changelog-26.1.0.xml	2025-05-02 16:37:50.150646	148	EXECUTED	9:007dbe99d7203fca403b89d4edfdf21e	createTable tableName=JGROUPS_PING; addPrimaryKey constraintName=CONSTRAINT_JGROUPS_PING, tableName=JGROUPS_PING		\N	4.29.1	\N	\N	6203855948
26.1.0-34013	keycloak	META-INF/jpa-changelog-26.1.0.xml	2025-05-02 16:37:50.178106	149	EXECUTED	9:e6b686a15759aef99a6d758a5c4c6a26	addColumn tableName=ADMIN_EVENT_ENTITY		\N	4.29.1	\N	\N	6203855948
26.1.0-34380	keycloak	META-INF/jpa-changelog-26.1.0.xml	2025-05-02 16:37:50.190653	150	EXECUTED	9:ac8b9edb7c2b6c17a1c7a11fcf5ccf01	dropTable tableName=USERNAME_LOGIN_FAILURE		\N	4.29.1	\N	\N	6203855948
26.2.0-36750	keycloak	META-INF/jpa-changelog-26.2.0.xml	2025-05-21 16:53:20.667292	151	EXECUTED	9:b49ce951c22f7eb16480ff085640a33a	createTable tableName=SERVER_CONFIG		\N	4.29.1	\N	\N	7846400589
26.2.0-26106	keycloak	META-INF/jpa-changelog-26.2.0.xml	2025-05-21 16:53:20.69374	152	EXECUTED	9:b5877d5dab7d10ff3a9d209d7beb6680	addColumn tableName=CREDENTIAL		\N	4.29.1	\N	\N	7846400589
\.


--
-- TOC entry 4626 (class 0 OID 20427)
-- Dependencies: 235
-- Data for Name: databasechangeloglock; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.databasechangeloglock (id, locked, lockgranted, lockedby) FROM stdin;
1	f	\N	\N
1000	f	\N	\N
\.


--
-- TOC entry 4627 (class 0 OID 20430)
-- Dependencies: 236
-- Data for Name: default_client_scope; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.default_client_scope (realm_id, scope_id, default_scope) FROM stdin;
573be4f5-590a-4831-a3f3-de3d8f56ec34	ff5ca93d-f24d-4468-9f96-8d521ffb0076	f
573be4f5-590a-4831-a3f3-de3d8f56ec34	130302b0-f33a-4cab-a3c7-81aa77cca5c7	t
573be4f5-590a-4831-a3f3-de3d8f56ec34	c31504ee-a58b-4343-833e-211d08b51f31	t
573be4f5-590a-4831-a3f3-de3d8f56ec34	044580e6-4102-40fe-9836-2991d3f075f2	t
573be4f5-590a-4831-a3f3-de3d8f56ec34	39295a49-c2bb-424a-8767-31eb4e1241f8	t
573be4f5-590a-4831-a3f3-de3d8f56ec34	2444797a-cef5-423f-84c2-1bcf18463c50	f
573be4f5-590a-4831-a3f3-de3d8f56ec34	d30a3ad8-3e3a-48a3-b948-fcf5dcc6fb27	f
573be4f5-590a-4831-a3f3-de3d8f56ec34	48046a02-0c54-4c9e-8c29-0b48a5d8e117	t
573be4f5-590a-4831-a3f3-de3d8f56ec34	c6c8297c-63f1-4351-ae06-b2dad755c2a2	t
573be4f5-590a-4831-a3f3-de3d8f56ec34	facf04fc-0c55-42de-8b27-38643f70a4cb	f
573be4f5-590a-4831-a3f3-de3d8f56ec34	6ce39ed5-237a-4d80-85d1-e5712dd944aa	t
573be4f5-590a-4831-a3f3-de3d8f56ec34	1f592d4d-f33b-41b1-933a-482898529356	t
573be4f5-590a-4831-a3f3-de3d8f56ec34	ea6978f8-6865-42eb-859c-37b8b5ace27e	f
95b0b755-b0d8-46d1-99b5-be385e3fa5c4	5a2ac8cb-3aa9-4f12-8400-c0021beffb6a	f
95b0b755-b0d8-46d1-99b5-be385e3fa5c4	0e0554ff-e972-496b-b654-e23f274e0949	t
95b0b755-b0d8-46d1-99b5-be385e3fa5c4	9d1d4914-5b58-4984-9807-607bd63df1ee	t
95b0b755-b0d8-46d1-99b5-be385e3fa5c4	5a99839f-54f3-4be4-a839-b029dcde8f43	t
95b0b755-b0d8-46d1-99b5-be385e3fa5c4	515895da-74fd-4887-8293-5ac2cbb87a5f	t
95b0b755-b0d8-46d1-99b5-be385e3fa5c4	9c4548f1-e800-4dd3-9a36-b52f29f17c61	f
95b0b755-b0d8-46d1-99b5-be385e3fa5c4	cd92d463-3238-4d50-908e-0d88020bf94e	f
95b0b755-b0d8-46d1-99b5-be385e3fa5c4	4d256b34-ff7d-4590-9de4-57609db56d1e	t
95b0b755-b0d8-46d1-99b5-be385e3fa5c4	5849f091-d0bb-4730-b1fd-260f2e8db73a	t
95b0b755-b0d8-46d1-99b5-be385e3fa5c4	20821262-da6a-4d55-9e5f-57197f34931d	f
95b0b755-b0d8-46d1-99b5-be385e3fa5c4	35bb7087-3a55-4460-a6aa-a06acb87c69b	t
95b0b755-b0d8-46d1-99b5-be385e3fa5c4	f32a470f-d1ef-4c47-ae5e-70461fbd50cd	t
95b0b755-b0d8-46d1-99b5-be385e3fa5c4	902d06b8-881b-4eb7-b395-d06dfeb83723	f
726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	adbe720e-4271-4ecd-89ba-16a4999c1b03	f
726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	f23dd18b-4519-47eb-b83f-320d1184c9f5	t
726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	a51118b2-5916-45e6-a4eb-07deddeb94e8	t
726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	53de374b-ee75-4e89-bd5e-76b5e97e931e	t
726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	5729b064-c40f-45da-9202-334565727841	t
726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	59feeae9-fd9d-44ce-9a75-ffa91737c7c8	f
726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	9e678102-7b31-4b29-90e6-24ccedb0134e	f
726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	30a52cff-a647-4c73-9846-e4db810c824f	t
726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	43f1ac4e-a381-4a52-9803-afed159cb010	t
726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	d7bc7861-2a5e-4104-a580-d4ab42afd3d2	f
726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	ade43b57-68a1-4a09-a60f-35758c3f5a87	t
726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	e0c0563b-1b78-4c49-9e1e-950a58c718e5	t
726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	af43d9c6-5314-4697-a024-5039f5402435	f
\.


--
-- TOC entry 4628 (class 0 OID 20434)
-- Dependencies: 237
-- Data for Name: event_entity; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.event_entity (id, client_id, details_json, error, ip_address, realm_id, session_id, event_time, type, user_id, details_json_long_value) FROM stdin;
\.


--
-- TOC entry 4629 (class 0 OID 20439)
-- Dependencies: 238
-- Data for Name: fed_user_attribute; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.fed_user_attribute (id, name, user_id, realm_id, storage_provider_id, value, long_value_hash, long_value_hash_lower_case, long_value) FROM stdin;
\.


--
-- TOC entry 4630 (class 0 OID 20444)
-- Dependencies: 239
-- Data for Name: fed_user_consent; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.fed_user_consent (id, client_id, user_id, realm_id, storage_provider_id, created_date, last_updated_date, client_storage_provider, external_client_id) FROM stdin;
\.


--
-- TOC entry 4631 (class 0 OID 20449)
-- Dependencies: 240
-- Data for Name: fed_user_consent_cl_scope; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.fed_user_consent_cl_scope (user_consent_id, scope_id) FROM stdin;
\.


--
-- TOC entry 4632 (class 0 OID 20452)
-- Dependencies: 241
-- Data for Name: fed_user_credential; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.fed_user_credential (id, salt, type, created_date, user_id, realm_id, storage_provider_id, user_label, secret_data, credential_data, priority) FROM stdin;
\.


--
-- TOC entry 4633 (class 0 OID 20457)
-- Dependencies: 242
-- Data for Name: fed_user_group_membership; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.fed_user_group_membership (group_id, user_id, realm_id, storage_provider_id) FROM stdin;
\.


--
-- TOC entry 4634 (class 0 OID 20460)
-- Dependencies: 243
-- Data for Name: fed_user_required_action; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.fed_user_required_action (required_action, user_id, realm_id, storage_provider_id) FROM stdin;
\.


--
-- TOC entry 4635 (class 0 OID 20466)
-- Dependencies: 244
-- Data for Name: fed_user_role_mapping; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.fed_user_role_mapping (role_id, user_id, realm_id, storage_provider_id) FROM stdin;
\.


--
-- TOC entry 4636 (class 0 OID 20469)
-- Dependencies: 245
-- Data for Name: federated_identity; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.federated_identity (identity_provider, realm_id, federated_user_id, federated_username, token, user_id) FROM stdin;
\.


--
-- TOC entry 4637 (class 0 OID 20474)
-- Dependencies: 246
-- Data for Name: federated_user; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.federated_user (id, storage_provider_id, realm_id) FROM stdin;
\.


--
-- TOC entry 4638 (class 0 OID 20479)
-- Dependencies: 247
-- Data for Name: group_attribute; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.group_attribute (id, name, value, group_id) FROM stdin;
\.


--
-- TOC entry 4639 (class 0 OID 20485)
-- Dependencies: 248
-- Data for Name: group_role_mapping; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.group_role_mapping (role_id, group_id) FROM stdin;
a03995ab-bf71-4a9b-b505-50c715cd4db1	522f378e-690e-465c-8683-f620355ce402
8bf86b7b-d467-4c68-9f3b-17ef3e65f92e	522f378e-690e-465c-8683-f620355ce402
dd2a15ab-2066-46dc-b4ea-05ef6bd11e54	522f378e-690e-465c-8683-f620355ce402
\.


--
-- TOC entry 4640 (class 0 OID 20488)
-- Dependencies: 249
-- Data for Name: identity_provider; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.identity_provider (internal_id, enabled, provider_alias, provider_id, store_token, authenticate_by_default, realm_id, add_token_role, trust_email, first_broker_login_flow_id, post_broker_login_flow_id, provider_display_name, link_only, organization_id, hide_on_login) FROM stdin;
cc407588-d5eb-45c1-b838-f5d18d7bfc07	f	google	google	f	f	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	f	f	c21873f4-703b-4070-99cb-e39542826529	\N		f	\N	f
159e666d-5750-4708-a96d-63cc4859763b	f	microsoft	microsoft	f	f	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	f	f	c21873f4-703b-4070-99cb-e39542826529	\N		f	\N	f
aafb0cc3-e61e-405f-a3e0-b04c347bada4	f	linkedin-openid-connect	linkedin-openid-connect	f	f	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	f	f	c21873f4-703b-4070-99cb-e39542826529	\N		f	\N	f
db56b1bb-09f8-4abe-a265-c976bccea431	t	keycloak-oidc	keycloak-oidc	f	f	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	f	f	c21873f4-703b-4070-99cb-e39542826529	\N	Life Science RI	f	\N	f
\.


--
-- TOC entry 4641 (class 0 OID 20500)
-- Dependencies: 250
-- Data for Name: identity_provider_config; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.identity_provider_config (identity_provider_id, value, name) FROM stdin;
cc407588-d5eb-45c1-b838-f5d18d7bfc07	false	acceptsPromptNoneForwardFromClient
cc407588-d5eb-45c1-b838-f5d18d7bfc07	987760029877-dl5s5t73g9c5e7vll300b3bcd9t3fier.apps.googleusercontent.com	clientId
cc407588-d5eb-45c1-b838-f5d18d7bfc07	false	disableUserInfo
cc407588-d5eb-45c1-b838-f5d18d7bfc07	false	filteredByClaim
cc407588-d5eb-45c1-b838-f5d18d7bfc07	IMPORT	syncMode
cc407588-d5eb-45c1-b838-f5d18d7bfc07	**********	clientSecret
cc407588-d5eb-45c1-b838-f5d18d7bfc07	false	caseSensitiveOriginalUsername
159e666d-5750-4708-a96d-63cc4859763b	false	acceptsPromptNoneForwardFromClient
159e666d-5750-4708-a96d-63cc4859763b	347b60e4-d2ab-4512-97fe-6e77880d03ae	clientId
159e666d-5750-4708-a96d-63cc4859763b	false	disableUserInfo
159e666d-5750-4708-a96d-63cc4859763b	false	filteredByClaim
159e666d-5750-4708-a96d-63cc4859763b	IMPORT	syncMode
159e666d-5750-4708-a96d-63cc4859763b	**********	clientSecret
159e666d-5750-4708-a96d-63cc4859763b	false	caseSensitiveOriginalUsername
aafb0cc3-e61e-405f-a3e0-b04c347bada4	785q9k73tdgbmv	clientId
aafb0cc3-e61e-405f-a3e0-b04c347bada4	false	acceptsPromptNoneForwardFromClient
aafb0cc3-e61e-405f-a3e0-b04c347bada4	false	disableUserInfo
aafb0cc3-e61e-405f-a3e0-b04c347bada4	LEGACY	syncMode
aafb0cc3-e61e-405f-a3e0-b04c347bada4	false	filteredByClaim
aafb0cc3-e61e-405f-a3e0-b04c347bada4	**********	clientSecret
aafb0cc3-e61e-405f-a3e0-b04c347bada4	false	caseSensitiveOriginalUsername
db56b1bb-09f8-4abe-a265-c976bccea431	false	acceptsPromptNoneForwardFromClient
db56b1bb-09f8-4abe-a265-c976bccea431	https://login.aai.lifescience-ri.eu/oidc/token	tokenUrl
db56b1bb-09f8-4abe-a265-c976bccea431	true	isAccessTokenJWT
db56b1bb-09f8-4abe-a265-c976bccea431	https://login.aai.lifescience-ri.eu/oidc/jwk	jwksUrl
db56b1bb-09f8-4abe-a265-c976bccea431	false	filteredByClaim
db56b1bb-09f8-4abe-a265-c976bccea431	false	backchannelSupported
db56b1bb-09f8-4abe-a265-c976bccea431	false	caseSensitiveOriginalUsername
db56b1bb-09f8-4abe-a265-c976bccea431	https://login.aai.lifescience-ri.eu/oidc/	issuer
db56b1bb-09f8-4abe-a265-c976bccea431	false	loginHint
db56b1bb-09f8-4abe-a265-c976bccea431	client_secret_post	clientAuthMethod
db56b1bb-09f8-4abe-a265-c976bccea431	IMPORT	syncMode
db56b1bb-09f8-4abe-a265-c976bccea431	**********	clientSecret
db56b1bb-09f8-4abe-a265-c976bccea431	0	allowedClockSkew
db56b1bb-09f8-4abe-a265-c976bccea431	0	guiOrder
db56b1bb-09f8-4abe-a265-c976bccea431	https://login.aai.lifescience-ri.eu/oidc/userinfo	userInfoUrl
db56b1bb-09f8-4abe-a265-c976bccea431	true	validateSignature
db56b1bb-09f8-4abe-a265-c976bccea431	985be126-5d6c-49b3-aec8-a8767968e39f	clientId
db56b1bb-09f8-4abe-a265-c976bccea431	false	uiLocales
db56b1bb-09f8-4abe-a265-c976bccea431	false	disableNonce
db56b1bb-09f8-4abe-a265-c976bccea431	true	useJwksUrl
db56b1bb-09f8-4abe-a265-c976bccea431	false	sendClientIdOnLogout
db56b1bb-09f8-4abe-a265-c976bccea431	false	pkceEnabled
db56b1bb-09f8-4abe-a265-c976bccea431	https://login.aai.lifescience-ri.eu/oidc/authorize	authorizationUrl
db56b1bb-09f8-4abe-a265-c976bccea431	false	disableUserInfo
db56b1bb-09f8-4abe-a265-c976bccea431	https://login.aai.lifescience-ri.eu/oidc/endsession	logoutUrl
db56b1bb-09f8-4abe-a265-c976bccea431	true	sendIdTokenOnLogout
db56b1bb-09f8-4abe-a265-c976bccea431	false	passMaxAge
db56b1bb-09f8-4abe-a265-c976bccea431	false	disableTypeClaimCheck
\.


--
-- TOC entry 4642 (class 0 OID 20505)
-- Dependencies: 251
-- Data for Name: identity_provider_mapper; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.identity_provider_mapper (id, name, idp_alias, idp_mapper_name, realm_id) FROM stdin;
\.


--
-- TOC entry 4643 (class 0 OID 20510)
-- Dependencies: 252
-- Data for Name: idp_mapper_config; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.idp_mapper_config (idp_mapper_id, value, name) FROM stdin;
\.


--
-- TOC entry 4644 (class 0 OID 20515)
-- Dependencies: 253
-- Data for Name: jgroups_ping; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.jgroups_ping (address, name, cluster_name, ip, coord) FROM stdin;
uuid://b5c21a82-5d80-49ef-b22f-05be9e419809	45748de94828-32273	ISPN	172.17.0.2:7800	t
\.


--
-- TOC entry 4645 (class 0 OID 20520)
-- Dependencies: 254
-- Data for Name: keycloak_group; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.keycloak_group (id, name, parent_group, realm_id, type) FROM stdin;
1f549a58-aeae-40e6-9d88-12a990b4b423	Custodians	 	573be4f5-590a-4831-a3f3-de3d8f56ec34	0
d223a3ab-38c8-4052-9dda-001515cbe429	Custodians	 	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	0
b0f21671-0661-418c-9dca-5e885a9e48ae	Admins	 	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	0
8b2e3e02-1f10-44bd-809b-3ff8eff60d26	Organisations	 	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	0
e74850be-7489-4afc-940b-221f64d17fb6	Researchers	 	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	0
522f378e-690e-465c-8683-f620355ce402	Service Layer	 	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	0
\.


--
-- TOC entry 4646 (class 0 OID 20524)
-- Dependencies: 255
-- Data for Name: keycloak_role; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.keycloak_role (id, client_realm_constraint, client_role, description, name, realm_id, client, realm) FROM stdin;
6a3d63b8-8120-496e-a754-46e48e6a77b6	573be4f5-590a-4831-a3f3-de3d8f56ec34	f	${role_default-roles}	default-roles-master	573be4f5-590a-4831-a3f3-de3d8f56ec34	\N	\N
cd6344cb-fbb5-436b-8a77-dd60fbe40c27	573be4f5-590a-4831-a3f3-de3d8f56ec34	f	${role_admin}	admin	573be4f5-590a-4831-a3f3-de3d8f56ec34	\N	\N
efb884b0-ef69-4e16-8491-1fad00b44878	573be4f5-590a-4831-a3f3-de3d8f56ec34	f	${role_create-realm}	create-realm	573be4f5-590a-4831-a3f3-de3d8f56ec34	\N	\N
63cc1358-5792-45ac-b816-244a4e18bf09	07b5d519-49d8-4951-b05c-ac90a831a805	t	${role_create-client}	create-client	573be4f5-590a-4831-a3f3-de3d8f56ec34	07b5d519-49d8-4951-b05c-ac90a831a805	\N
1f1ddf50-19de-4bc1-9783-3c318b4df5b2	07b5d519-49d8-4951-b05c-ac90a831a805	t	${role_view-realm}	view-realm	573be4f5-590a-4831-a3f3-de3d8f56ec34	07b5d519-49d8-4951-b05c-ac90a831a805	\N
b2ce55fe-e9f2-4496-ba1c-9080c1f7f012	07b5d519-49d8-4951-b05c-ac90a831a805	t	${role_view-users}	view-users	573be4f5-590a-4831-a3f3-de3d8f56ec34	07b5d519-49d8-4951-b05c-ac90a831a805	\N
ffa6bbc7-13aa-40d1-a871-bee63832b195	07b5d519-49d8-4951-b05c-ac90a831a805	t	${role_view-clients}	view-clients	573be4f5-590a-4831-a3f3-de3d8f56ec34	07b5d519-49d8-4951-b05c-ac90a831a805	\N
0e8fd425-209a-4ad3-980e-a6d31917d9d7	07b5d519-49d8-4951-b05c-ac90a831a805	t	${role_view-events}	view-events	573be4f5-590a-4831-a3f3-de3d8f56ec34	07b5d519-49d8-4951-b05c-ac90a831a805	\N
46cbdb19-2cf3-42c3-91de-8cd3f97e9411	07b5d519-49d8-4951-b05c-ac90a831a805	t	${role_view-identity-providers}	view-identity-providers	573be4f5-590a-4831-a3f3-de3d8f56ec34	07b5d519-49d8-4951-b05c-ac90a831a805	\N
d28b5214-51d1-443e-8e63-ecf2e5cef7f3	07b5d519-49d8-4951-b05c-ac90a831a805	t	${role_view-authorization}	view-authorization	573be4f5-590a-4831-a3f3-de3d8f56ec34	07b5d519-49d8-4951-b05c-ac90a831a805	\N
9631bb48-25e2-42bb-bc6b-1f47b9b08d5d	07b5d519-49d8-4951-b05c-ac90a831a805	t	${role_manage-realm}	manage-realm	573be4f5-590a-4831-a3f3-de3d8f56ec34	07b5d519-49d8-4951-b05c-ac90a831a805	\N
2394a878-9bdf-428b-8e4f-f5d231362dcb	07b5d519-49d8-4951-b05c-ac90a831a805	t	${role_manage-users}	manage-users	573be4f5-590a-4831-a3f3-de3d8f56ec34	07b5d519-49d8-4951-b05c-ac90a831a805	\N
881b2475-727c-4faa-9634-13a7d62f648c	07b5d519-49d8-4951-b05c-ac90a831a805	t	${role_manage-clients}	manage-clients	573be4f5-590a-4831-a3f3-de3d8f56ec34	07b5d519-49d8-4951-b05c-ac90a831a805	\N
8a99120d-cdda-4113-b75d-49ea84b9e7d7	07b5d519-49d8-4951-b05c-ac90a831a805	t	${role_manage-events}	manage-events	573be4f5-590a-4831-a3f3-de3d8f56ec34	07b5d519-49d8-4951-b05c-ac90a831a805	\N
8db5dac6-ab76-4c0a-8762-e6591ae394c7	07b5d519-49d8-4951-b05c-ac90a831a805	t	${role_manage-identity-providers}	manage-identity-providers	573be4f5-590a-4831-a3f3-de3d8f56ec34	07b5d519-49d8-4951-b05c-ac90a831a805	\N
cce740bd-352a-4cbb-990c-f24ffeb5c830	07b5d519-49d8-4951-b05c-ac90a831a805	t	${role_manage-authorization}	manage-authorization	573be4f5-590a-4831-a3f3-de3d8f56ec34	07b5d519-49d8-4951-b05c-ac90a831a805	\N
918f0c5f-52da-4da8-83e8-b97f8eea053e	07b5d519-49d8-4951-b05c-ac90a831a805	t	${role_query-users}	query-users	573be4f5-590a-4831-a3f3-de3d8f56ec34	07b5d519-49d8-4951-b05c-ac90a831a805	\N
92fd977f-0530-454a-9128-5e56f4399c70	07b5d519-49d8-4951-b05c-ac90a831a805	t	${role_query-clients}	query-clients	573be4f5-590a-4831-a3f3-de3d8f56ec34	07b5d519-49d8-4951-b05c-ac90a831a805	\N
e65c88a2-16cb-4cfa-a0ee-2455305867c3	07b5d519-49d8-4951-b05c-ac90a831a805	t	${role_query-realms}	query-realms	573be4f5-590a-4831-a3f3-de3d8f56ec34	07b5d519-49d8-4951-b05c-ac90a831a805	\N
30284747-d0b6-4322-81ac-af69cf433daf	07b5d519-49d8-4951-b05c-ac90a831a805	t	${role_query-groups}	query-groups	573be4f5-590a-4831-a3f3-de3d8f56ec34	07b5d519-49d8-4951-b05c-ac90a831a805	\N
313bbcd7-d573-4f88-aa58-c217dbd310a8	d3a27c66-ae91-4435-a6a6-5086541347c3	t	${role_view-profile}	view-profile	573be4f5-590a-4831-a3f3-de3d8f56ec34	d3a27c66-ae91-4435-a6a6-5086541347c3	\N
adb5fe1e-3a1e-4828-9e5e-de17410695de	d3a27c66-ae91-4435-a6a6-5086541347c3	t	${role_manage-account}	manage-account	573be4f5-590a-4831-a3f3-de3d8f56ec34	d3a27c66-ae91-4435-a6a6-5086541347c3	\N
794f997f-e057-4ba2-9f60-879574231ddc	d3a27c66-ae91-4435-a6a6-5086541347c3	t	${role_manage-account-links}	manage-account-links	573be4f5-590a-4831-a3f3-de3d8f56ec34	d3a27c66-ae91-4435-a6a6-5086541347c3	\N
0a54fb78-d93e-4f7b-b101-a1f1386acf33	d3a27c66-ae91-4435-a6a6-5086541347c3	t	${role_view-applications}	view-applications	573be4f5-590a-4831-a3f3-de3d8f56ec34	d3a27c66-ae91-4435-a6a6-5086541347c3	\N
b612d24d-48a7-4b8f-9728-1d789e5dcdae	d3a27c66-ae91-4435-a6a6-5086541347c3	t	${role_view-consent}	view-consent	573be4f5-590a-4831-a3f3-de3d8f56ec34	d3a27c66-ae91-4435-a6a6-5086541347c3	\N
8a05a143-0b30-4c35-9db1-df98c612e697	d3a27c66-ae91-4435-a6a6-5086541347c3	t	${role_manage-consent}	manage-consent	573be4f5-590a-4831-a3f3-de3d8f56ec34	d3a27c66-ae91-4435-a6a6-5086541347c3	\N
efc1723a-8ffb-4046-8954-bb1aaffa2bed	d3a27c66-ae91-4435-a6a6-5086541347c3	t	${role_view-groups}	view-groups	573be4f5-590a-4831-a3f3-de3d8f56ec34	d3a27c66-ae91-4435-a6a6-5086541347c3	\N
8d136e1a-1563-4596-90e7-1aab669d4ada	d3a27c66-ae91-4435-a6a6-5086541347c3	t	${role_delete-account}	delete-account	573be4f5-590a-4831-a3f3-de3d8f56ec34	d3a27c66-ae91-4435-a6a6-5086541347c3	\N
4b5f2e8e-8fa6-4922-bfae-22c3dc843863	1f59f410-6cd0-4040-a4fb-ae00c8be5ffd	t	${role_read-token}	read-token	573be4f5-590a-4831-a3f3-de3d8f56ec34	1f59f410-6cd0-4040-a4fb-ae00c8be5ffd	\N
385fb1af-9ba3-474d-9708-0e1f77d412f8	07b5d519-49d8-4951-b05c-ac90a831a805	t	${role_impersonation}	impersonation	573be4f5-590a-4831-a3f3-de3d8f56ec34	07b5d519-49d8-4951-b05c-ac90a831a805	\N
a62273e8-ab4b-48fc-8f92-428f5d748452	573be4f5-590a-4831-a3f3-de3d8f56ec34	f	${role_offline-access}	offline_access	573be4f5-590a-4831-a3f3-de3d8f56ec34	\N	\N
d30c30e5-1581-467a-952a-190182bd8904	573be4f5-590a-4831-a3f3-de3d8f56ec34	f	${role_uma_authorization}	uma_authorization	573be4f5-590a-4831-a3f3-de3d8f56ec34	\N	\N
cecb45c6-f63c-4aa3-9c8a-2438000e3206	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	f	${role_uma_authorization}	uma_authorization	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	\N	\N
38b8a18d-3182-4cab-84a5-3e0060de74ef	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	f	${role_default-roles}	default-roles-soursd	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	\N	\N
23fd4323-8cc4-4b20-98f7-21010c9d5a8b	0ee85feb-a7a6-4204-9d2e-0d5acd52f0e9	t	${role_create-client}	create-client	573be4f5-590a-4831-a3f3-de3d8f56ec34	0ee85feb-a7a6-4204-9d2e-0d5acd52f0e9	\N
2c5ad8df-06c8-41e5-b1e9-37e5827e3365	0ee85feb-a7a6-4204-9d2e-0d5acd52f0e9	t	${role_view-realm}	view-realm	573be4f5-590a-4831-a3f3-de3d8f56ec34	0ee85feb-a7a6-4204-9d2e-0d5acd52f0e9	\N
a8d8fa2f-7e95-4f0d-bb26-6a8503b6621d	0ee85feb-a7a6-4204-9d2e-0d5acd52f0e9	t	${role_view-users}	view-users	573be4f5-590a-4831-a3f3-de3d8f56ec34	0ee85feb-a7a6-4204-9d2e-0d5acd52f0e9	\N
e2039cd6-3211-44cc-a391-d5c8c9f329c3	0ee85feb-a7a6-4204-9d2e-0d5acd52f0e9	t	${role_view-clients}	view-clients	573be4f5-590a-4831-a3f3-de3d8f56ec34	0ee85feb-a7a6-4204-9d2e-0d5acd52f0e9	\N
b4ac9d89-455b-42af-89b8-462e2eca973d	0ee85feb-a7a6-4204-9d2e-0d5acd52f0e9	t	${role_view-events}	view-events	573be4f5-590a-4831-a3f3-de3d8f56ec34	0ee85feb-a7a6-4204-9d2e-0d5acd52f0e9	\N
91bbab83-b906-43c5-a7f1-dbfbc7ce62d5	0ee85feb-a7a6-4204-9d2e-0d5acd52f0e9	t	${role_view-identity-providers}	view-identity-providers	573be4f5-590a-4831-a3f3-de3d8f56ec34	0ee85feb-a7a6-4204-9d2e-0d5acd52f0e9	\N
2d20ce51-760b-4157-bd8c-2d1c8e9aa3c1	0ee85feb-a7a6-4204-9d2e-0d5acd52f0e9	t	${role_view-authorization}	view-authorization	573be4f5-590a-4831-a3f3-de3d8f56ec34	0ee85feb-a7a6-4204-9d2e-0d5acd52f0e9	\N
d9f7a05a-a6a5-4dff-8506-17dd0799cfa1	0ee85feb-a7a6-4204-9d2e-0d5acd52f0e9	t	${role_manage-realm}	manage-realm	573be4f5-590a-4831-a3f3-de3d8f56ec34	0ee85feb-a7a6-4204-9d2e-0d5acd52f0e9	\N
b9cd6ebe-b6e9-4c25-81dc-32b8b2af0ed3	0ee85feb-a7a6-4204-9d2e-0d5acd52f0e9	t	${role_manage-users}	manage-users	573be4f5-590a-4831-a3f3-de3d8f56ec34	0ee85feb-a7a6-4204-9d2e-0d5acd52f0e9	\N
9fcaeb3a-4545-435c-a2a6-99ee0a39411b	0ee85feb-a7a6-4204-9d2e-0d5acd52f0e9	t	${role_manage-clients}	manage-clients	573be4f5-590a-4831-a3f3-de3d8f56ec34	0ee85feb-a7a6-4204-9d2e-0d5acd52f0e9	\N
cc9afc7f-f949-472e-929e-4be48690d022	0ee85feb-a7a6-4204-9d2e-0d5acd52f0e9	t	${role_manage-events}	manage-events	573be4f5-590a-4831-a3f3-de3d8f56ec34	0ee85feb-a7a6-4204-9d2e-0d5acd52f0e9	\N
50fee5fb-d0a6-4f50-a3d0-ba67e975bdbb	0ee85feb-a7a6-4204-9d2e-0d5acd52f0e9	t	${role_manage-identity-providers}	manage-identity-providers	573be4f5-590a-4831-a3f3-de3d8f56ec34	0ee85feb-a7a6-4204-9d2e-0d5acd52f0e9	\N
7554fb21-5876-456f-8be2-4cac91beda09	0ee85feb-a7a6-4204-9d2e-0d5acd52f0e9	t	${role_manage-authorization}	manage-authorization	573be4f5-590a-4831-a3f3-de3d8f56ec34	0ee85feb-a7a6-4204-9d2e-0d5acd52f0e9	\N
17717551-af2f-4b9e-9caf-a8c614c1e671	0ee85feb-a7a6-4204-9d2e-0d5acd52f0e9	t	${role_query-users}	query-users	573be4f5-590a-4831-a3f3-de3d8f56ec34	0ee85feb-a7a6-4204-9d2e-0d5acd52f0e9	\N
71ed90ec-a4e8-4547-9d91-38604e515414	0ee85feb-a7a6-4204-9d2e-0d5acd52f0e9	t	${role_query-clients}	query-clients	573be4f5-590a-4831-a3f3-de3d8f56ec34	0ee85feb-a7a6-4204-9d2e-0d5acd52f0e9	\N
26c331f3-c0cc-4253-ad87-eded7097ddc9	0ee85feb-a7a6-4204-9d2e-0d5acd52f0e9	t	${role_query-realms}	query-realms	573be4f5-590a-4831-a3f3-de3d8f56ec34	0ee85feb-a7a6-4204-9d2e-0d5acd52f0e9	\N
9f0d8fc2-bc32-4793-9b6a-f7a067770ca1	0ee85feb-a7a6-4204-9d2e-0d5acd52f0e9	t	${role_query-groups}	query-groups	573be4f5-590a-4831-a3f3-de3d8f56ec34	0ee85feb-a7a6-4204-9d2e-0d5acd52f0e9	\N
018886e3-9ff8-4651-a714-28cfd2f964de	c97f0a03-7ed7-4dfb-9637-bc92b8449d9d	t	${role_realm-admin}	realm-admin	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	c97f0a03-7ed7-4dfb-9637-bc92b8449d9d	\N
8a5437dc-620a-424d-93ad-7a41346dc385	c97f0a03-7ed7-4dfb-9637-bc92b8449d9d	t	${role_create-client}	create-client	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	c97f0a03-7ed7-4dfb-9637-bc92b8449d9d	\N
3996470f-df14-4291-b206-62694af0ab39	c97f0a03-7ed7-4dfb-9637-bc92b8449d9d	t	${role_view-realm}	view-realm	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	c97f0a03-7ed7-4dfb-9637-bc92b8449d9d	\N
3f459fb1-203d-4d56-915a-234bbd27e483	c97f0a03-7ed7-4dfb-9637-bc92b8449d9d	t	${role_view-users}	view-users	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	c97f0a03-7ed7-4dfb-9637-bc92b8449d9d	\N
3af56b88-35bf-417b-a6ef-724254c00816	c97f0a03-7ed7-4dfb-9637-bc92b8449d9d	t	${role_view-clients}	view-clients	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	c97f0a03-7ed7-4dfb-9637-bc92b8449d9d	\N
acb62ce9-59f0-4b29-87f1-dc31aafd2d6b	c97f0a03-7ed7-4dfb-9637-bc92b8449d9d	t	${role_view-events}	view-events	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	c97f0a03-7ed7-4dfb-9637-bc92b8449d9d	\N
63abec50-6a86-4c7d-95b8-d91990b9ff45	c97f0a03-7ed7-4dfb-9637-bc92b8449d9d	t	${role_view-identity-providers}	view-identity-providers	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	c97f0a03-7ed7-4dfb-9637-bc92b8449d9d	\N
da09e718-2f43-4702-9889-e50063a38c04	c97f0a03-7ed7-4dfb-9637-bc92b8449d9d	t	${role_view-authorization}	view-authorization	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	c97f0a03-7ed7-4dfb-9637-bc92b8449d9d	\N
325eb064-a63c-4292-b6c7-e3caf7e11e56	c97f0a03-7ed7-4dfb-9637-bc92b8449d9d	t	${role_manage-realm}	manage-realm	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	c97f0a03-7ed7-4dfb-9637-bc92b8449d9d	\N
60eeb573-adcd-4a2d-bc3e-316133266861	c97f0a03-7ed7-4dfb-9637-bc92b8449d9d	t	${role_manage-users}	manage-users	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	c97f0a03-7ed7-4dfb-9637-bc92b8449d9d	\N
41e7c022-b0fd-412d-9f94-3e8c8e776f9b	c97f0a03-7ed7-4dfb-9637-bc92b8449d9d	t	${role_manage-clients}	manage-clients	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	c97f0a03-7ed7-4dfb-9637-bc92b8449d9d	\N
4db5fd0a-168c-404c-9ef4-6cd563eb9892	c97f0a03-7ed7-4dfb-9637-bc92b8449d9d	t	${role_manage-events}	manage-events	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	c97f0a03-7ed7-4dfb-9637-bc92b8449d9d	\N
720e76e6-c357-40b1-9052-02900f96e428	c97f0a03-7ed7-4dfb-9637-bc92b8449d9d	t	${role_manage-identity-providers}	manage-identity-providers	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	c97f0a03-7ed7-4dfb-9637-bc92b8449d9d	\N
d5a4d17b-ddb7-4422-ae14-76069490b4f3	c97f0a03-7ed7-4dfb-9637-bc92b8449d9d	t	${role_manage-authorization}	manage-authorization	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	c97f0a03-7ed7-4dfb-9637-bc92b8449d9d	\N
4ad45ead-c31f-41f6-9647-b4aa9b44fe98	c97f0a03-7ed7-4dfb-9637-bc92b8449d9d	t	${role_query-users}	query-users	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	c97f0a03-7ed7-4dfb-9637-bc92b8449d9d	\N
0566f538-35d9-4d4f-9e09-7f2df4c65970	c97f0a03-7ed7-4dfb-9637-bc92b8449d9d	t	${role_query-clients}	query-clients	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	c97f0a03-7ed7-4dfb-9637-bc92b8449d9d	\N
d5573143-64e2-4089-8889-e1e9abd17bc9	c97f0a03-7ed7-4dfb-9637-bc92b8449d9d	t	${role_query-realms}	query-realms	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	c97f0a03-7ed7-4dfb-9637-bc92b8449d9d	\N
13efbea1-a8ad-4792-b840-2ed6db8c2888	c97f0a03-7ed7-4dfb-9637-bc92b8449d9d	t	${role_query-groups}	query-groups	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	c97f0a03-7ed7-4dfb-9637-bc92b8449d9d	\N
ae76fc70-e837-410f-8ff2-21ff45afe23b	82a0f406-c93d-4f1d-8972-09987311bf32	t	${role_view-profile}	view-profile	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	82a0f406-c93d-4f1d-8972-09987311bf32	\N
079a673e-5870-4eda-a663-f54f338c89b6	82a0f406-c93d-4f1d-8972-09987311bf32	t	${role_manage-account}	manage-account	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	82a0f406-c93d-4f1d-8972-09987311bf32	\N
8bdf34d4-1e2d-47a4-a6e9-f349c17d4807	82a0f406-c93d-4f1d-8972-09987311bf32	t	${role_manage-account-links}	manage-account-links	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	82a0f406-c93d-4f1d-8972-09987311bf32	\N
add48961-0a1b-4986-b6f3-80e25519371b	82a0f406-c93d-4f1d-8972-09987311bf32	t	${role_view-applications}	view-applications	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	82a0f406-c93d-4f1d-8972-09987311bf32	\N
8b213433-8154-4229-85da-87b508eef114	82a0f406-c93d-4f1d-8972-09987311bf32	t	${role_view-consent}	view-consent	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	82a0f406-c93d-4f1d-8972-09987311bf32	\N
1d285d5d-72d1-4c3d-b32c-f4c9ab5e336a	82a0f406-c93d-4f1d-8972-09987311bf32	t	${role_manage-consent}	manage-consent	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	82a0f406-c93d-4f1d-8972-09987311bf32	\N
b9b03f2e-dff5-41a8-ba05-cc6e648704c9	82a0f406-c93d-4f1d-8972-09987311bf32	t	${role_view-groups}	view-groups	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	82a0f406-c93d-4f1d-8972-09987311bf32	\N
7528e9bf-afb3-4c7a-b124-3398ce229c3f	82a0f406-c93d-4f1d-8972-09987311bf32	t	${role_delete-account}	delete-account	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	82a0f406-c93d-4f1d-8972-09987311bf32	\N
f61cea99-1cbe-47ce-836b-00025542815a	0ee85feb-a7a6-4204-9d2e-0d5acd52f0e9	t	${role_impersonation}	impersonation	573be4f5-590a-4831-a3f3-de3d8f56ec34	0ee85feb-a7a6-4204-9d2e-0d5acd52f0e9	\N
6aed831c-66eb-4b8d-80ad-88f26a6d6bfd	c97f0a03-7ed7-4dfb-9637-bc92b8449d9d	t	${role_impersonation}	impersonation	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	c97f0a03-7ed7-4dfb-9637-bc92b8449d9d	\N
1c2376ac-bef2-4102-85e6-cfb5c9112686	5fc8fe91-54b6-4965-85da-cc182d494fba	t	${role_read-token}	read-token	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	5fc8fe91-54b6-4965-85da-cc182d494fba	\N
0ab555c5-a077-43c6-9169-8dcc41722a69	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	f	${role_offline-access}	offline_access	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	\N	\N
65e12f51-4a3a-4eac-b3fd-3bbbab68c708	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	f	${role_uma_authorization}	uma_authorization	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	\N	\N
a03995ab-bf71-4a9b-b505-50c715cd4db1	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	f	\N	manage-users	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	\N	\N
8bf86b7b-d467-4c68-9f3b-17ef3e65f92e	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	f	\N	admin	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	\N	\N
dd2a15ab-2066-46dc-b4ea-05ef6bd11e54	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	f	\N	view-users	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	\N	\N
99adcfe6-bbd5-437a-9675-ab228482f3eb	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	f	${role_default-roles}	default-roles-registry	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	\N	\N
4849c95c-ada2-45a0-927f-b0b894265dd4	2e713a57-2d5f-4835-aca9-8342751942d1	t	\N	uma_protection	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	2e713a57-2d5f-4835-aca9-8342751942d1	\N
634f4714-e388-43e7-837d-e024096d7b30	2e713a57-2d5f-4835-aca9-8342751942d1	t	${client_realm-management}	realm-management	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	2e713a57-2d5f-4835-aca9-8342751942d1	\N
5797316a-b997-470a-8411-0a77b0804741	2e713a57-2d5f-4835-aca9-8342751942d1	t	${role_admin}	admin	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	2e713a57-2d5f-4835-aca9-8342751942d1	\N
eced41fc-ff26-401c-ad27-88f8ee0056d3	358bbb9c-f41f-4bc6-b0f3-0968dd0f4a65	t	${role_admin}	admin	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	358bbb9c-f41f-4bc6-b0f3-0968dd0f4a65	\N
12d1e7fb-8837-4807-8c27-0ee3c030dcd0	358bbb9c-f41f-4bc6-b0f3-0968dd0f4a65	t	${role_manage-users}	manage-users	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	358bbb9c-f41f-4bc6-b0f3-0968dd0f4a65	\N
6a407f74-4c91-45d4-9ec1-913dd65f6a59	2e713a57-2d5f-4835-aca9-8342751942d1	t	${role_manage-users}	manage-users	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	2e713a57-2d5f-4835-aca9-8342751942d1	\N
3d5201f7-e318-4f0f-b944-244deca8e05b	2e713a57-2d5f-4835-aca9-8342751942d1	t	${realm_manage-users}	realm-manage-users	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	2e713a57-2d5f-4835-aca9-8342751942d1	\N
7e349c00-81af-443b-affe-2cfff09e0067	2e713a57-2d5f-4835-aca9-8342751942d1	t	${client_role-admin}	client-admin	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	2e713a57-2d5f-4835-aca9-8342751942d1	\N
0ab4a22c-a6b0-4ecd-bce5-12ae08d53d94	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	f	${role_default-roles}	default-roles-gateway	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	\N	\N
a7d43235-5a80-4c78-8274-0f662f24b6e1	7dfb6d8f-b5cf-475f-bee6-9aedc73d5130	t	${role_create-client}	create-client	573be4f5-590a-4831-a3f3-de3d8f56ec34	7dfb6d8f-b5cf-475f-bee6-9aedc73d5130	\N
966d148e-8578-4a28-a84b-b0c95909701d	7dfb6d8f-b5cf-475f-bee6-9aedc73d5130	t	${role_view-realm}	view-realm	573be4f5-590a-4831-a3f3-de3d8f56ec34	7dfb6d8f-b5cf-475f-bee6-9aedc73d5130	\N
42aaf434-492c-4484-a722-04fbcb7f99b8	7dfb6d8f-b5cf-475f-bee6-9aedc73d5130	t	${role_view-users}	view-users	573be4f5-590a-4831-a3f3-de3d8f56ec34	7dfb6d8f-b5cf-475f-bee6-9aedc73d5130	\N
0bce5b06-322c-4a28-9f42-db928e7c01fd	7dfb6d8f-b5cf-475f-bee6-9aedc73d5130	t	${role_view-clients}	view-clients	573be4f5-590a-4831-a3f3-de3d8f56ec34	7dfb6d8f-b5cf-475f-bee6-9aedc73d5130	\N
be3f8208-3f7e-4e47-b3c5-b3d957d5d54b	7dfb6d8f-b5cf-475f-bee6-9aedc73d5130	t	${role_view-events}	view-events	573be4f5-590a-4831-a3f3-de3d8f56ec34	7dfb6d8f-b5cf-475f-bee6-9aedc73d5130	\N
5150bf9d-aec9-4772-b46b-d5641711740b	7dfb6d8f-b5cf-475f-bee6-9aedc73d5130	t	${role_view-identity-providers}	view-identity-providers	573be4f5-590a-4831-a3f3-de3d8f56ec34	7dfb6d8f-b5cf-475f-bee6-9aedc73d5130	\N
77fccd5b-c255-4b06-80bf-9e2898995cec	7dfb6d8f-b5cf-475f-bee6-9aedc73d5130	t	${role_view-authorization}	view-authorization	573be4f5-590a-4831-a3f3-de3d8f56ec34	7dfb6d8f-b5cf-475f-bee6-9aedc73d5130	\N
f27ffedf-44c9-4be0-b57d-e7bb974e6a07	7dfb6d8f-b5cf-475f-bee6-9aedc73d5130	t	${role_manage-realm}	manage-realm	573be4f5-590a-4831-a3f3-de3d8f56ec34	7dfb6d8f-b5cf-475f-bee6-9aedc73d5130	\N
600022eb-409c-4b70-8f99-430b5ef7e8e5	7dfb6d8f-b5cf-475f-bee6-9aedc73d5130	t	${role_manage-users}	manage-users	573be4f5-590a-4831-a3f3-de3d8f56ec34	7dfb6d8f-b5cf-475f-bee6-9aedc73d5130	\N
fa0f090f-733e-4427-b0ba-6e0ab3ced058	7dfb6d8f-b5cf-475f-bee6-9aedc73d5130	t	${role_manage-clients}	manage-clients	573be4f5-590a-4831-a3f3-de3d8f56ec34	7dfb6d8f-b5cf-475f-bee6-9aedc73d5130	\N
a3c44f70-cc34-4799-990d-8cbac90fe1c4	7dfb6d8f-b5cf-475f-bee6-9aedc73d5130	t	${role_manage-events}	manage-events	573be4f5-590a-4831-a3f3-de3d8f56ec34	7dfb6d8f-b5cf-475f-bee6-9aedc73d5130	\N
ae4baccf-a3b0-4932-a201-9a5e24fd78a2	7dfb6d8f-b5cf-475f-bee6-9aedc73d5130	t	${role_manage-identity-providers}	manage-identity-providers	573be4f5-590a-4831-a3f3-de3d8f56ec34	7dfb6d8f-b5cf-475f-bee6-9aedc73d5130	\N
7efed7f4-bd9f-43c2-b12a-c564e675315c	7dfb6d8f-b5cf-475f-bee6-9aedc73d5130	t	${role_manage-authorization}	manage-authorization	573be4f5-590a-4831-a3f3-de3d8f56ec34	7dfb6d8f-b5cf-475f-bee6-9aedc73d5130	\N
ccd3df8e-9598-46ce-89e4-2571d3d3bd3f	7dfb6d8f-b5cf-475f-bee6-9aedc73d5130	t	${role_query-users}	query-users	573be4f5-590a-4831-a3f3-de3d8f56ec34	7dfb6d8f-b5cf-475f-bee6-9aedc73d5130	\N
50b162dc-cdab-4098-8bec-0e62d7d8ffc4	7dfb6d8f-b5cf-475f-bee6-9aedc73d5130	t	${role_query-clients}	query-clients	573be4f5-590a-4831-a3f3-de3d8f56ec34	7dfb6d8f-b5cf-475f-bee6-9aedc73d5130	\N
914bf0ef-9404-4d10-9dff-874f90a1ca45	7dfb6d8f-b5cf-475f-bee6-9aedc73d5130	t	${role_query-realms}	query-realms	573be4f5-590a-4831-a3f3-de3d8f56ec34	7dfb6d8f-b5cf-475f-bee6-9aedc73d5130	\N
5d6f6c28-b22e-4200-a896-365808bbcf54	7dfb6d8f-b5cf-475f-bee6-9aedc73d5130	t	${role_query-groups}	query-groups	573be4f5-590a-4831-a3f3-de3d8f56ec34	7dfb6d8f-b5cf-475f-bee6-9aedc73d5130	\N
ef9e3db7-3c79-4ee0-949b-3d255574f08f	88a901c3-2730-4d6d-8f86-a99bf6455e77	t	${role_realm-admin}	realm-admin	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	88a901c3-2730-4d6d-8f86-a99bf6455e77	\N
c3faf0b6-04e8-469f-ba05-651052bf8c47	88a901c3-2730-4d6d-8f86-a99bf6455e77	t	${role_create-client}	create-client	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	88a901c3-2730-4d6d-8f86-a99bf6455e77	\N
53dffe38-3cf2-46a3-a483-4e4fd9c4da9d	88a901c3-2730-4d6d-8f86-a99bf6455e77	t	${role_view-realm}	view-realm	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	88a901c3-2730-4d6d-8f86-a99bf6455e77	\N
d009c625-940d-48d0-95c4-2954cf5426f3	88a901c3-2730-4d6d-8f86-a99bf6455e77	t	${role_view-users}	view-users	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	88a901c3-2730-4d6d-8f86-a99bf6455e77	\N
9b8dca3e-72a4-40ad-bbe2-28a741d64a2e	88a901c3-2730-4d6d-8f86-a99bf6455e77	t	${role_view-clients}	view-clients	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	88a901c3-2730-4d6d-8f86-a99bf6455e77	\N
f2568f24-0a1a-4e5d-a79b-1727939ecbc3	88a901c3-2730-4d6d-8f86-a99bf6455e77	t	${role_view-events}	view-events	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	88a901c3-2730-4d6d-8f86-a99bf6455e77	\N
25d27a37-f113-4b31-b5af-f67951583820	88a901c3-2730-4d6d-8f86-a99bf6455e77	t	${role_view-identity-providers}	view-identity-providers	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	88a901c3-2730-4d6d-8f86-a99bf6455e77	\N
0ae3f80d-98d8-47cc-ad6d-47875bbdacc9	88a901c3-2730-4d6d-8f86-a99bf6455e77	t	${role_view-authorization}	view-authorization	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	88a901c3-2730-4d6d-8f86-a99bf6455e77	\N
460b3184-0b34-4d71-87d5-a5b0cfa8a1e0	88a901c3-2730-4d6d-8f86-a99bf6455e77	t	${role_manage-realm}	manage-realm	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	88a901c3-2730-4d6d-8f86-a99bf6455e77	\N
63da58b8-07f1-458c-8f24-9711b09cac73	88a901c3-2730-4d6d-8f86-a99bf6455e77	t	${role_manage-users}	manage-users	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	88a901c3-2730-4d6d-8f86-a99bf6455e77	\N
85e071e7-7395-49fd-a94a-32dd1660d8df	88a901c3-2730-4d6d-8f86-a99bf6455e77	t	${role_manage-clients}	manage-clients	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	88a901c3-2730-4d6d-8f86-a99bf6455e77	\N
ff4c4d2a-01da-4e23-8822-95323e7c2c6b	88a901c3-2730-4d6d-8f86-a99bf6455e77	t	${role_manage-events}	manage-events	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	88a901c3-2730-4d6d-8f86-a99bf6455e77	\N
0451e462-a764-47b5-b2d2-ed2b9267863b	88a901c3-2730-4d6d-8f86-a99bf6455e77	t	${role_manage-identity-providers}	manage-identity-providers	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	88a901c3-2730-4d6d-8f86-a99bf6455e77	\N
45736706-b6f1-40b7-b2e5-e99b9476a9b4	88a901c3-2730-4d6d-8f86-a99bf6455e77	t	${role_manage-authorization}	manage-authorization	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	88a901c3-2730-4d6d-8f86-a99bf6455e77	\N
ab499563-de2d-4dc1-8a0f-4cc821226028	88a901c3-2730-4d6d-8f86-a99bf6455e77	t	${role_query-users}	query-users	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	88a901c3-2730-4d6d-8f86-a99bf6455e77	\N
da490c21-bad2-49b1-9c69-228dd623f86d	88a901c3-2730-4d6d-8f86-a99bf6455e77	t	${role_query-clients}	query-clients	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	88a901c3-2730-4d6d-8f86-a99bf6455e77	\N
9fe3779c-bd24-4544-911e-7d708f3030bf	88a901c3-2730-4d6d-8f86-a99bf6455e77	t	${role_query-realms}	query-realms	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	88a901c3-2730-4d6d-8f86-a99bf6455e77	\N
3a6c5ab2-83a0-4375-8839-c69eeb433abd	88a901c3-2730-4d6d-8f86-a99bf6455e77	t	${role_query-groups}	query-groups	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	88a901c3-2730-4d6d-8f86-a99bf6455e77	\N
962d2f24-c2f1-4bde-81f1-867d4cb96840	53dcc167-e5c7-4a51-b708-cef18370e62c	t	${role_view-profile}	view-profile	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	53dcc167-e5c7-4a51-b708-cef18370e62c	\N
8b91fbd6-3c22-46ed-87b0-dac8523d9f55	53dcc167-e5c7-4a51-b708-cef18370e62c	t	${role_manage-account}	manage-account	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	53dcc167-e5c7-4a51-b708-cef18370e62c	\N
85c263f6-1e22-48e5-a950-c3cd75cb119b	53dcc167-e5c7-4a51-b708-cef18370e62c	t	${role_manage-account-links}	manage-account-links	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	53dcc167-e5c7-4a51-b708-cef18370e62c	\N
d108caf0-0612-460f-9719-870b37d24a51	53dcc167-e5c7-4a51-b708-cef18370e62c	t	${role_view-applications}	view-applications	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	53dcc167-e5c7-4a51-b708-cef18370e62c	\N
d52f7491-beb2-40b1-a2ee-a25c26bc7fb8	53dcc167-e5c7-4a51-b708-cef18370e62c	t	${role_view-consent}	view-consent	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	53dcc167-e5c7-4a51-b708-cef18370e62c	\N
b4ead508-9f30-4624-a5b5-a8615c4a7df9	53dcc167-e5c7-4a51-b708-cef18370e62c	t	${role_manage-consent}	manage-consent	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	53dcc167-e5c7-4a51-b708-cef18370e62c	\N
9b349862-5881-4ff4-91ba-abef77d8a8c1	53dcc167-e5c7-4a51-b708-cef18370e62c	t	${role_view-groups}	view-groups	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	53dcc167-e5c7-4a51-b708-cef18370e62c	\N
02b84272-d5d1-407c-9510-b634bbd8e390	53dcc167-e5c7-4a51-b708-cef18370e62c	t	${role_delete-account}	delete-account	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	53dcc167-e5c7-4a51-b708-cef18370e62c	\N
08accca9-a5e2-42a0-8ac9-52afe9b41d19	7dfb6d8f-b5cf-475f-bee6-9aedc73d5130	t	${role_impersonation}	impersonation	573be4f5-590a-4831-a3f3-de3d8f56ec34	7dfb6d8f-b5cf-475f-bee6-9aedc73d5130	\N
dba28f75-4b8c-44dd-8b15-c8179bd26cfe	88a901c3-2730-4d6d-8f86-a99bf6455e77	t	${role_impersonation}	impersonation	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	88a901c3-2730-4d6d-8f86-a99bf6455e77	\N
f7f9874c-672f-45d0-bfe7-aa0d89a76ad7	8b9e2719-2150-4a1e-a2b8-232158e4891e	t	${role_read-token}	read-token	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	8b9e2719-2150-4a1e-a2b8-232158e4891e	\N
b62b33ed-2537-4b0e-be48-ddb885f95d26	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	f	${role_offline-access}	offline_access	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	\N	\N
\.


--
-- TOC entry 4647 (class 0 OID 20530)
-- Dependencies: 256
-- Data for Name: migration_model; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.migration_model (id, version, update_time) FROM stdin;
zojfr	26.1.5	1746203874
jipe4	26.2.4	1747846443
\.


--
-- TOC entry 4648 (class 0 OID 20534)
-- Dependencies: 257
-- Data for Name: offline_client_session; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.offline_client_session (user_session_id, client_id, offline_flag, "timestamp", data, client_storage_provider, external_client_id, version) FROM stdin;
093b8fc6-c72a-41f2-b750-53473cb9373b	ab6c7ed6-6fcd-479e-872f-ace1a9468cc5	0	1768908989	{"authMethod":"openid-connect","redirectUri":"http://localhost:8080/admin/master/console/#/SOURSD/users","notes":{"clientId":"ab6c7ed6-6fcd-479e-872f-ace1a9468cc5","iss":"http://localhost:8080/realms/master","startedAt":"1768908238","response_type":"code","level-of-authentication":"-1","code_challenge_method":"S256","nonce":"6dad3bd6-bcf7-4949-8f30-5d5f3e27f515","response_mode":"query","scope":"openid","userSessionStartedAt":"1768908238","redirect_uri":"http://localhost:8080/admin/master/console/#/SOURSD/users","state":"23e43efa-01c6-4866-8be7-e947b9ac7608","code_challenge":"XnLBuJlwU3fiS7kC4nh0oZpT3HqLXX_GJYDgUN51ddg","prompt":"none","SSO_AUTH":"true"}}	local	local	9
9759de54-7732-4553-89a7-ea86deb89434	8ea8df93-6477-4ebd-b965-95ab93ef2c3f	0	1763652032	{"authMethod":"openid-connect","redirectUri":"https://localhost:8443/admin/master/console/#/SOURSD/users","notes":{"clientId":"8ea8df93-6477-4ebd-b965-95ab93ef2c3f","iss":"https://localhost:8443/realms/master","startedAt":"1763651942","response_type":"code","level-of-authentication":"-1","code_challenge_method":"S256","nonce":"078725e0-aabd-4755-b238-8cee0291dad3","response_mode":"query","scope":"openid","userSessionStartedAt":"1763651942","redirect_uri":"https://localhost:8443/admin/master/console/#/SOURSD/users","state":"1ff99346-f98b-4c9a-aea5-b2e25a1c200a","code_challenge":"eoQVHpKVreOjOUKrnsJpSLY_2CYdK8DhIyaLnaDhS_U","prompt":"none","SSO_AUTH":"true"}}	local	local	3
6f083cf9-d0d2-406d-8612-c7f2d2bb43e0	2e713a57-2d5f-4835-aca9-8342751942d1	0	1768903642	{"authMethod":"openid-connect","redirectUri":"http://localhost:3000/api/auth/login","notes":{"clientId":"2e713a57-2d5f-4835-aca9-8342751942d1","scope":"openid profile email","userSessionStartedAt":"1768903639","iss":"http://localhost:8080/realms/SOURSD","startedAt":"1768903639","response_type":"code","level-of-authentication":"-1","redirect_uri":"http://localhost:3000/api/auth/login"}}	local	local	1
\.


--
-- TOC entry 4649 (class 0 OID 20542)
-- Dependencies: 258
-- Data for Name: offline_user_session; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.offline_user_session (user_session_id, user_id, realm_id, created_on, offline_flag, data, last_session_refresh, broker_session_id, version) FROM stdin;
6f083cf9-d0d2-406d-8612-c7f2d2bb43e0	1575de97-4d60-435e-bf1b-a0376b7acdc2	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	1768903639	0	{"ipAddress":"192.168.65.1","authMethod":"openid-connect","rememberMe":false,"started":0,"notes":{"KC_DEVICE_NOTE":"eyJpcEFkZHJlc3MiOiIxOTIuMTY4LjY1LjEiLCJvcyI6Ik1hYyBPUyBYIiwib3NWZXJzaW9uIjoiMTAuMTUuNyIsImJyb3dzZXIiOiJDaHJvbWUvMTQzLjAuMCIsImRldmljZSI6Ik1hYyIsImxhc3RBY2Nlc3MiOjAsIm1vYmlsZSI6ZmFsc2V9","AUTH_TIME":"1768903639","authenticators-completed":"{\\"b5f161ef-0af3-40e6-b5d8-3dbf6e366f8b\\":1768903639}"},"state":"LOGGED_IN"}	1768903642	\N	1
9759de54-7732-4553-89a7-ea86deb89434	67055782-2f81-42ef-bf2a-e53eea28aa82	4d7499db-23cf-4ea9-8cae-45d86d7c51ab	1763651942	0	{"ipAddress":"192.168.65.1","authMethod":"openid-connect","rememberMe":false,"started":0,"notes":{"KC_DEVICE_NOTE":"eyJpcEFkZHJlc3MiOiIxOTIuMTY4LjY1LjEiLCJvcyI6Ik1hYyBPUyBYIiwib3NWZXJzaW9uIjoiMTAuMTUuNyIsImJyb3dzZXIiOiJDaHJvbWUvMTQyLjAuMCIsImRldmljZSI6Ik1hYyIsImxhc3RBY2Nlc3MiOjAsIm1vYmlsZSI6ZmFsc2V9","AUTH_TIME":"1763651942","authenticators-completed":"{\\"304c0b26-c924-4715-9cfc-52cc273cb2af\\":1763651942,\\"3897bdca-14d6-46b1-94e8-83f79a619679\\":1763652032}"},"state":"LOGGED_IN"}	1763652032	\N	3
093b8fc6-c72a-41f2-b750-53473cb9373b	190af348-0a88-45f2-af1f-7e26dbf988a2	573be4f5-590a-4831-a3f3-de3d8f56ec34	1768908238	0	{"ipAddress":"192.168.65.1","authMethod":"openid-connect","rememberMe":false,"started":0,"notes":{"KC_DEVICE_NOTE":"eyJpcEFkZHJlc3MiOiIxOTIuMTY4LjY1LjEiLCJvcyI6Ik1hYyBPUyBYIiwib3NWZXJzaW9uIjoiMTAuMTUuNyIsImJyb3dzZXIiOiJDaHJvbWUvMTQzLjAuMCIsImRldmljZSI6Ik1hYyIsImxhc3RBY2Nlc3MiOjAsIm1vYmlsZSI6ZmFsc2V9","AUTH_TIME":"1768908238","authenticators-completed":"{\\"24a97f64-30c9-4757-9845-240db9cd65cb\\":1768908237,\\"7cdff2c7-c344-4fac-b03d-199093cfe721\\":1768908772}"},"state":"LOGGED_IN"}	1768908989	\N	9
\.


--
-- TOC entry 4650 (class 0 OID 20549)
-- Dependencies: 259
-- Data for Name: org; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.org (id, enabled, realm_id, group_id, name, description, alias, redirect_url) FROM stdin;
\.


--
-- TOC entry 4651 (class 0 OID 20554)
-- Dependencies: 260
-- Data for Name: org_domain; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.org_domain (id, name, verified, org_id) FROM stdin;
\.


--
-- TOC entry 4652 (class 0 OID 20559)
-- Dependencies: 261
-- Data for Name: policy_config; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.policy_config (policy_id, name, value) FROM stdin;
12544e4e-c3cc-45b9-b0d4-6c3479515fed	code	// by default, grants any permission associated with this policy\n$evaluation.grant();\n
73ef5ea0-1113-45b5-a5dd-6042cb2bd4e7	defaultResourceType	urn:speedi-registry-app:resources:default
\.


--
-- TOC entry 4653 (class 0 OID 20564)
-- Dependencies: 262
-- Data for Name: protocol_mapper; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.protocol_mapper (id, name, protocol, protocol_mapper_name, client_id, client_scope_id) FROM stdin;
f7d874f1-e5a2-45fd-aab4-e29bbcc3334c	audience resolve	openid-connect	oidc-audience-resolve-mapper	da966e37-8ea8-4a7b-8b59-50904a68592b	\N
81eaaf18-91a3-47c7-b3e6-ae99950433ce	locale	openid-connect	oidc-usermodel-attribute-mapper	ab6c7ed6-6fcd-479e-872f-ace1a9468cc5	\N
90ea66f2-d1c9-4aa9-b4e1-2ad82a8ba842	role list	saml	saml-role-list-mapper	\N	130302b0-f33a-4cab-a3c7-81aa77cca5c7
643e3675-d6af-40f1-8bd2-3147802cbc5f	organization	saml	saml-organization-membership-mapper	\N	c31504ee-a58b-4343-833e-211d08b51f31
b3ab47a8-8409-43dc-8a08-fec8adcc4029	full name	openid-connect	oidc-full-name-mapper	\N	044580e6-4102-40fe-9836-2991d3f075f2
a1167a9c-7f46-4407-86b8-9d2d4e37d0bb	family name	openid-connect	oidc-usermodel-attribute-mapper	\N	044580e6-4102-40fe-9836-2991d3f075f2
9144ff7b-d0b3-4237-8d10-9c7e8e13c7df	given name	openid-connect	oidc-usermodel-attribute-mapper	\N	044580e6-4102-40fe-9836-2991d3f075f2
46ac4156-045d-43a0-a93f-1e658bc053e6	middle name	openid-connect	oidc-usermodel-attribute-mapper	\N	044580e6-4102-40fe-9836-2991d3f075f2
a5402ee8-128a-49c1-ba10-45c67d99e7ed	nickname	openid-connect	oidc-usermodel-attribute-mapper	\N	044580e6-4102-40fe-9836-2991d3f075f2
b0867bf1-f172-4e4f-842c-1015969234bc	username	openid-connect	oidc-usermodel-attribute-mapper	\N	044580e6-4102-40fe-9836-2991d3f075f2
cfca5fd6-c419-4b86-917c-adc0091544c8	profile	openid-connect	oidc-usermodel-attribute-mapper	\N	044580e6-4102-40fe-9836-2991d3f075f2
ef96a2fc-b141-43e4-abf7-99ce1b340883	picture	openid-connect	oidc-usermodel-attribute-mapper	\N	044580e6-4102-40fe-9836-2991d3f075f2
8eb1669f-7b5a-4f8a-be65-8cf701ebceee	website	openid-connect	oidc-usermodel-attribute-mapper	\N	044580e6-4102-40fe-9836-2991d3f075f2
e7d05472-a95a-451e-9733-d976879b184b	gender	openid-connect	oidc-usermodel-attribute-mapper	\N	044580e6-4102-40fe-9836-2991d3f075f2
030b151e-0a5b-4bd9-8563-21edc3a0fb7d	birthdate	openid-connect	oidc-usermodel-attribute-mapper	\N	044580e6-4102-40fe-9836-2991d3f075f2
0bd15944-91ff-48aa-aca8-c89d7ce1e1fa	zoneinfo	openid-connect	oidc-usermodel-attribute-mapper	\N	044580e6-4102-40fe-9836-2991d3f075f2
d481ca85-6a74-468a-ac70-7381f58fd174	locale	openid-connect	oidc-usermodel-attribute-mapper	\N	044580e6-4102-40fe-9836-2991d3f075f2
abe33103-3e4b-4974-811a-c830dde5161f	updated at	openid-connect	oidc-usermodel-attribute-mapper	\N	044580e6-4102-40fe-9836-2991d3f075f2
6d8aff62-6054-4239-a0d6-f111397a9588	email	openid-connect	oidc-usermodel-attribute-mapper	\N	39295a49-c2bb-424a-8767-31eb4e1241f8
31515473-4aff-4154-81be-168eb396b89c	email verified	openid-connect	oidc-usermodel-property-mapper	\N	39295a49-c2bb-424a-8767-31eb4e1241f8
6befbc0a-4ced-426b-9e45-a7abca18ef46	address	openid-connect	oidc-address-mapper	\N	2444797a-cef5-423f-84c2-1bcf18463c50
84983cbc-a3ec-49e9-92af-aea2bd9700ee	phone number	openid-connect	oidc-usermodel-attribute-mapper	\N	d30a3ad8-3e3a-48a3-b948-fcf5dcc6fb27
1f500492-06bc-49f4-98c7-dfa72eedff16	phone number verified	openid-connect	oidc-usermodel-attribute-mapper	\N	d30a3ad8-3e3a-48a3-b948-fcf5dcc6fb27
d49654da-d8ff-428d-b079-3a4bf3a19f8d	realm roles	openid-connect	oidc-usermodel-realm-role-mapper	\N	48046a02-0c54-4c9e-8c29-0b48a5d8e117
3329fe9d-4031-416b-a780-31467fa999bc	client roles	openid-connect	oidc-usermodel-client-role-mapper	\N	48046a02-0c54-4c9e-8c29-0b48a5d8e117
424d27a7-9dd0-4576-84b9-95372b5d6f9b	audience resolve	openid-connect	oidc-audience-resolve-mapper	\N	48046a02-0c54-4c9e-8c29-0b48a5d8e117
83b1ac85-5fd0-4632-89fb-bc3b28813827	allowed web origins	openid-connect	oidc-allowed-origins-mapper	\N	c6c8297c-63f1-4351-ae06-b2dad755c2a2
1558cdeb-4484-4d39-86e2-f4436d35e8be	upn	openid-connect	oidc-usermodel-attribute-mapper	\N	facf04fc-0c55-42de-8b27-38643f70a4cb
6353817e-7fcd-45db-a495-a727d1ca637a	groups	openid-connect	oidc-usermodel-realm-role-mapper	\N	facf04fc-0c55-42de-8b27-38643f70a4cb
c3cac1e2-9bca-4f02-b8f9-db26ddc2055c	acr loa level	openid-connect	oidc-acr-mapper	\N	6ce39ed5-237a-4d80-85d1-e5712dd944aa
df117d24-4542-4a80-b1b5-ed3fade66931	auth_time	openid-connect	oidc-usersessionmodel-note-mapper	\N	1f592d4d-f33b-41b1-933a-482898529356
bdcf462e-04d2-459c-978b-b5c44580d85f	sub	openid-connect	oidc-sub-mapper	\N	1f592d4d-f33b-41b1-933a-482898529356
ac9256ea-dfe4-46d4-a7ba-dd841e27feb1	Client ID	openid-connect	oidc-usersessionmodel-note-mapper	\N	1ad57157-5d8e-4653-9d90-e5fe34208725
f679711d-0b00-43a4-bb7e-273818b81613	Client Host	openid-connect	oidc-usersessionmodel-note-mapper	\N	1ad57157-5d8e-4653-9d90-e5fe34208725
cda2e740-f638-42b6-9c3a-44b8d1864776	Client IP Address	openid-connect	oidc-usersessionmodel-note-mapper	\N	1ad57157-5d8e-4653-9d90-e5fe34208725
f9fe51dc-9ffc-4191-b930-fe05bf15b71e	organization	openid-connect	oidc-organization-membership-mapper	\N	ea6978f8-6865-42eb-859c-37b8b5ace27e
4c63ea77-2411-4ad8-91df-bde9ac2739f5	audience resolve	openid-connect	oidc-audience-resolve-mapper	bfe8fa02-5527-4589-b742-fffc1ff2ecca	\N
7c484795-af65-4840-985a-8201d5b92439	role list	saml	saml-role-list-mapper	\N	0e0554ff-e972-496b-b654-e23f274e0949
367579d6-b56d-47dd-a118-d97fd71e28d7	organization	saml	saml-organization-membership-mapper	\N	9d1d4914-5b58-4984-9807-607bd63df1ee
b3bf5313-9b4d-4087-8d6b-14323d4be7cb	full name	openid-connect	oidc-full-name-mapper	\N	5a99839f-54f3-4be4-a839-b029dcde8f43
fbfc27d3-1db8-4101-9251-eac602c4a6a8	family name	openid-connect	oidc-usermodel-attribute-mapper	\N	5a99839f-54f3-4be4-a839-b029dcde8f43
c8e89556-c8ec-4869-a2f3-9560c0374d74	given name	openid-connect	oidc-usermodel-attribute-mapper	\N	5a99839f-54f3-4be4-a839-b029dcde8f43
cdb5b75c-cc3b-4a5f-b915-09b95981a5f3	middle name	openid-connect	oidc-usermodel-attribute-mapper	\N	5a99839f-54f3-4be4-a839-b029dcde8f43
1c3d949d-8467-4034-ac56-d6b28fa23895	nickname	openid-connect	oidc-usermodel-attribute-mapper	\N	5a99839f-54f3-4be4-a839-b029dcde8f43
8502b59b-cd54-4371-87de-a2369b874f23	username	openid-connect	oidc-usermodel-attribute-mapper	\N	5a99839f-54f3-4be4-a839-b029dcde8f43
60bdfb38-3ce6-4254-a708-89a39905bb00	profile	openid-connect	oidc-usermodel-attribute-mapper	\N	5a99839f-54f3-4be4-a839-b029dcde8f43
9e733b30-f565-4699-9a68-a2e875b78860	picture	openid-connect	oidc-usermodel-attribute-mapper	\N	5a99839f-54f3-4be4-a839-b029dcde8f43
dad7c3d9-7426-49cd-ae3e-30f8eb3a4fbb	website	openid-connect	oidc-usermodel-attribute-mapper	\N	5a99839f-54f3-4be4-a839-b029dcde8f43
107d883e-f121-446f-b97c-46f78d5eb290	gender	openid-connect	oidc-usermodel-attribute-mapper	\N	5a99839f-54f3-4be4-a839-b029dcde8f43
c5357762-481e-4cfa-b718-e7017dc06e19	birthdate	openid-connect	oidc-usermodel-attribute-mapper	\N	5a99839f-54f3-4be4-a839-b029dcde8f43
45c08a65-494d-4c1a-9970-ecc782c8dfe9	zoneinfo	openid-connect	oidc-usermodel-attribute-mapper	\N	5a99839f-54f3-4be4-a839-b029dcde8f43
f9bf80a2-a387-4840-a45c-544ca139279e	locale	openid-connect	oidc-usermodel-attribute-mapper	\N	5a99839f-54f3-4be4-a839-b029dcde8f43
45337c70-4956-47dc-8b4c-96b216e0e2b5	updated at	openid-connect	oidc-usermodel-attribute-mapper	\N	5a99839f-54f3-4be4-a839-b029dcde8f43
6b2cabfc-1ecc-4745-a317-1360082836f4	email	openid-connect	oidc-usermodel-attribute-mapper	\N	515895da-74fd-4887-8293-5ac2cbb87a5f
e2cf183b-16e7-4c8a-ae70-c558d473671e	email verified	openid-connect	oidc-usermodel-property-mapper	\N	515895da-74fd-4887-8293-5ac2cbb87a5f
67f16ddf-5b00-4204-9193-55beb5dace0f	address	openid-connect	oidc-address-mapper	\N	9c4548f1-e800-4dd3-9a36-b52f29f17c61
db54833e-cdfc-4c49-ac8a-cced8ebdd3b5	phone number	openid-connect	oidc-usermodel-attribute-mapper	\N	cd92d463-3238-4d50-908e-0d88020bf94e
c30721f9-c6f8-4853-b3f6-f23087a913b0	phone number verified	openid-connect	oidc-usermodel-attribute-mapper	\N	cd92d463-3238-4d50-908e-0d88020bf94e
2aa52df6-c2eb-41f5-be75-0087a8c6a017	realm roles	openid-connect	oidc-usermodel-realm-role-mapper	\N	4d256b34-ff7d-4590-9de4-57609db56d1e
b851e904-63a3-4e85-b425-72c4c416865c	client roles	openid-connect	oidc-usermodel-client-role-mapper	\N	4d256b34-ff7d-4590-9de4-57609db56d1e
70363c89-c443-4e39-8a1d-476efa152dfb	audience resolve	openid-connect	oidc-audience-resolve-mapper	\N	4d256b34-ff7d-4590-9de4-57609db56d1e
521302e0-65fc-4bac-a671-f82c847530fc	allowed web origins	openid-connect	oidc-allowed-origins-mapper	\N	5849f091-d0bb-4730-b1fd-260f2e8db73a
8a7bc4b2-050b-46ba-a0bd-012d3b3fa512	upn	openid-connect	oidc-usermodel-attribute-mapper	\N	20821262-da6a-4d55-9e5f-57197f34931d
6844bb28-0ad3-4200-a0a0-0844a1b2e9aa	groups	openid-connect	oidc-usermodel-realm-role-mapper	\N	20821262-da6a-4d55-9e5f-57197f34931d
fdb86418-3497-4348-9d84-c04617474b45	acr loa level	openid-connect	oidc-acr-mapper	\N	35bb7087-3a55-4460-a6aa-a06acb87c69b
657a546e-31dd-426e-a212-084d3d8cad33	auth_time	openid-connect	oidc-usersessionmodel-note-mapper	\N	f32a470f-d1ef-4c47-ae5e-70461fbd50cd
26fe6d67-8fbe-47c0-95f1-7a0f3fb8b911	sub	openid-connect	oidc-sub-mapper	\N	f32a470f-d1ef-4c47-ae5e-70461fbd50cd
23e8d00f-3ee0-4e27-964f-7c2281b6ab5e	Client ID	openid-connect	oidc-usersessionmodel-note-mapper	\N	9e419960-514c-4eac-b208-4b92779afcfd
eba8fa13-baee-44a2-b562-dfac05c8cb83	Client Host	openid-connect	oidc-usersessionmodel-note-mapper	\N	9e419960-514c-4eac-b208-4b92779afcfd
535338ab-d6ac-4bad-aeca-402bcf251670	Client IP Address	openid-connect	oidc-usersessionmodel-note-mapper	\N	9e419960-514c-4eac-b208-4b92779afcfd
4129437f-ecd6-401d-9e33-46681c5088b2	organization	openid-connect	oidc-organization-membership-mapper	\N	902d06b8-881b-4eb7-b395-d06dfeb83723
5c1bc361-5cc7-4343-bb37-9ac26291a835	locale	openid-connect	oidc-usermodel-attribute-mapper	5be18a22-1bf7-4158-b418-7c8b622c8ee0	\N
200d8777-6976-4db5-b2d9-8b7a319f1b32	SOURSD Digital Identifier	openid-connect	oidc-usermodel-attribute-mapper	2e713a57-2d5f-4835-aca9-8342751942d1	\N
423f3ad3-0064-40bc-83ce-55819c784ea4	client roles	openid-connect	oidc-usermodel-client-role-mapper	2e713a57-2d5f-4835-aca9-8342751942d1	\N
bc520589-b1ac-4d23-9683-3a2b4ff7b1b4	Client IP Address	openid-connect	oidc-usersessionmodel-note-mapper	2e713a57-2d5f-4835-aca9-8342751942d1	\N
04a3d887-d279-4fab-91cb-ad96d703486b	Client ID	openid-connect	oidc-usersessionmodel-note-mapper	2e713a57-2d5f-4835-aca9-8342751942d1	\N
5b188df2-d41a-4b43-b140-efa9a1b4d27e	Client Host	openid-connect	oidc-usersessionmodel-note-mapper	2e713a57-2d5f-4835-aca9-8342751942d1	\N
0c56bcf2-04a9-46f5-a99b-cfcc9c32672c	audience resolve	openid-connect	oidc-audience-resolve-mapper	62441632-3a92-48c0-92ab-d80cf0610229	\N
5035bb0b-b125-4f9f-a135-6aadc97494c2	role list	saml	saml-role-list-mapper	\N	f23dd18b-4519-47eb-b83f-320d1184c9f5
eee91249-f5f2-48e3-a731-1ffc5a274ac3	organization	saml	saml-organization-membership-mapper	\N	a51118b2-5916-45e6-a4eb-07deddeb94e8
3f831d9f-2708-44ca-8d7e-cdb360c863ec	full name	openid-connect	oidc-full-name-mapper	\N	53de374b-ee75-4e89-bd5e-76b5e97e931e
0355dec8-2f14-4082-a499-d9211a0aec8e	family name	openid-connect	oidc-usermodel-attribute-mapper	\N	53de374b-ee75-4e89-bd5e-76b5e97e931e
7cb906f6-79af-455c-81f1-8123c3f6d2c8	given name	openid-connect	oidc-usermodel-attribute-mapper	\N	53de374b-ee75-4e89-bd5e-76b5e97e931e
75fbe889-3355-43af-9041-c7e9109bd212	middle name	openid-connect	oidc-usermodel-attribute-mapper	\N	53de374b-ee75-4e89-bd5e-76b5e97e931e
7fdacdaf-4aa1-4f58-b2cc-d347da77d3f9	nickname	openid-connect	oidc-usermodel-attribute-mapper	\N	53de374b-ee75-4e89-bd5e-76b5e97e931e
3059cd83-0c3c-4747-afb6-2fcae2ce9215	username	openid-connect	oidc-usermodel-attribute-mapper	\N	53de374b-ee75-4e89-bd5e-76b5e97e931e
21d21c23-d783-434f-bd3b-65045ed0019f	profile	openid-connect	oidc-usermodel-attribute-mapper	\N	53de374b-ee75-4e89-bd5e-76b5e97e931e
e8b2cd97-10d5-41b4-b391-fa55c3a27ee8	picture	openid-connect	oidc-usermodel-attribute-mapper	\N	53de374b-ee75-4e89-bd5e-76b5e97e931e
a5e98e90-f037-4f05-8151-a8ee783ae335	website	openid-connect	oidc-usermodel-attribute-mapper	\N	53de374b-ee75-4e89-bd5e-76b5e97e931e
75c9d0a5-3662-4cb1-bec8-6124138ade56	gender	openid-connect	oidc-usermodel-attribute-mapper	\N	53de374b-ee75-4e89-bd5e-76b5e97e931e
6f914b8e-608f-47c9-b910-8a920f0d0adf	birthdate	openid-connect	oidc-usermodel-attribute-mapper	\N	53de374b-ee75-4e89-bd5e-76b5e97e931e
964314c8-5346-44de-b026-7e4834117595	zoneinfo	openid-connect	oidc-usermodel-attribute-mapper	\N	53de374b-ee75-4e89-bd5e-76b5e97e931e
84e7d733-ab3e-4af2-a31b-e90ed3f455af	locale	openid-connect	oidc-usermodel-attribute-mapper	\N	53de374b-ee75-4e89-bd5e-76b5e97e931e
dffc8a93-fb06-42e6-a7e5-6c0d5f1e0da1	updated at	openid-connect	oidc-usermodel-attribute-mapper	\N	53de374b-ee75-4e89-bd5e-76b5e97e931e
99d594e6-02d1-40ac-8d8e-73b8894daeef	email	openid-connect	oidc-usermodel-attribute-mapper	\N	5729b064-c40f-45da-9202-334565727841
200da796-d84d-4ff3-bd24-718babffa85c	email verified	openid-connect	oidc-usermodel-property-mapper	\N	5729b064-c40f-45da-9202-334565727841
23de5c44-9fc0-4935-815c-db3894d25eeb	address	openid-connect	oidc-address-mapper	\N	59feeae9-fd9d-44ce-9a75-ffa91737c7c8
0824320a-a466-4718-ae76-66c3cadd750e	phone number	openid-connect	oidc-usermodel-attribute-mapper	\N	9e678102-7b31-4b29-90e6-24ccedb0134e
71d9a598-1002-4203-919e-f364a2f7dcdb	phone number verified	openid-connect	oidc-usermodel-attribute-mapper	\N	9e678102-7b31-4b29-90e6-24ccedb0134e
0aed89fb-2100-40d2-abf4-ca5aad9ff9e0	realm roles	openid-connect	oidc-usermodel-realm-role-mapper	\N	30a52cff-a647-4c73-9846-e4db810c824f
bb945748-4438-40e8-9f3e-3d163d1aae7a	client roles	openid-connect	oidc-usermodel-client-role-mapper	\N	30a52cff-a647-4c73-9846-e4db810c824f
34a70a8b-80db-4f4d-8638-6598fa6b9e3c	audience resolve	openid-connect	oidc-audience-resolve-mapper	\N	30a52cff-a647-4c73-9846-e4db810c824f
91d552e8-b687-4806-a6f4-a02012cec723	allowed web origins	openid-connect	oidc-allowed-origins-mapper	\N	43f1ac4e-a381-4a52-9803-afed159cb010
1afa2ed0-1976-4432-850d-6577a3481819	upn	openid-connect	oidc-usermodel-attribute-mapper	\N	d7bc7861-2a5e-4104-a580-d4ab42afd3d2
73f790b4-b265-4277-a4c8-d48e24517091	groups	openid-connect	oidc-usermodel-realm-role-mapper	\N	d7bc7861-2a5e-4104-a580-d4ab42afd3d2
e60519e1-788c-4f6c-b9ca-066b572f50f3	acr loa level	openid-connect	oidc-acr-mapper	\N	ade43b57-68a1-4a09-a60f-35758c3f5a87
581d11a8-4679-4827-8397-80dfa36da481	auth_time	openid-connect	oidc-usersessionmodel-note-mapper	\N	e0c0563b-1b78-4c49-9e1e-950a58c718e5
e4b25c4f-676f-4f3e-bc22-3301610e6444	sub	openid-connect	oidc-sub-mapper	\N	e0c0563b-1b78-4c49-9e1e-950a58c718e5
607f3bbc-08de-4ff8-ace8-1fbd7b92d8b2	Client ID	openid-connect	oidc-usersessionmodel-note-mapper	\N	fc7a9c04-28dc-47d0-83d3-45191b4c551e
075bc91c-6974-41a6-8727-ff3f90c468ae	Client Host	openid-connect	oidc-usersessionmodel-note-mapper	\N	fc7a9c04-28dc-47d0-83d3-45191b4c551e
0ded4d16-d8fc-4a68-a2d6-0e9bcc3e8262	Client IP Address	openid-connect	oidc-usersessionmodel-note-mapper	\N	fc7a9c04-28dc-47d0-83d3-45191b4c551e
dd62a514-60d4-473d-8203-1db512e32aea	organization	openid-connect	oidc-organization-membership-mapper	\N	af43d9c6-5314-4697-a024-5039f5402435
81064f68-44d7-43cc-8586-a11c32c68a75	locale	openid-connect	oidc-usermodel-attribute-mapper	15641592-9ee8-4f81-9105-06202f2c80b2	\N
\.


--
-- TOC entry 4654 (class 0 OID 20569)
-- Dependencies: 263
-- Data for Name: protocol_mapper_config; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.protocol_mapper_config (protocol_mapper_id, value, name) FROM stdin;
81eaaf18-91a3-47c7-b3e6-ae99950433ce	true	introspection.token.claim
81eaaf18-91a3-47c7-b3e6-ae99950433ce	true	userinfo.token.claim
81eaaf18-91a3-47c7-b3e6-ae99950433ce	locale	user.attribute
81eaaf18-91a3-47c7-b3e6-ae99950433ce	true	id.token.claim
81eaaf18-91a3-47c7-b3e6-ae99950433ce	true	access.token.claim
81eaaf18-91a3-47c7-b3e6-ae99950433ce	locale	claim.name
81eaaf18-91a3-47c7-b3e6-ae99950433ce	String	jsonType.label
90ea66f2-d1c9-4aa9-b4e1-2ad82a8ba842	false	single
90ea66f2-d1c9-4aa9-b4e1-2ad82a8ba842	Basic	attribute.nameformat
90ea66f2-d1c9-4aa9-b4e1-2ad82a8ba842	Role	attribute.name
030b151e-0a5b-4bd9-8563-21edc3a0fb7d	true	introspection.token.claim
030b151e-0a5b-4bd9-8563-21edc3a0fb7d	true	userinfo.token.claim
030b151e-0a5b-4bd9-8563-21edc3a0fb7d	birthdate	user.attribute
030b151e-0a5b-4bd9-8563-21edc3a0fb7d	true	id.token.claim
030b151e-0a5b-4bd9-8563-21edc3a0fb7d	true	access.token.claim
030b151e-0a5b-4bd9-8563-21edc3a0fb7d	birthdate	claim.name
030b151e-0a5b-4bd9-8563-21edc3a0fb7d	String	jsonType.label
0bd15944-91ff-48aa-aca8-c89d7ce1e1fa	true	introspection.token.claim
0bd15944-91ff-48aa-aca8-c89d7ce1e1fa	true	userinfo.token.claim
0bd15944-91ff-48aa-aca8-c89d7ce1e1fa	zoneinfo	user.attribute
0bd15944-91ff-48aa-aca8-c89d7ce1e1fa	true	id.token.claim
0bd15944-91ff-48aa-aca8-c89d7ce1e1fa	true	access.token.claim
0bd15944-91ff-48aa-aca8-c89d7ce1e1fa	zoneinfo	claim.name
0bd15944-91ff-48aa-aca8-c89d7ce1e1fa	String	jsonType.label
46ac4156-045d-43a0-a93f-1e658bc053e6	true	introspection.token.claim
46ac4156-045d-43a0-a93f-1e658bc053e6	true	userinfo.token.claim
46ac4156-045d-43a0-a93f-1e658bc053e6	middleName	user.attribute
46ac4156-045d-43a0-a93f-1e658bc053e6	true	id.token.claim
46ac4156-045d-43a0-a93f-1e658bc053e6	true	access.token.claim
46ac4156-045d-43a0-a93f-1e658bc053e6	middle_name	claim.name
46ac4156-045d-43a0-a93f-1e658bc053e6	String	jsonType.label
8eb1669f-7b5a-4f8a-be65-8cf701ebceee	true	introspection.token.claim
8eb1669f-7b5a-4f8a-be65-8cf701ebceee	true	userinfo.token.claim
8eb1669f-7b5a-4f8a-be65-8cf701ebceee	website	user.attribute
8eb1669f-7b5a-4f8a-be65-8cf701ebceee	true	id.token.claim
8eb1669f-7b5a-4f8a-be65-8cf701ebceee	true	access.token.claim
8eb1669f-7b5a-4f8a-be65-8cf701ebceee	website	claim.name
8eb1669f-7b5a-4f8a-be65-8cf701ebceee	String	jsonType.label
9144ff7b-d0b3-4237-8d10-9c7e8e13c7df	true	introspection.token.claim
9144ff7b-d0b3-4237-8d10-9c7e8e13c7df	true	userinfo.token.claim
9144ff7b-d0b3-4237-8d10-9c7e8e13c7df	firstName	user.attribute
9144ff7b-d0b3-4237-8d10-9c7e8e13c7df	true	id.token.claim
9144ff7b-d0b3-4237-8d10-9c7e8e13c7df	true	access.token.claim
9144ff7b-d0b3-4237-8d10-9c7e8e13c7df	given_name	claim.name
9144ff7b-d0b3-4237-8d10-9c7e8e13c7df	String	jsonType.label
a1167a9c-7f46-4407-86b8-9d2d4e37d0bb	true	introspection.token.claim
a1167a9c-7f46-4407-86b8-9d2d4e37d0bb	true	userinfo.token.claim
a1167a9c-7f46-4407-86b8-9d2d4e37d0bb	lastName	user.attribute
a1167a9c-7f46-4407-86b8-9d2d4e37d0bb	true	id.token.claim
a1167a9c-7f46-4407-86b8-9d2d4e37d0bb	true	access.token.claim
a1167a9c-7f46-4407-86b8-9d2d4e37d0bb	family_name	claim.name
a1167a9c-7f46-4407-86b8-9d2d4e37d0bb	String	jsonType.label
a5402ee8-128a-49c1-ba10-45c67d99e7ed	true	introspection.token.claim
a5402ee8-128a-49c1-ba10-45c67d99e7ed	true	userinfo.token.claim
a5402ee8-128a-49c1-ba10-45c67d99e7ed	nickname	user.attribute
a5402ee8-128a-49c1-ba10-45c67d99e7ed	true	id.token.claim
a5402ee8-128a-49c1-ba10-45c67d99e7ed	true	access.token.claim
a5402ee8-128a-49c1-ba10-45c67d99e7ed	nickname	claim.name
a5402ee8-128a-49c1-ba10-45c67d99e7ed	String	jsonType.label
abe33103-3e4b-4974-811a-c830dde5161f	true	introspection.token.claim
abe33103-3e4b-4974-811a-c830dde5161f	true	userinfo.token.claim
abe33103-3e4b-4974-811a-c830dde5161f	updatedAt	user.attribute
abe33103-3e4b-4974-811a-c830dde5161f	true	id.token.claim
abe33103-3e4b-4974-811a-c830dde5161f	true	access.token.claim
abe33103-3e4b-4974-811a-c830dde5161f	updated_at	claim.name
abe33103-3e4b-4974-811a-c830dde5161f	long	jsonType.label
b0867bf1-f172-4e4f-842c-1015969234bc	true	introspection.token.claim
b0867bf1-f172-4e4f-842c-1015969234bc	true	userinfo.token.claim
b0867bf1-f172-4e4f-842c-1015969234bc	username	user.attribute
b0867bf1-f172-4e4f-842c-1015969234bc	true	id.token.claim
b0867bf1-f172-4e4f-842c-1015969234bc	true	access.token.claim
b0867bf1-f172-4e4f-842c-1015969234bc	preferred_username	claim.name
b0867bf1-f172-4e4f-842c-1015969234bc	String	jsonType.label
b3ab47a8-8409-43dc-8a08-fec8adcc4029	true	introspection.token.claim
b3ab47a8-8409-43dc-8a08-fec8adcc4029	true	userinfo.token.claim
b3ab47a8-8409-43dc-8a08-fec8adcc4029	true	id.token.claim
b3ab47a8-8409-43dc-8a08-fec8adcc4029	true	access.token.claim
cfca5fd6-c419-4b86-917c-adc0091544c8	true	introspection.token.claim
cfca5fd6-c419-4b86-917c-adc0091544c8	true	userinfo.token.claim
cfca5fd6-c419-4b86-917c-adc0091544c8	profile	user.attribute
cfca5fd6-c419-4b86-917c-adc0091544c8	true	id.token.claim
cfca5fd6-c419-4b86-917c-adc0091544c8	true	access.token.claim
cfca5fd6-c419-4b86-917c-adc0091544c8	profile	claim.name
cfca5fd6-c419-4b86-917c-adc0091544c8	String	jsonType.label
d481ca85-6a74-468a-ac70-7381f58fd174	true	introspection.token.claim
d481ca85-6a74-468a-ac70-7381f58fd174	true	userinfo.token.claim
d481ca85-6a74-468a-ac70-7381f58fd174	locale	user.attribute
d481ca85-6a74-468a-ac70-7381f58fd174	true	id.token.claim
d481ca85-6a74-468a-ac70-7381f58fd174	true	access.token.claim
d481ca85-6a74-468a-ac70-7381f58fd174	locale	claim.name
d481ca85-6a74-468a-ac70-7381f58fd174	String	jsonType.label
e7d05472-a95a-451e-9733-d976879b184b	true	introspection.token.claim
e7d05472-a95a-451e-9733-d976879b184b	true	userinfo.token.claim
e7d05472-a95a-451e-9733-d976879b184b	gender	user.attribute
e7d05472-a95a-451e-9733-d976879b184b	true	id.token.claim
e7d05472-a95a-451e-9733-d976879b184b	true	access.token.claim
e7d05472-a95a-451e-9733-d976879b184b	gender	claim.name
e7d05472-a95a-451e-9733-d976879b184b	String	jsonType.label
ef96a2fc-b141-43e4-abf7-99ce1b340883	true	introspection.token.claim
ef96a2fc-b141-43e4-abf7-99ce1b340883	true	userinfo.token.claim
ef96a2fc-b141-43e4-abf7-99ce1b340883	picture	user.attribute
ef96a2fc-b141-43e4-abf7-99ce1b340883	true	id.token.claim
ef96a2fc-b141-43e4-abf7-99ce1b340883	true	access.token.claim
ef96a2fc-b141-43e4-abf7-99ce1b340883	picture	claim.name
ef96a2fc-b141-43e4-abf7-99ce1b340883	String	jsonType.label
31515473-4aff-4154-81be-168eb396b89c	true	introspection.token.claim
31515473-4aff-4154-81be-168eb396b89c	true	userinfo.token.claim
31515473-4aff-4154-81be-168eb396b89c	emailVerified	user.attribute
31515473-4aff-4154-81be-168eb396b89c	true	id.token.claim
31515473-4aff-4154-81be-168eb396b89c	true	access.token.claim
31515473-4aff-4154-81be-168eb396b89c	email_verified	claim.name
31515473-4aff-4154-81be-168eb396b89c	boolean	jsonType.label
6d8aff62-6054-4239-a0d6-f111397a9588	true	introspection.token.claim
6d8aff62-6054-4239-a0d6-f111397a9588	true	userinfo.token.claim
6d8aff62-6054-4239-a0d6-f111397a9588	email	user.attribute
6d8aff62-6054-4239-a0d6-f111397a9588	true	id.token.claim
6d8aff62-6054-4239-a0d6-f111397a9588	true	access.token.claim
6d8aff62-6054-4239-a0d6-f111397a9588	email	claim.name
6d8aff62-6054-4239-a0d6-f111397a9588	String	jsonType.label
6befbc0a-4ced-426b-9e45-a7abca18ef46	formatted	user.attribute.formatted
6befbc0a-4ced-426b-9e45-a7abca18ef46	country	user.attribute.country
6befbc0a-4ced-426b-9e45-a7abca18ef46	true	introspection.token.claim
6befbc0a-4ced-426b-9e45-a7abca18ef46	postal_code	user.attribute.postal_code
6befbc0a-4ced-426b-9e45-a7abca18ef46	true	userinfo.token.claim
6befbc0a-4ced-426b-9e45-a7abca18ef46	street	user.attribute.street
6befbc0a-4ced-426b-9e45-a7abca18ef46	true	id.token.claim
6befbc0a-4ced-426b-9e45-a7abca18ef46	region	user.attribute.region
6befbc0a-4ced-426b-9e45-a7abca18ef46	true	access.token.claim
6befbc0a-4ced-426b-9e45-a7abca18ef46	locality	user.attribute.locality
1f500492-06bc-49f4-98c7-dfa72eedff16	true	introspection.token.claim
1f500492-06bc-49f4-98c7-dfa72eedff16	true	userinfo.token.claim
1f500492-06bc-49f4-98c7-dfa72eedff16	phoneNumberVerified	user.attribute
1f500492-06bc-49f4-98c7-dfa72eedff16	true	id.token.claim
1f500492-06bc-49f4-98c7-dfa72eedff16	true	access.token.claim
1f500492-06bc-49f4-98c7-dfa72eedff16	phone_number_verified	claim.name
1f500492-06bc-49f4-98c7-dfa72eedff16	boolean	jsonType.label
84983cbc-a3ec-49e9-92af-aea2bd9700ee	true	introspection.token.claim
84983cbc-a3ec-49e9-92af-aea2bd9700ee	true	userinfo.token.claim
84983cbc-a3ec-49e9-92af-aea2bd9700ee	phoneNumber	user.attribute
84983cbc-a3ec-49e9-92af-aea2bd9700ee	true	id.token.claim
84983cbc-a3ec-49e9-92af-aea2bd9700ee	true	access.token.claim
84983cbc-a3ec-49e9-92af-aea2bd9700ee	phone_number	claim.name
84983cbc-a3ec-49e9-92af-aea2bd9700ee	String	jsonType.label
3329fe9d-4031-416b-a780-31467fa999bc	true	introspection.token.claim
3329fe9d-4031-416b-a780-31467fa999bc	true	multivalued
3329fe9d-4031-416b-a780-31467fa999bc	foo	user.attribute
3329fe9d-4031-416b-a780-31467fa999bc	true	access.token.claim
3329fe9d-4031-416b-a780-31467fa999bc	resource_access.${client_id}.roles	claim.name
3329fe9d-4031-416b-a780-31467fa999bc	String	jsonType.label
424d27a7-9dd0-4576-84b9-95372b5d6f9b	true	introspection.token.claim
424d27a7-9dd0-4576-84b9-95372b5d6f9b	true	access.token.claim
d49654da-d8ff-428d-b079-3a4bf3a19f8d	true	introspection.token.claim
d49654da-d8ff-428d-b079-3a4bf3a19f8d	true	multivalued
d49654da-d8ff-428d-b079-3a4bf3a19f8d	foo	user.attribute
d49654da-d8ff-428d-b079-3a4bf3a19f8d	true	access.token.claim
d49654da-d8ff-428d-b079-3a4bf3a19f8d	realm_access.roles	claim.name
d49654da-d8ff-428d-b079-3a4bf3a19f8d	String	jsonType.label
83b1ac85-5fd0-4632-89fb-bc3b28813827	true	introspection.token.claim
83b1ac85-5fd0-4632-89fb-bc3b28813827	true	access.token.claim
1558cdeb-4484-4d39-86e2-f4436d35e8be	true	introspection.token.claim
1558cdeb-4484-4d39-86e2-f4436d35e8be	true	userinfo.token.claim
1558cdeb-4484-4d39-86e2-f4436d35e8be	username	user.attribute
1558cdeb-4484-4d39-86e2-f4436d35e8be	true	id.token.claim
1558cdeb-4484-4d39-86e2-f4436d35e8be	true	access.token.claim
1558cdeb-4484-4d39-86e2-f4436d35e8be	upn	claim.name
1558cdeb-4484-4d39-86e2-f4436d35e8be	String	jsonType.label
6353817e-7fcd-45db-a495-a727d1ca637a	true	introspection.token.claim
6353817e-7fcd-45db-a495-a727d1ca637a	true	multivalued
6353817e-7fcd-45db-a495-a727d1ca637a	foo	user.attribute
6353817e-7fcd-45db-a495-a727d1ca637a	true	id.token.claim
6353817e-7fcd-45db-a495-a727d1ca637a	true	access.token.claim
6353817e-7fcd-45db-a495-a727d1ca637a	groups	claim.name
6353817e-7fcd-45db-a495-a727d1ca637a	String	jsonType.label
c3cac1e2-9bca-4f02-b8f9-db26ddc2055c	true	introspection.token.claim
c3cac1e2-9bca-4f02-b8f9-db26ddc2055c	true	id.token.claim
c3cac1e2-9bca-4f02-b8f9-db26ddc2055c	true	access.token.claim
bdcf462e-04d2-459c-978b-b5c44580d85f	true	introspection.token.claim
bdcf462e-04d2-459c-978b-b5c44580d85f	true	access.token.claim
df117d24-4542-4a80-b1b5-ed3fade66931	AUTH_TIME	user.session.note
df117d24-4542-4a80-b1b5-ed3fade66931	true	introspection.token.claim
df117d24-4542-4a80-b1b5-ed3fade66931	true	id.token.claim
df117d24-4542-4a80-b1b5-ed3fade66931	true	access.token.claim
df117d24-4542-4a80-b1b5-ed3fade66931	auth_time	claim.name
df117d24-4542-4a80-b1b5-ed3fade66931	long	jsonType.label
ac9256ea-dfe4-46d4-a7ba-dd841e27feb1	client_id	user.session.note
ac9256ea-dfe4-46d4-a7ba-dd841e27feb1	true	introspection.token.claim
ac9256ea-dfe4-46d4-a7ba-dd841e27feb1	true	id.token.claim
ac9256ea-dfe4-46d4-a7ba-dd841e27feb1	true	access.token.claim
ac9256ea-dfe4-46d4-a7ba-dd841e27feb1	client_id	claim.name
ac9256ea-dfe4-46d4-a7ba-dd841e27feb1	String	jsonType.label
cda2e740-f638-42b6-9c3a-44b8d1864776	clientAddress	user.session.note
cda2e740-f638-42b6-9c3a-44b8d1864776	true	introspection.token.claim
cda2e740-f638-42b6-9c3a-44b8d1864776	true	id.token.claim
cda2e740-f638-42b6-9c3a-44b8d1864776	true	access.token.claim
cda2e740-f638-42b6-9c3a-44b8d1864776	clientAddress	claim.name
cda2e740-f638-42b6-9c3a-44b8d1864776	String	jsonType.label
f679711d-0b00-43a4-bb7e-273818b81613	clientHost	user.session.note
f679711d-0b00-43a4-bb7e-273818b81613	true	introspection.token.claim
f679711d-0b00-43a4-bb7e-273818b81613	true	id.token.claim
f679711d-0b00-43a4-bb7e-273818b81613	true	access.token.claim
f679711d-0b00-43a4-bb7e-273818b81613	clientHost	claim.name
f679711d-0b00-43a4-bb7e-273818b81613	String	jsonType.label
f9fe51dc-9ffc-4191-b930-fe05bf15b71e	true	introspection.token.claim
f9fe51dc-9ffc-4191-b930-fe05bf15b71e	true	multivalued
f9fe51dc-9ffc-4191-b930-fe05bf15b71e	true	id.token.claim
f9fe51dc-9ffc-4191-b930-fe05bf15b71e	true	access.token.claim
f9fe51dc-9ffc-4191-b930-fe05bf15b71e	organization	claim.name
f9fe51dc-9ffc-4191-b930-fe05bf15b71e	String	jsonType.label
7c484795-af65-4840-985a-8201d5b92439	false	single
7c484795-af65-4840-985a-8201d5b92439	Basic	attribute.nameformat
7c484795-af65-4840-985a-8201d5b92439	Role	attribute.name
107d883e-f121-446f-b97c-46f78d5eb290	true	introspection.token.claim
107d883e-f121-446f-b97c-46f78d5eb290	true	userinfo.token.claim
107d883e-f121-446f-b97c-46f78d5eb290	gender	user.attribute
107d883e-f121-446f-b97c-46f78d5eb290	true	id.token.claim
107d883e-f121-446f-b97c-46f78d5eb290	true	access.token.claim
107d883e-f121-446f-b97c-46f78d5eb290	gender	claim.name
107d883e-f121-446f-b97c-46f78d5eb290	String	jsonType.label
1c3d949d-8467-4034-ac56-d6b28fa23895	true	introspection.token.claim
1c3d949d-8467-4034-ac56-d6b28fa23895	true	userinfo.token.claim
1c3d949d-8467-4034-ac56-d6b28fa23895	nickname	user.attribute
1c3d949d-8467-4034-ac56-d6b28fa23895	true	id.token.claim
1c3d949d-8467-4034-ac56-d6b28fa23895	true	access.token.claim
1c3d949d-8467-4034-ac56-d6b28fa23895	nickname	claim.name
1c3d949d-8467-4034-ac56-d6b28fa23895	String	jsonType.label
45337c70-4956-47dc-8b4c-96b216e0e2b5	true	introspection.token.claim
45337c70-4956-47dc-8b4c-96b216e0e2b5	true	userinfo.token.claim
45337c70-4956-47dc-8b4c-96b216e0e2b5	updatedAt	user.attribute
45337c70-4956-47dc-8b4c-96b216e0e2b5	true	id.token.claim
45337c70-4956-47dc-8b4c-96b216e0e2b5	true	access.token.claim
45337c70-4956-47dc-8b4c-96b216e0e2b5	updated_at	claim.name
45337c70-4956-47dc-8b4c-96b216e0e2b5	long	jsonType.label
45c08a65-494d-4c1a-9970-ecc782c8dfe9	true	introspection.token.claim
45c08a65-494d-4c1a-9970-ecc782c8dfe9	true	userinfo.token.claim
45c08a65-494d-4c1a-9970-ecc782c8dfe9	zoneinfo	user.attribute
45c08a65-494d-4c1a-9970-ecc782c8dfe9	true	id.token.claim
45c08a65-494d-4c1a-9970-ecc782c8dfe9	true	access.token.claim
45c08a65-494d-4c1a-9970-ecc782c8dfe9	zoneinfo	claim.name
45c08a65-494d-4c1a-9970-ecc782c8dfe9	String	jsonType.label
60bdfb38-3ce6-4254-a708-89a39905bb00	true	introspection.token.claim
60bdfb38-3ce6-4254-a708-89a39905bb00	true	userinfo.token.claim
60bdfb38-3ce6-4254-a708-89a39905bb00	profile	user.attribute
60bdfb38-3ce6-4254-a708-89a39905bb00	true	id.token.claim
60bdfb38-3ce6-4254-a708-89a39905bb00	true	access.token.claim
60bdfb38-3ce6-4254-a708-89a39905bb00	profile	claim.name
60bdfb38-3ce6-4254-a708-89a39905bb00	String	jsonType.label
8502b59b-cd54-4371-87de-a2369b874f23	true	introspection.token.claim
8502b59b-cd54-4371-87de-a2369b874f23	true	userinfo.token.claim
8502b59b-cd54-4371-87de-a2369b874f23	username	user.attribute
8502b59b-cd54-4371-87de-a2369b874f23	true	id.token.claim
8502b59b-cd54-4371-87de-a2369b874f23	true	access.token.claim
8502b59b-cd54-4371-87de-a2369b874f23	preferred_username	claim.name
8502b59b-cd54-4371-87de-a2369b874f23	String	jsonType.label
9e733b30-f565-4699-9a68-a2e875b78860	true	introspection.token.claim
9e733b30-f565-4699-9a68-a2e875b78860	true	userinfo.token.claim
9e733b30-f565-4699-9a68-a2e875b78860	picture	user.attribute
9e733b30-f565-4699-9a68-a2e875b78860	true	id.token.claim
9e733b30-f565-4699-9a68-a2e875b78860	true	access.token.claim
9e733b30-f565-4699-9a68-a2e875b78860	picture	claim.name
9e733b30-f565-4699-9a68-a2e875b78860	String	jsonType.label
b3bf5313-9b4d-4087-8d6b-14323d4be7cb	true	introspection.token.claim
b3bf5313-9b4d-4087-8d6b-14323d4be7cb	true	userinfo.token.claim
b3bf5313-9b4d-4087-8d6b-14323d4be7cb	true	id.token.claim
b3bf5313-9b4d-4087-8d6b-14323d4be7cb	true	access.token.claim
c5357762-481e-4cfa-b718-e7017dc06e19	true	introspection.token.claim
c5357762-481e-4cfa-b718-e7017dc06e19	true	userinfo.token.claim
c5357762-481e-4cfa-b718-e7017dc06e19	birthdate	user.attribute
c5357762-481e-4cfa-b718-e7017dc06e19	true	id.token.claim
c5357762-481e-4cfa-b718-e7017dc06e19	true	access.token.claim
c5357762-481e-4cfa-b718-e7017dc06e19	birthdate	claim.name
c5357762-481e-4cfa-b718-e7017dc06e19	String	jsonType.label
c8e89556-c8ec-4869-a2f3-9560c0374d74	true	introspection.token.claim
c8e89556-c8ec-4869-a2f3-9560c0374d74	true	userinfo.token.claim
c8e89556-c8ec-4869-a2f3-9560c0374d74	firstName	user.attribute
c8e89556-c8ec-4869-a2f3-9560c0374d74	true	id.token.claim
c8e89556-c8ec-4869-a2f3-9560c0374d74	true	access.token.claim
c8e89556-c8ec-4869-a2f3-9560c0374d74	given_name	claim.name
c8e89556-c8ec-4869-a2f3-9560c0374d74	String	jsonType.label
cdb5b75c-cc3b-4a5f-b915-09b95981a5f3	true	introspection.token.claim
cdb5b75c-cc3b-4a5f-b915-09b95981a5f3	true	userinfo.token.claim
cdb5b75c-cc3b-4a5f-b915-09b95981a5f3	middleName	user.attribute
cdb5b75c-cc3b-4a5f-b915-09b95981a5f3	true	id.token.claim
cdb5b75c-cc3b-4a5f-b915-09b95981a5f3	true	access.token.claim
cdb5b75c-cc3b-4a5f-b915-09b95981a5f3	middle_name	claim.name
cdb5b75c-cc3b-4a5f-b915-09b95981a5f3	String	jsonType.label
dad7c3d9-7426-49cd-ae3e-30f8eb3a4fbb	true	introspection.token.claim
dad7c3d9-7426-49cd-ae3e-30f8eb3a4fbb	true	userinfo.token.claim
dad7c3d9-7426-49cd-ae3e-30f8eb3a4fbb	website	user.attribute
dad7c3d9-7426-49cd-ae3e-30f8eb3a4fbb	true	id.token.claim
dad7c3d9-7426-49cd-ae3e-30f8eb3a4fbb	true	access.token.claim
dad7c3d9-7426-49cd-ae3e-30f8eb3a4fbb	website	claim.name
dad7c3d9-7426-49cd-ae3e-30f8eb3a4fbb	String	jsonType.label
f9bf80a2-a387-4840-a45c-544ca139279e	true	introspection.token.claim
f9bf80a2-a387-4840-a45c-544ca139279e	true	userinfo.token.claim
f9bf80a2-a387-4840-a45c-544ca139279e	locale	user.attribute
f9bf80a2-a387-4840-a45c-544ca139279e	true	id.token.claim
f9bf80a2-a387-4840-a45c-544ca139279e	true	access.token.claim
f9bf80a2-a387-4840-a45c-544ca139279e	locale	claim.name
f9bf80a2-a387-4840-a45c-544ca139279e	String	jsonType.label
fbfc27d3-1db8-4101-9251-eac602c4a6a8	true	introspection.token.claim
fbfc27d3-1db8-4101-9251-eac602c4a6a8	true	userinfo.token.claim
fbfc27d3-1db8-4101-9251-eac602c4a6a8	lastName	user.attribute
fbfc27d3-1db8-4101-9251-eac602c4a6a8	true	id.token.claim
fbfc27d3-1db8-4101-9251-eac602c4a6a8	true	access.token.claim
fbfc27d3-1db8-4101-9251-eac602c4a6a8	family_name	claim.name
fbfc27d3-1db8-4101-9251-eac602c4a6a8	String	jsonType.label
6b2cabfc-1ecc-4745-a317-1360082836f4	true	introspection.token.claim
6b2cabfc-1ecc-4745-a317-1360082836f4	true	userinfo.token.claim
6b2cabfc-1ecc-4745-a317-1360082836f4	email	user.attribute
6b2cabfc-1ecc-4745-a317-1360082836f4	true	id.token.claim
6b2cabfc-1ecc-4745-a317-1360082836f4	true	access.token.claim
6b2cabfc-1ecc-4745-a317-1360082836f4	email	claim.name
6b2cabfc-1ecc-4745-a317-1360082836f4	String	jsonType.label
e2cf183b-16e7-4c8a-ae70-c558d473671e	true	introspection.token.claim
e2cf183b-16e7-4c8a-ae70-c558d473671e	true	userinfo.token.claim
e2cf183b-16e7-4c8a-ae70-c558d473671e	emailVerified	user.attribute
e2cf183b-16e7-4c8a-ae70-c558d473671e	true	id.token.claim
e2cf183b-16e7-4c8a-ae70-c558d473671e	true	access.token.claim
e2cf183b-16e7-4c8a-ae70-c558d473671e	email_verified	claim.name
e2cf183b-16e7-4c8a-ae70-c558d473671e	boolean	jsonType.label
67f16ddf-5b00-4204-9193-55beb5dace0f	formatted	user.attribute.formatted
67f16ddf-5b00-4204-9193-55beb5dace0f	country	user.attribute.country
67f16ddf-5b00-4204-9193-55beb5dace0f	true	introspection.token.claim
67f16ddf-5b00-4204-9193-55beb5dace0f	postal_code	user.attribute.postal_code
67f16ddf-5b00-4204-9193-55beb5dace0f	true	userinfo.token.claim
67f16ddf-5b00-4204-9193-55beb5dace0f	street	user.attribute.street
67f16ddf-5b00-4204-9193-55beb5dace0f	true	id.token.claim
67f16ddf-5b00-4204-9193-55beb5dace0f	region	user.attribute.region
67f16ddf-5b00-4204-9193-55beb5dace0f	true	access.token.claim
67f16ddf-5b00-4204-9193-55beb5dace0f	locality	user.attribute.locality
c30721f9-c6f8-4853-b3f6-f23087a913b0	true	introspection.token.claim
c30721f9-c6f8-4853-b3f6-f23087a913b0	true	userinfo.token.claim
c30721f9-c6f8-4853-b3f6-f23087a913b0	phoneNumberVerified	user.attribute
c30721f9-c6f8-4853-b3f6-f23087a913b0	true	id.token.claim
c30721f9-c6f8-4853-b3f6-f23087a913b0	true	access.token.claim
c30721f9-c6f8-4853-b3f6-f23087a913b0	phone_number_verified	claim.name
c30721f9-c6f8-4853-b3f6-f23087a913b0	boolean	jsonType.label
db54833e-cdfc-4c49-ac8a-cced8ebdd3b5	true	introspection.token.claim
db54833e-cdfc-4c49-ac8a-cced8ebdd3b5	true	userinfo.token.claim
db54833e-cdfc-4c49-ac8a-cced8ebdd3b5	phoneNumber	user.attribute
db54833e-cdfc-4c49-ac8a-cced8ebdd3b5	true	id.token.claim
db54833e-cdfc-4c49-ac8a-cced8ebdd3b5	true	access.token.claim
db54833e-cdfc-4c49-ac8a-cced8ebdd3b5	phone_number	claim.name
db54833e-cdfc-4c49-ac8a-cced8ebdd3b5	String	jsonType.label
2aa52df6-c2eb-41f5-be75-0087a8c6a017	true	introspection.token.claim
2aa52df6-c2eb-41f5-be75-0087a8c6a017	true	multivalued
2aa52df6-c2eb-41f5-be75-0087a8c6a017	foo	user.attribute
2aa52df6-c2eb-41f5-be75-0087a8c6a017	true	access.token.claim
2aa52df6-c2eb-41f5-be75-0087a8c6a017	realm_access.roles	claim.name
2aa52df6-c2eb-41f5-be75-0087a8c6a017	String	jsonType.label
70363c89-c443-4e39-8a1d-476efa152dfb	true	introspection.token.claim
70363c89-c443-4e39-8a1d-476efa152dfb	true	access.token.claim
b851e904-63a3-4e85-b425-72c4c416865c	true	introspection.token.claim
b851e904-63a3-4e85-b425-72c4c416865c	true	multivalued
b851e904-63a3-4e85-b425-72c4c416865c	foo	user.attribute
b851e904-63a3-4e85-b425-72c4c416865c	true	access.token.claim
b851e904-63a3-4e85-b425-72c4c416865c	resource_access.${client_id}.roles	claim.name
b851e904-63a3-4e85-b425-72c4c416865c	String	jsonType.label
521302e0-65fc-4bac-a671-f82c847530fc	true	introspection.token.claim
521302e0-65fc-4bac-a671-f82c847530fc	true	access.token.claim
6844bb28-0ad3-4200-a0a0-0844a1b2e9aa	true	introspection.token.claim
6844bb28-0ad3-4200-a0a0-0844a1b2e9aa	true	multivalued
6844bb28-0ad3-4200-a0a0-0844a1b2e9aa	foo	user.attribute
6844bb28-0ad3-4200-a0a0-0844a1b2e9aa	true	id.token.claim
6844bb28-0ad3-4200-a0a0-0844a1b2e9aa	true	access.token.claim
6844bb28-0ad3-4200-a0a0-0844a1b2e9aa	groups	claim.name
6844bb28-0ad3-4200-a0a0-0844a1b2e9aa	String	jsonType.label
8a7bc4b2-050b-46ba-a0bd-012d3b3fa512	true	introspection.token.claim
8a7bc4b2-050b-46ba-a0bd-012d3b3fa512	true	userinfo.token.claim
8a7bc4b2-050b-46ba-a0bd-012d3b3fa512	username	user.attribute
8a7bc4b2-050b-46ba-a0bd-012d3b3fa512	true	id.token.claim
8a7bc4b2-050b-46ba-a0bd-012d3b3fa512	true	access.token.claim
8a7bc4b2-050b-46ba-a0bd-012d3b3fa512	upn	claim.name
8a7bc4b2-050b-46ba-a0bd-012d3b3fa512	String	jsonType.label
fdb86418-3497-4348-9d84-c04617474b45	true	introspection.token.claim
fdb86418-3497-4348-9d84-c04617474b45	true	id.token.claim
fdb86418-3497-4348-9d84-c04617474b45	true	access.token.claim
26fe6d67-8fbe-47c0-95f1-7a0f3fb8b911	true	introspection.token.claim
26fe6d67-8fbe-47c0-95f1-7a0f3fb8b911	true	access.token.claim
657a546e-31dd-426e-a212-084d3d8cad33	AUTH_TIME	user.session.note
657a546e-31dd-426e-a212-084d3d8cad33	true	introspection.token.claim
657a546e-31dd-426e-a212-084d3d8cad33	true	id.token.claim
657a546e-31dd-426e-a212-084d3d8cad33	true	access.token.claim
657a546e-31dd-426e-a212-084d3d8cad33	auth_time	claim.name
657a546e-31dd-426e-a212-084d3d8cad33	long	jsonType.label
23e8d00f-3ee0-4e27-964f-7c2281b6ab5e	client_id	user.session.note
23e8d00f-3ee0-4e27-964f-7c2281b6ab5e	true	introspection.token.claim
23e8d00f-3ee0-4e27-964f-7c2281b6ab5e	true	id.token.claim
23e8d00f-3ee0-4e27-964f-7c2281b6ab5e	true	access.token.claim
23e8d00f-3ee0-4e27-964f-7c2281b6ab5e	client_id	claim.name
23e8d00f-3ee0-4e27-964f-7c2281b6ab5e	String	jsonType.label
535338ab-d6ac-4bad-aeca-402bcf251670	clientAddress	user.session.note
535338ab-d6ac-4bad-aeca-402bcf251670	true	introspection.token.claim
535338ab-d6ac-4bad-aeca-402bcf251670	true	id.token.claim
535338ab-d6ac-4bad-aeca-402bcf251670	true	access.token.claim
535338ab-d6ac-4bad-aeca-402bcf251670	clientAddress	claim.name
535338ab-d6ac-4bad-aeca-402bcf251670	String	jsonType.label
eba8fa13-baee-44a2-b562-dfac05c8cb83	clientHost	user.session.note
eba8fa13-baee-44a2-b562-dfac05c8cb83	true	introspection.token.claim
eba8fa13-baee-44a2-b562-dfac05c8cb83	true	id.token.claim
eba8fa13-baee-44a2-b562-dfac05c8cb83	true	access.token.claim
eba8fa13-baee-44a2-b562-dfac05c8cb83	clientHost	claim.name
eba8fa13-baee-44a2-b562-dfac05c8cb83	String	jsonType.label
4129437f-ecd6-401d-9e33-46681c5088b2	true	introspection.token.claim
4129437f-ecd6-401d-9e33-46681c5088b2	true	multivalued
4129437f-ecd6-401d-9e33-46681c5088b2	true	id.token.claim
4129437f-ecd6-401d-9e33-46681c5088b2	true	access.token.claim
4129437f-ecd6-401d-9e33-46681c5088b2	organization	claim.name
4129437f-ecd6-401d-9e33-46681c5088b2	String	jsonType.label
5c1bc361-5cc7-4343-bb37-9ac26291a835	true	introspection.token.claim
5c1bc361-5cc7-4343-bb37-9ac26291a835	true	userinfo.token.claim
5c1bc361-5cc7-4343-bb37-9ac26291a835	locale	user.attribute
5c1bc361-5cc7-4343-bb37-9ac26291a835	true	id.token.claim
5c1bc361-5cc7-4343-bb37-9ac26291a835	true	access.token.claim
5c1bc361-5cc7-4343-bb37-9ac26291a835	locale	claim.name
5c1bc361-5cc7-4343-bb37-9ac26291a835	String	jsonType.label
200d8777-6976-4db5-b2d9-8b7a319f1b32	true	introspection.token.claim
200d8777-6976-4db5-b2d9-8b7a319f1b32	true	userinfo.token.claim
200d8777-6976-4db5-b2d9-8b7a319f1b32	soursdDigitalIdentifier	user.attribute
200d8777-6976-4db5-b2d9-8b7a319f1b32	true	id.token.claim
200d8777-6976-4db5-b2d9-8b7a319f1b32	true	lightweight.claim
200d8777-6976-4db5-b2d9-8b7a319f1b32	true	access.token.claim
200d8777-6976-4db5-b2d9-8b7a319f1b32	soursdDigitalIdentifier	claim.name
200d8777-6976-4db5-b2d9-8b7a319f1b32	String	jsonType.label
423f3ad3-0064-40bc-83ce-55819c784ea4	foo	user.attribute
423f3ad3-0064-40bc-83ce-55819c784ea4	true	introspection.token.claim
423f3ad3-0064-40bc-83ce-55819c784ea4	true	access.token.claim
423f3ad3-0064-40bc-83ce-55819c784ea4	resource_access.${client_id}.roles	claim.name
423f3ad3-0064-40bc-83ce-55819c784ea4	String	jsonType.label
423f3ad3-0064-40bc-83ce-55819c784ea4	true	multivalued
bc520589-b1ac-4d23-9683-3a2b4ff7b1b4	clientAddress	user.session.note
bc520589-b1ac-4d23-9683-3a2b4ff7b1b4	true	introspection.token.claim
bc520589-b1ac-4d23-9683-3a2b4ff7b1b4	true	userinfo.token.claim
bc520589-b1ac-4d23-9683-3a2b4ff7b1b4	true	id.token.claim
bc520589-b1ac-4d23-9683-3a2b4ff7b1b4	false	lightweight.claim
bc520589-b1ac-4d23-9683-3a2b4ff7b1b4	true	access.token.claim
bc520589-b1ac-4d23-9683-3a2b4ff7b1b4	clientAddress	claim.name
bc520589-b1ac-4d23-9683-3a2b4ff7b1b4	String	jsonType.label
bc520589-b1ac-4d23-9683-3a2b4ff7b1b4	false	access.tokenResponse.claim
04a3d887-d279-4fab-91cb-ad96d703486b	client_id	user.session.note
04a3d887-d279-4fab-91cb-ad96d703486b	true	introspection.token.claim
04a3d887-d279-4fab-91cb-ad96d703486b	true	userinfo.token.claim
04a3d887-d279-4fab-91cb-ad96d703486b	true	id.token.claim
04a3d887-d279-4fab-91cb-ad96d703486b	false	lightweight.claim
04a3d887-d279-4fab-91cb-ad96d703486b	true	access.token.claim
04a3d887-d279-4fab-91cb-ad96d703486b	client_id	claim.name
04a3d887-d279-4fab-91cb-ad96d703486b	String	jsonType.label
04a3d887-d279-4fab-91cb-ad96d703486b	false	access.tokenResponse.claim
5b188df2-d41a-4b43-b140-efa9a1b4d27e	clientHost	user.session.note
5b188df2-d41a-4b43-b140-efa9a1b4d27e	true	introspection.token.claim
5b188df2-d41a-4b43-b140-efa9a1b4d27e	true	userinfo.token.claim
5b188df2-d41a-4b43-b140-efa9a1b4d27e	true	id.token.claim
5b188df2-d41a-4b43-b140-efa9a1b4d27e	false	lightweight.claim
5b188df2-d41a-4b43-b140-efa9a1b4d27e	true	access.token.claim
5b188df2-d41a-4b43-b140-efa9a1b4d27e	clientHost	claim.name
5b188df2-d41a-4b43-b140-efa9a1b4d27e	String	jsonType.label
5b188df2-d41a-4b43-b140-efa9a1b4d27e	false	access.tokenResponse.claim
5035bb0b-b125-4f9f-a135-6aadc97494c2	false	single
5035bb0b-b125-4f9f-a135-6aadc97494c2	Basic	attribute.nameformat
5035bb0b-b125-4f9f-a135-6aadc97494c2	Role	attribute.name
0355dec8-2f14-4082-a499-d9211a0aec8e	true	introspection.token.claim
0355dec8-2f14-4082-a499-d9211a0aec8e	true	userinfo.token.claim
0355dec8-2f14-4082-a499-d9211a0aec8e	lastName	user.attribute
0355dec8-2f14-4082-a499-d9211a0aec8e	true	id.token.claim
0355dec8-2f14-4082-a499-d9211a0aec8e	true	access.token.claim
0355dec8-2f14-4082-a499-d9211a0aec8e	family_name	claim.name
0355dec8-2f14-4082-a499-d9211a0aec8e	String	jsonType.label
21d21c23-d783-434f-bd3b-65045ed0019f	true	introspection.token.claim
21d21c23-d783-434f-bd3b-65045ed0019f	true	userinfo.token.claim
21d21c23-d783-434f-bd3b-65045ed0019f	profile	user.attribute
21d21c23-d783-434f-bd3b-65045ed0019f	true	id.token.claim
21d21c23-d783-434f-bd3b-65045ed0019f	true	access.token.claim
21d21c23-d783-434f-bd3b-65045ed0019f	profile	claim.name
21d21c23-d783-434f-bd3b-65045ed0019f	String	jsonType.label
3059cd83-0c3c-4747-afb6-2fcae2ce9215	true	introspection.token.claim
3059cd83-0c3c-4747-afb6-2fcae2ce9215	true	userinfo.token.claim
3059cd83-0c3c-4747-afb6-2fcae2ce9215	username	user.attribute
3059cd83-0c3c-4747-afb6-2fcae2ce9215	true	id.token.claim
3059cd83-0c3c-4747-afb6-2fcae2ce9215	true	access.token.claim
3059cd83-0c3c-4747-afb6-2fcae2ce9215	preferred_username	claim.name
3059cd83-0c3c-4747-afb6-2fcae2ce9215	String	jsonType.label
3f831d9f-2708-44ca-8d7e-cdb360c863ec	true	introspection.token.claim
3f831d9f-2708-44ca-8d7e-cdb360c863ec	true	userinfo.token.claim
3f831d9f-2708-44ca-8d7e-cdb360c863ec	true	id.token.claim
3f831d9f-2708-44ca-8d7e-cdb360c863ec	true	access.token.claim
6f914b8e-608f-47c9-b910-8a920f0d0adf	true	introspection.token.claim
6f914b8e-608f-47c9-b910-8a920f0d0adf	true	userinfo.token.claim
6f914b8e-608f-47c9-b910-8a920f0d0adf	birthdate	user.attribute
6f914b8e-608f-47c9-b910-8a920f0d0adf	true	id.token.claim
6f914b8e-608f-47c9-b910-8a920f0d0adf	true	access.token.claim
6f914b8e-608f-47c9-b910-8a920f0d0adf	birthdate	claim.name
6f914b8e-608f-47c9-b910-8a920f0d0adf	String	jsonType.label
75c9d0a5-3662-4cb1-bec8-6124138ade56	true	introspection.token.claim
75c9d0a5-3662-4cb1-bec8-6124138ade56	true	userinfo.token.claim
75c9d0a5-3662-4cb1-bec8-6124138ade56	gender	user.attribute
75c9d0a5-3662-4cb1-bec8-6124138ade56	true	id.token.claim
75c9d0a5-3662-4cb1-bec8-6124138ade56	true	access.token.claim
75c9d0a5-3662-4cb1-bec8-6124138ade56	gender	claim.name
75c9d0a5-3662-4cb1-bec8-6124138ade56	String	jsonType.label
75fbe889-3355-43af-9041-c7e9109bd212	true	introspection.token.claim
75fbe889-3355-43af-9041-c7e9109bd212	true	userinfo.token.claim
75fbe889-3355-43af-9041-c7e9109bd212	middleName	user.attribute
75fbe889-3355-43af-9041-c7e9109bd212	true	id.token.claim
75fbe889-3355-43af-9041-c7e9109bd212	true	access.token.claim
75fbe889-3355-43af-9041-c7e9109bd212	middle_name	claim.name
75fbe889-3355-43af-9041-c7e9109bd212	String	jsonType.label
7cb906f6-79af-455c-81f1-8123c3f6d2c8	true	introspection.token.claim
7cb906f6-79af-455c-81f1-8123c3f6d2c8	true	userinfo.token.claim
7cb906f6-79af-455c-81f1-8123c3f6d2c8	firstName	user.attribute
7cb906f6-79af-455c-81f1-8123c3f6d2c8	true	id.token.claim
7cb906f6-79af-455c-81f1-8123c3f6d2c8	true	access.token.claim
7cb906f6-79af-455c-81f1-8123c3f6d2c8	given_name	claim.name
7cb906f6-79af-455c-81f1-8123c3f6d2c8	String	jsonType.label
7fdacdaf-4aa1-4f58-b2cc-d347da77d3f9	true	introspection.token.claim
7fdacdaf-4aa1-4f58-b2cc-d347da77d3f9	true	userinfo.token.claim
7fdacdaf-4aa1-4f58-b2cc-d347da77d3f9	nickname	user.attribute
7fdacdaf-4aa1-4f58-b2cc-d347da77d3f9	true	id.token.claim
7fdacdaf-4aa1-4f58-b2cc-d347da77d3f9	true	access.token.claim
7fdacdaf-4aa1-4f58-b2cc-d347da77d3f9	nickname	claim.name
7fdacdaf-4aa1-4f58-b2cc-d347da77d3f9	String	jsonType.label
84e7d733-ab3e-4af2-a31b-e90ed3f455af	true	introspection.token.claim
84e7d733-ab3e-4af2-a31b-e90ed3f455af	true	userinfo.token.claim
84e7d733-ab3e-4af2-a31b-e90ed3f455af	locale	user.attribute
84e7d733-ab3e-4af2-a31b-e90ed3f455af	true	id.token.claim
84e7d733-ab3e-4af2-a31b-e90ed3f455af	true	access.token.claim
84e7d733-ab3e-4af2-a31b-e90ed3f455af	locale	claim.name
84e7d733-ab3e-4af2-a31b-e90ed3f455af	String	jsonType.label
964314c8-5346-44de-b026-7e4834117595	true	introspection.token.claim
964314c8-5346-44de-b026-7e4834117595	true	userinfo.token.claim
964314c8-5346-44de-b026-7e4834117595	zoneinfo	user.attribute
964314c8-5346-44de-b026-7e4834117595	true	id.token.claim
964314c8-5346-44de-b026-7e4834117595	true	access.token.claim
964314c8-5346-44de-b026-7e4834117595	zoneinfo	claim.name
964314c8-5346-44de-b026-7e4834117595	String	jsonType.label
a5e98e90-f037-4f05-8151-a8ee783ae335	true	introspection.token.claim
a5e98e90-f037-4f05-8151-a8ee783ae335	true	userinfo.token.claim
a5e98e90-f037-4f05-8151-a8ee783ae335	website	user.attribute
a5e98e90-f037-4f05-8151-a8ee783ae335	true	id.token.claim
a5e98e90-f037-4f05-8151-a8ee783ae335	true	access.token.claim
a5e98e90-f037-4f05-8151-a8ee783ae335	website	claim.name
a5e98e90-f037-4f05-8151-a8ee783ae335	String	jsonType.label
dffc8a93-fb06-42e6-a7e5-6c0d5f1e0da1	true	introspection.token.claim
dffc8a93-fb06-42e6-a7e5-6c0d5f1e0da1	true	userinfo.token.claim
dffc8a93-fb06-42e6-a7e5-6c0d5f1e0da1	updatedAt	user.attribute
dffc8a93-fb06-42e6-a7e5-6c0d5f1e0da1	true	id.token.claim
dffc8a93-fb06-42e6-a7e5-6c0d5f1e0da1	true	access.token.claim
dffc8a93-fb06-42e6-a7e5-6c0d5f1e0da1	updated_at	claim.name
dffc8a93-fb06-42e6-a7e5-6c0d5f1e0da1	long	jsonType.label
e8b2cd97-10d5-41b4-b391-fa55c3a27ee8	true	introspection.token.claim
e8b2cd97-10d5-41b4-b391-fa55c3a27ee8	true	userinfo.token.claim
e8b2cd97-10d5-41b4-b391-fa55c3a27ee8	picture	user.attribute
e8b2cd97-10d5-41b4-b391-fa55c3a27ee8	true	id.token.claim
e8b2cd97-10d5-41b4-b391-fa55c3a27ee8	true	access.token.claim
e8b2cd97-10d5-41b4-b391-fa55c3a27ee8	picture	claim.name
e8b2cd97-10d5-41b4-b391-fa55c3a27ee8	String	jsonType.label
200da796-d84d-4ff3-bd24-718babffa85c	true	introspection.token.claim
200da796-d84d-4ff3-bd24-718babffa85c	true	userinfo.token.claim
200da796-d84d-4ff3-bd24-718babffa85c	emailVerified	user.attribute
200da796-d84d-4ff3-bd24-718babffa85c	true	id.token.claim
200da796-d84d-4ff3-bd24-718babffa85c	true	access.token.claim
200da796-d84d-4ff3-bd24-718babffa85c	email_verified	claim.name
200da796-d84d-4ff3-bd24-718babffa85c	boolean	jsonType.label
99d594e6-02d1-40ac-8d8e-73b8894daeef	true	introspection.token.claim
99d594e6-02d1-40ac-8d8e-73b8894daeef	true	userinfo.token.claim
99d594e6-02d1-40ac-8d8e-73b8894daeef	email	user.attribute
99d594e6-02d1-40ac-8d8e-73b8894daeef	true	id.token.claim
99d594e6-02d1-40ac-8d8e-73b8894daeef	true	access.token.claim
99d594e6-02d1-40ac-8d8e-73b8894daeef	email	claim.name
99d594e6-02d1-40ac-8d8e-73b8894daeef	String	jsonType.label
23de5c44-9fc0-4935-815c-db3894d25eeb	formatted	user.attribute.formatted
23de5c44-9fc0-4935-815c-db3894d25eeb	country	user.attribute.country
23de5c44-9fc0-4935-815c-db3894d25eeb	true	introspection.token.claim
23de5c44-9fc0-4935-815c-db3894d25eeb	postal_code	user.attribute.postal_code
23de5c44-9fc0-4935-815c-db3894d25eeb	true	userinfo.token.claim
23de5c44-9fc0-4935-815c-db3894d25eeb	street	user.attribute.street
23de5c44-9fc0-4935-815c-db3894d25eeb	true	id.token.claim
23de5c44-9fc0-4935-815c-db3894d25eeb	region	user.attribute.region
23de5c44-9fc0-4935-815c-db3894d25eeb	true	access.token.claim
23de5c44-9fc0-4935-815c-db3894d25eeb	locality	user.attribute.locality
0824320a-a466-4718-ae76-66c3cadd750e	true	introspection.token.claim
0824320a-a466-4718-ae76-66c3cadd750e	true	userinfo.token.claim
0824320a-a466-4718-ae76-66c3cadd750e	phoneNumber	user.attribute
0824320a-a466-4718-ae76-66c3cadd750e	true	id.token.claim
0824320a-a466-4718-ae76-66c3cadd750e	true	access.token.claim
0824320a-a466-4718-ae76-66c3cadd750e	phone_number	claim.name
0824320a-a466-4718-ae76-66c3cadd750e	String	jsonType.label
71d9a598-1002-4203-919e-f364a2f7dcdb	true	introspection.token.claim
71d9a598-1002-4203-919e-f364a2f7dcdb	true	userinfo.token.claim
71d9a598-1002-4203-919e-f364a2f7dcdb	phoneNumberVerified	user.attribute
71d9a598-1002-4203-919e-f364a2f7dcdb	true	id.token.claim
71d9a598-1002-4203-919e-f364a2f7dcdb	true	access.token.claim
71d9a598-1002-4203-919e-f364a2f7dcdb	phone_number_verified	claim.name
71d9a598-1002-4203-919e-f364a2f7dcdb	boolean	jsonType.label
0aed89fb-2100-40d2-abf4-ca5aad9ff9e0	true	introspection.token.claim
0aed89fb-2100-40d2-abf4-ca5aad9ff9e0	true	multivalued
0aed89fb-2100-40d2-abf4-ca5aad9ff9e0	foo	user.attribute
0aed89fb-2100-40d2-abf4-ca5aad9ff9e0	true	access.token.claim
0aed89fb-2100-40d2-abf4-ca5aad9ff9e0	realm_access.roles	claim.name
0aed89fb-2100-40d2-abf4-ca5aad9ff9e0	String	jsonType.label
34a70a8b-80db-4f4d-8638-6598fa6b9e3c	true	introspection.token.claim
34a70a8b-80db-4f4d-8638-6598fa6b9e3c	true	access.token.claim
bb945748-4438-40e8-9f3e-3d163d1aae7a	true	introspection.token.claim
bb945748-4438-40e8-9f3e-3d163d1aae7a	true	multivalued
bb945748-4438-40e8-9f3e-3d163d1aae7a	foo	user.attribute
bb945748-4438-40e8-9f3e-3d163d1aae7a	true	access.token.claim
bb945748-4438-40e8-9f3e-3d163d1aae7a	resource_access.${client_id}.roles	claim.name
bb945748-4438-40e8-9f3e-3d163d1aae7a	String	jsonType.label
91d552e8-b687-4806-a6f4-a02012cec723	true	introspection.token.claim
91d552e8-b687-4806-a6f4-a02012cec723	true	access.token.claim
1afa2ed0-1976-4432-850d-6577a3481819	true	introspection.token.claim
1afa2ed0-1976-4432-850d-6577a3481819	true	userinfo.token.claim
1afa2ed0-1976-4432-850d-6577a3481819	username	user.attribute
1afa2ed0-1976-4432-850d-6577a3481819	true	id.token.claim
1afa2ed0-1976-4432-850d-6577a3481819	true	access.token.claim
1afa2ed0-1976-4432-850d-6577a3481819	upn	claim.name
1afa2ed0-1976-4432-850d-6577a3481819	String	jsonType.label
73f790b4-b265-4277-a4c8-d48e24517091	true	introspection.token.claim
73f790b4-b265-4277-a4c8-d48e24517091	true	multivalued
73f790b4-b265-4277-a4c8-d48e24517091	foo	user.attribute
73f790b4-b265-4277-a4c8-d48e24517091	true	id.token.claim
73f790b4-b265-4277-a4c8-d48e24517091	true	access.token.claim
73f790b4-b265-4277-a4c8-d48e24517091	groups	claim.name
73f790b4-b265-4277-a4c8-d48e24517091	String	jsonType.label
e60519e1-788c-4f6c-b9ca-066b572f50f3	true	introspection.token.claim
e60519e1-788c-4f6c-b9ca-066b572f50f3	true	id.token.claim
e60519e1-788c-4f6c-b9ca-066b572f50f3	true	access.token.claim
581d11a8-4679-4827-8397-80dfa36da481	AUTH_TIME	user.session.note
581d11a8-4679-4827-8397-80dfa36da481	true	introspection.token.claim
581d11a8-4679-4827-8397-80dfa36da481	true	id.token.claim
581d11a8-4679-4827-8397-80dfa36da481	true	access.token.claim
581d11a8-4679-4827-8397-80dfa36da481	auth_time	claim.name
581d11a8-4679-4827-8397-80dfa36da481	long	jsonType.label
e4b25c4f-676f-4f3e-bc22-3301610e6444	true	introspection.token.claim
e4b25c4f-676f-4f3e-bc22-3301610e6444	true	access.token.claim
075bc91c-6974-41a6-8727-ff3f90c468ae	clientHost	user.session.note
075bc91c-6974-41a6-8727-ff3f90c468ae	true	introspection.token.claim
075bc91c-6974-41a6-8727-ff3f90c468ae	true	id.token.claim
075bc91c-6974-41a6-8727-ff3f90c468ae	true	access.token.claim
075bc91c-6974-41a6-8727-ff3f90c468ae	clientHost	claim.name
075bc91c-6974-41a6-8727-ff3f90c468ae	String	jsonType.label
0ded4d16-d8fc-4a68-a2d6-0e9bcc3e8262	clientAddress	user.session.note
0ded4d16-d8fc-4a68-a2d6-0e9bcc3e8262	true	introspection.token.claim
0ded4d16-d8fc-4a68-a2d6-0e9bcc3e8262	true	id.token.claim
0ded4d16-d8fc-4a68-a2d6-0e9bcc3e8262	true	access.token.claim
0ded4d16-d8fc-4a68-a2d6-0e9bcc3e8262	clientAddress	claim.name
0ded4d16-d8fc-4a68-a2d6-0e9bcc3e8262	String	jsonType.label
607f3bbc-08de-4ff8-ace8-1fbd7b92d8b2	client_id	user.session.note
607f3bbc-08de-4ff8-ace8-1fbd7b92d8b2	true	introspection.token.claim
607f3bbc-08de-4ff8-ace8-1fbd7b92d8b2	true	id.token.claim
607f3bbc-08de-4ff8-ace8-1fbd7b92d8b2	true	access.token.claim
607f3bbc-08de-4ff8-ace8-1fbd7b92d8b2	client_id	claim.name
607f3bbc-08de-4ff8-ace8-1fbd7b92d8b2	String	jsonType.label
dd62a514-60d4-473d-8203-1db512e32aea	true	introspection.token.claim
dd62a514-60d4-473d-8203-1db512e32aea	true	multivalued
dd62a514-60d4-473d-8203-1db512e32aea	true	id.token.claim
dd62a514-60d4-473d-8203-1db512e32aea	true	access.token.claim
dd62a514-60d4-473d-8203-1db512e32aea	organization	claim.name
dd62a514-60d4-473d-8203-1db512e32aea	String	jsonType.label
81064f68-44d7-43cc-8586-a11c32c68a75	true	introspection.token.claim
81064f68-44d7-43cc-8586-a11c32c68a75	true	userinfo.token.claim
81064f68-44d7-43cc-8586-a11c32c68a75	locale	user.attribute
81064f68-44d7-43cc-8586-a11c32c68a75	true	id.token.claim
81064f68-44d7-43cc-8586-a11c32c68a75	true	access.token.claim
81064f68-44d7-43cc-8586-a11c32c68a75	locale	claim.name
81064f68-44d7-43cc-8586-a11c32c68a75	String	jsonType.label
\.


--
-- TOC entry 4655 (class 0 OID 20574)
-- Dependencies: 264
-- Data for Name: realm; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.realm (id, access_code_lifespan, user_action_lifespan, access_token_lifespan, account_theme, admin_theme, email_theme, enabled, events_enabled, events_expiration, login_theme, name, not_before, password_policy, registration_allowed, remember_me, reset_password_allowed, social, ssl_required, sso_idle_timeout, sso_max_lifespan, update_profile_on_soc_login, verify_email, master_admin_client, login_lifespan, internationalization_enabled, default_locale, reg_email_as_username, admin_events_enabled, admin_events_details_enabled, edit_username_allowed, otp_policy_counter, otp_policy_window, otp_policy_period, otp_policy_digits, otp_policy_alg, otp_policy_type, browser_flow, registration_flow, direct_grant_flow, reset_credentials_flow, client_auth_flow, offline_session_idle_timeout, revoke_refresh_token, access_token_life_implicit, login_with_email_allowed, duplicate_emails_allowed, docker_auth_flow, refresh_token_max_reuse, allow_user_managed_access, sso_max_lifespan_remember_me, sso_idle_timeout_remember_me, default_role) FROM stdin;
573be4f5-590a-4831-a3f3-de3d8f56ec34	60	300	60	\N	\N	\N	t	f	0	\N	master	0	\N	f	f	f	f	EXTERNAL	1800	36000	f	f	07b5d519-49d8-4951-b05c-ac90a831a805	1800	f	\N	f	f	f	f	0	1	30	6	HmacSHA1	totp	19a16325-2f06-4121-9263-8b920bd70fb5	8d8b43a6-bd31-4294-9371-5ecf5c98387d	992c783e-b987-46de-a2ea-fdc73d5db459	a0635e83-f6ac-4a73-9ada-c56edca67a49	e577ab38-112c-418c-80dc-a59e2bd48270	2592000	f	900	t	f	5e204185-10d4-4153-843c-02650d978555	0	f	0	0	6a3d63b8-8120-496e-a754-46e48e6a77b6
726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	60	300	300	\N	\N	\N	t	f	0	\N	GATEWAY	0	\N	f	f	f	f	EXTERNAL	1800	36000	f	f	7dfb6d8f-b5cf-475f-bee6-9aedc73d5130	1800	f	\N	f	f	f	f	0	1	30	6	HmacSHA1	totp	5225f254-30bd-4be6-967b-3eb7b0d06806	9e58ab26-47a1-46fc-bb49-01a776fe3a4e	831a2334-6e5b-4968-8c3b-1835d90a9276	600c471e-3d34-419a-8bb1-d547add33bff	f066861a-4711-451e-aa2f-b84291bf574c	2592000	f	900	t	f	c9f96d95-d372-45d7-8aa2-541fa5790b10	0	f	0	0	0ab4a22c-a6b0-4ecd-bce5-12ae08d53d94
95b0b755-b0d8-46d1-99b5-be385e3fa5c4	60	10800	10800				t	f	0	safepeopleregistry	SOURSD	1765212405	\N	t	t	t	f	EXTERNAL	10800	36000	f	t	0ee85feb-a7a6-4204-9d2e-0d5acd52f0e9	10800	f	\N	t	f	f	f	0	1	30	6	HmacSHA1	totp	a997f31d-0946-4e2b-a826-a064c426fc46	2b1716c6-98b1-4e79-b7c3-47957f4d8b4b	42b24d19-6011-4d5d-a80a-f38785737b6a	f641142b-65b5-42a7-86ef-5844d10e9436	ba387be5-c3d9-4351-b8bd-b731f3705123	2592000	f	900	t	f	8238cb30-cde4-4593-90b4-81fb0d84b1f2	0	f	0	0	38b8a18d-3182-4cab-84a5-3e0060de74ef
\.


--
-- TOC entry 4656 (class 0 OID 20607)
-- Dependencies: 265
-- Data for Name: realm_attribute; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.realm_attribute (name, realm_id, value) FROM stdin;
_browser_header.contentSecurityPolicyReportOnly	573be4f5-590a-4831-a3f3-de3d8f56ec34	
_browser_header.xContentTypeOptions	573be4f5-590a-4831-a3f3-de3d8f56ec34	nosniff
_browser_header.referrerPolicy	573be4f5-590a-4831-a3f3-de3d8f56ec34	no-referrer
_browser_header.xRobotsTag	573be4f5-590a-4831-a3f3-de3d8f56ec34	none
_browser_header.xFrameOptions	573be4f5-590a-4831-a3f3-de3d8f56ec34	SAMEORIGIN
_browser_header.xXSSProtection	573be4f5-590a-4831-a3f3-de3d8f56ec34	1; mode=block
_browser_header.strictTransportSecurity	573be4f5-590a-4831-a3f3-de3d8f56ec34	max-age=31536000; includeSubDomains
bruteForceProtected	573be4f5-590a-4831-a3f3-de3d8f56ec34	false
permanentLockout	573be4f5-590a-4831-a3f3-de3d8f56ec34	false
maxTemporaryLockouts	573be4f5-590a-4831-a3f3-de3d8f56ec34	0
bruteForceStrategy	573be4f5-590a-4831-a3f3-de3d8f56ec34	MULTIPLE
maxFailureWaitSeconds	573be4f5-590a-4831-a3f3-de3d8f56ec34	900
minimumQuickLoginWaitSeconds	573be4f5-590a-4831-a3f3-de3d8f56ec34	60
waitIncrementSeconds	573be4f5-590a-4831-a3f3-de3d8f56ec34	60
quickLoginCheckMilliSeconds	573be4f5-590a-4831-a3f3-de3d8f56ec34	1000
maxDeltaTimeSeconds	573be4f5-590a-4831-a3f3-de3d8f56ec34	43200
failureFactor	573be4f5-590a-4831-a3f3-de3d8f56ec34	30
realmReusableOtpCode	573be4f5-590a-4831-a3f3-de3d8f56ec34	false
firstBrokerLoginFlowId	573be4f5-590a-4831-a3f3-de3d8f56ec34	0b249727-dc1b-42a9-8921-8331e387741b
displayName	573be4f5-590a-4831-a3f3-de3d8f56ec34	Keycloak
displayNameHtml	573be4f5-590a-4831-a3f3-de3d8f56ec34	<div class="kc-logo-text"><span>Keycloak</span></div>
defaultSignatureAlgorithm	573be4f5-590a-4831-a3f3-de3d8f56ec34	RS256
offlineSessionMaxLifespanEnabled	573be4f5-590a-4831-a3f3-de3d8f56ec34	false
offlineSessionMaxLifespan	573be4f5-590a-4831-a3f3-de3d8f56ec34	5184000
bruteForceProtected	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	false
permanentLockout	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	false
maxTemporaryLockouts	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	0
bruteForceStrategy	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	MULTIPLE
maxFailureWaitSeconds	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	900
minimumQuickLoginWaitSeconds	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	60
waitIncrementSeconds	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	60
quickLoginCheckMilliSeconds	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	1000
maxDeltaTimeSeconds	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	43200
failureFactor	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	30
realmReusableOtpCode	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	false
defaultSignatureAlgorithm	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	RS256
offlineSessionMaxLifespanEnabled	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	false
offlineSessionMaxLifespan	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	5184000
oauth2DeviceCodeLifespan	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	600
oauth2DevicePollingInterval	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	5
webAuthnPolicyRpEntityName	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	keycloak
webAuthnPolicySignatureAlgorithms	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	ES256,RS256
webAuthnPolicyRpId	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	
webAuthnPolicyAttestationConveyancePreference	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	not specified
webAuthnPolicyAuthenticatorAttachment	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	not specified
webAuthnPolicyRequireResidentKey	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	not specified
webAuthnPolicyUserVerificationRequirement	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	not specified
webAuthnPolicyCreateTimeout	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	0
webAuthnPolicyAvoidSameAuthenticatorRegister	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	false
webAuthnPolicyRpEntityNamePasswordless	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	keycloak
webAuthnPolicySignatureAlgorithmsPasswordless	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	ES256,RS256
webAuthnPolicyRpIdPasswordless	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	
webAuthnPolicyAttestationConveyancePreferencePasswordless	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	not specified
webAuthnPolicyAuthenticatorAttachmentPasswordless	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	not specified
webAuthnPolicyRequireResidentKeyPasswordless	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	not specified
webAuthnPolicyUserVerificationRequirementPasswordless	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	not specified
webAuthnPolicyCreateTimeoutPasswordless	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	0
webAuthnPolicyAvoidSameAuthenticatorRegisterPasswordless	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	false
cibaBackchannelTokenDeliveryMode	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	poll
cibaExpiresIn	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	120
cibaInterval	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	5
cibaAuthRequestedUserHint	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	login_hint
parRequestUriLifespan	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	60
firstBrokerLoginFlowId	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	c21873f4-703b-4070-99cb-e39542826529
organizationsEnabled	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	false
adminPermissionsEnabled	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	false
verifiableCredentialsEnabled	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	false
actionTokenGeneratedByAdminLifespan	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	2073600
client-policies.profiles	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	{"profiles":[]}
client-policies.policies	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	{"policies":[]}
frontendUrl	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	
acr.loa.map	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	{}
clientOfflineSessionIdleTimeout	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	0
clientOfflineSessionMaxLifespan	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	0
clientSessionIdleTimeout	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	10800
clientSessionMaxLifespan	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	10800
shortVerificationUri	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	
actionTokenGeneratedByUserLifespan.verify-email	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	
actionTokenGeneratedByUserLifespan.idp-verify-account-via-email	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	
actionTokenGeneratedByUserLifespan.reset-credentials	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	
actionTokenGeneratedByUserLifespan.execute-actions	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	
displayName	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	Safe People Registry
displayNameHtml	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	Safe People Registry
_browser_header.contentSecurityPolicyReportOnly	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	
_browser_header.xContentTypeOptions	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	nosniff
_browser_header.referrerPolicy	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	no-referrer
_browser_header.xRobotsTag	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	none
_browser_header.xFrameOptions	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	SAMEORIGIN
_browser_header.contentSecurityPolicy	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	frame-src 'self'; frame-ancestors 'self'; object-src 'none';
_browser_header.xXSSProtection	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	1; mode=block
_browser_header.strictTransportSecurity	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	max-age=31536000; includeSubDomains
bruteForceProtected	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	false
permanentLockout	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	false
maxTemporaryLockouts	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	0
bruteForceStrategy	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	MULTIPLE
maxFailureWaitSeconds	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	900
minimumQuickLoginWaitSeconds	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	60
waitIncrementSeconds	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	60
quickLoginCheckMilliSeconds	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	1000
maxDeltaTimeSeconds	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	43200
failureFactor	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	30
realmReusableOtpCode	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	false
defaultSignatureAlgorithm	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	RS256
offlineSessionMaxLifespanEnabled	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	false
offlineSessionMaxLifespan	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	5184000
actionTokenGeneratedByAdminLifespan	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	43200
actionTokenGeneratedByUserLifespan	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	300
oauth2DeviceCodeLifespan	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	600
oauth2DevicePollingInterval	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	5
webAuthnPolicyRpEntityName	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	keycloak
webAuthnPolicySignatureAlgorithms	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	ES256,RS256
webAuthnPolicyRpId	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	
webAuthnPolicyAttestationConveyancePreference	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	not specified
webAuthnPolicyAuthenticatorAttachment	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	not specified
webAuthnPolicyRequireResidentKey	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	not specified
webAuthnPolicyUserVerificationRequirement	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	not specified
webAuthnPolicyCreateTimeout	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	0
webAuthnPolicyAvoidSameAuthenticatorRegister	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	false
webAuthnPolicyRpEntityNamePasswordless	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	keycloak
webAuthnPolicySignatureAlgorithmsPasswordless	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	ES256,RS256
webAuthnPolicyRpIdPasswordless	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	
webAuthnPolicyAttestationConveyancePreferencePasswordless	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	not specified
webAuthnPolicyAuthenticatorAttachmentPasswordless	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	not specified
webAuthnPolicyRequireResidentKeyPasswordless	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	not specified
webAuthnPolicyUserVerificationRequirementPasswordless	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	not specified
webAuthnPolicyCreateTimeoutPasswordless	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	0
webAuthnPolicyAvoidSameAuthenticatorRegisterPasswordless	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	false
cibaBackchannelTokenDeliveryMode	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	poll
cibaExpiresIn	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	120
cibaInterval	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	5
cibaAuthRequestedUserHint	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	login_hint
parRequestUriLifespan	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	60
firstBrokerLoginFlowId	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	f3b8759d-f220-4370-8503-5d26c7630df0
darkMode	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	true
_browser_header.contentSecurityPolicyReportOnly	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	
_browser_header.xContentTypeOptions	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	nosniff
_browser_header.referrerPolicy	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	no-referrer
_browser_header.xRobotsTag	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	none
_browser_header.xFrameOptions	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	SAMEORIGIN
_browser_header.xXSSProtection	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	1; mode=block
_browser_header.strictTransportSecurity	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	max-age=31536000; includeSubDomains
_browser_header.contentSecurityPolicy	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	frame-src 'self' https://www.google.com https://recaptcha.google.com; frame-ancestors 'self' https://www.google.com https://recaptcha.google.com; object-src 'none';
actionTokenGeneratedByUserLifespan	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	1800
cibaBackchannelTokenDeliveryMode	573be4f5-590a-4831-a3f3-de3d8f56ec34	poll
cibaExpiresIn	573be4f5-590a-4831-a3f3-de3d8f56ec34	120
cibaAuthRequestedUserHint	573be4f5-590a-4831-a3f3-de3d8f56ec34	login_hint
parRequestUriLifespan	573be4f5-590a-4831-a3f3-de3d8f56ec34	60
cibaInterval	573be4f5-590a-4831-a3f3-de3d8f56ec34	5
organizationsEnabled	573be4f5-590a-4831-a3f3-de3d8f56ec34	false
adminPermissionsEnabled	573be4f5-590a-4831-a3f3-de3d8f56ec34	false
verifiableCredentialsEnabled	573be4f5-590a-4831-a3f3-de3d8f56ec34	false
actionTokenGeneratedByAdminLifespan	573be4f5-590a-4831-a3f3-de3d8f56ec34	43200
actionTokenGeneratedByUserLifespan	573be4f5-590a-4831-a3f3-de3d8f56ec34	300
oauth2DeviceCodeLifespan	573be4f5-590a-4831-a3f3-de3d8f56ec34	600
oauth2DevicePollingInterval	573be4f5-590a-4831-a3f3-de3d8f56ec34	5
clientSessionIdleTimeout	573be4f5-590a-4831-a3f3-de3d8f56ec34	0
clientSessionMaxLifespan	573be4f5-590a-4831-a3f3-de3d8f56ec34	0
clientOfflineSessionIdleTimeout	573be4f5-590a-4831-a3f3-de3d8f56ec34	0
clientOfflineSessionMaxLifespan	573be4f5-590a-4831-a3f3-de3d8f56ec34	0
webAuthnPolicyRpEntityName	573be4f5-590a-4831-a3f3-de3d8f56ec34	keycloak
webAuthnPolicySignatureAlgorithms	573be4f5-590a-4831-a3f3-de3d8f56ec34	ES256,RS256
webAuthnPolicyRpId	573be4f5-590a-4831-a3f3-de3d8f56ec34	
webAuthnPolicyAttestationConveyancePreference	573be4f5-590a-4831-a3f3-de3d8f56ec34	not specified
webAuthnPolicyAuthenticatorAttachment	573be4f5-590a-4831-a3f3-de3d8f56ec34	not specified
webAuthnPolicyRequireResidentKey	573be4f5-590a-4831-a3f3-de3d8f56ec34	not specified
webAuthnPolicyUserVerificationRequirement	573be4f5-590a-4831-a3f3-de3d8f56ec34	not specified
webAuthnPolicyCreateTimeout	573be4f5-590a-4831-a3f3-de3d8f56ec34	0
webAuthnPolicyAvoidSameAuthenticatorRegister	573be4f5-590a-4831-a3f3-de3d8f56ec34	false
webAuthnPolicyRpEntityNamePasswordless	573be4f5-590a-4831-a3f3-de3d8f56ec34	keycloak
webAuthnPolicySignatureAlgorithmsPasswordless	573be4f5-590a-4831-a3f3-de3d8f56ec34	ES256,RS256
webAuthnPolicyRpIdPasswordless	573be4f5-590a-4831-a3f3-de3d8f56ec34	
webAuthnPolicyAttestationConveyancePreferencePasswordless	573be4f5-590a-4831-a3f3-de3d8f56ec34	not specified
webAuthnPolicyAuthenticatorAttachmentPasswordless	573be4f5-590a-4831-a3f3-de3d8f56ec34	not specified
webAuthnPolicyRequireResidentKeyPasswordless	573be4f5-590a-4831-a3f3-de3d8f56ec34	not specified
webAuthnPolicyUserVerificationRequirementPasswordless	573be4f5-590a-4831-a3f3-de3d8f56ec34	not specified
webAuthnPolicyCreateTimeoutPasswordless	573be4f5-590a-4831-a3f3-de3d8f56ec34	0
webAuthnPolicyAvoidSameAuthenticatorRegisterPasswordless	573be4f5-590a-4831-a3f3-de3d8f56ec34	false
client-policies.profiles	573be4f5-590a-4831-a3f3-de3d8f56ec34	{"profiles":[]}
client-policies.policies	573be4f5-590a-4831-a3f3-de3d8f56ec34	{"policies":[]}
_browser_header.contentSecurityPolicy	573be4f5-590a-4831-a3f3-de3d8f56ec34	frame-src 'self' https://www.google.com  https://recaptcha.google.com; frame-ancestors 'self' https://www.google.com  https://recaptcha.google.com; object-src 'none';
\.


--
-- TOC entry 4657 (class 0 OID 20612)
-- Dependencies: 266
-- Data for Name: realm_default_groups; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.realm_default_groups (realm_id, group_id) FROM stdin;
\.


--
-- TOC entry 4658 (class 0 OID 20615)
-- Dependencies: 267
-- Data for Name: realm_enabled_event_types; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.realm_enabled_event_types (realm_id, value) FROM stdin;
\.


--
-- TOC entry 4659 (class 0 OID 20618)
-- Dependencies: 268
-- Data for Name: realm_events_listeners; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.realm_events_listeners (realm_id, value) FROM stdin;
726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	jboss-logging
95b0b755-b0d8-46d1-99b5-be385e3fa5c4	jboss-logging
573be4f5-590a-4831-a3f3-de3d8f56ec34	jboss-logging
\.


--
-- TOC entry 4660 (class 0 OID 20621)
-- Dependencies: 269
-- Data for Name: realm_localizations; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.realm_localizations (realm_id, locale, texts) FROM stdin;
\.


--
-- TOC entry 4661 (class 0 OID 20626)
-- Dependencies: 270
-- Data for Name: realm_required_credential; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.realm_required_credential (type, form_label, input, secret, realm_id) FROM stdin;
password	password	t	t	573be4f5-590a-4831-a3f3-de3d8f56ec34
password	password	t	t	95b0b755-b0d8-46d1-99b5-be385e3fa5c4
password	password	t	t	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8
\.


--
-- TOC entry 4662 (class 0 OID 20633)
-- Dependencies: 271
-- Data for Name: realm_smtp_config; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.realm_smtp_config (realm_id, value, name) FROM stdin;
95b0b755-b0d8-46d1-99b5-be385e3fa5c4	Safe People Registry	replyToDisplayName
95b0b755-b0d8-46d1-99b5-be385e3fa5c4	false	debug
95b0b755-b0d8-46d1-99b5-be385e3fa5c4	false	starttls
95b0b755-b0d8-46d1-99b5-be385e3fa5c4	false	auth
95b0b755-b0d8-46d1-99b5-be385e3fa5c4	enquiries@safepeopleregistry.org	envelopeFrom
95b0b755-b0d8-46d1-99b5-be385e3fa5c4	false	ssl
95b0b755-b0d8-46d1-99b5-be385e3fa5c4		password
95b0b755-b0d8-46d1-99b5-be385e3fa5c4	1025	port
95b0b755-b0d8-46d1-99b5-be385e3fa5c4	host.docker.internal	host
95b0b755-b0d8-46d1-99b5-be385e3fa5c4	enquiries@safepeopleregistry.org	replyTo
95b0b755-b0d8-46d1-99b5-be385e3fa5c4	enquiries@safepeopleregistry.org	from
95b0b755-b0d8-46d1-99b5-be385e3fa5c4	Safe People Registry	fromDisplayName
95b0b755-b0d8-46d1-99b5-be385e3fa5c4	basic	authType
95b0b755-b0d8-46d1-99b5-be385e3fa5c4		user
\.


--
-- TOC entry 4663 (class 0 OID 20638)
-- Dependencies: 272
-- Data for Name: realm_supported_locales; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.realm_supported_locales (realm_id, value) FROM stdin;
\.


--
-- TOC entry 4664 (class 0 OID 20641)
-- Dependencies: 273
-- Data for Name: redirect_uris; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.redirect_uris (client_id, value) FROM stdin;
d3a27c66-ae91-4435-a6a6-5086541347c3	/realms/master/account/*
da966e37-8ea8-4a7b-8b59-50904a68592b	/realms/master/account/*
ab6c7ed6-6fcd-479e-872f-ace1a9468cc5	/admin/master/console/*
82a0f406-c93d-4f1d-8972-09987311bf32	/realms/SOURSD/account/*
bfe8fa02-5527-4589-b742-fffc1ff2ecca	/realms/SOURSD/account/*
5be18a22-1bf7-4158-b418-7c8b622c8ee0	/admin/SOURSD/console/*
62441632-3a92-48c0-92ab-d80cf0610229	/realms/GATEWAY/account/*
15641592-9ee8-4f81-9105-06202f2c80b2	/admin/GATEWAY/console/*
53dcc167-e5c7-4a51-b708-cef18370e62c	/realms/GATEWAY/account/*
bfad858c-3558-4e6d-99e6-d1e29a08adc0	/api/federation/login
bfad858c-3558-4e6d-99e6-d1e29a08adc0	/api/federation/validate/email
bfad858c-3558-4e6d-99e6-d1e29a08adc0	/api/federation/validate
bfad858c-3558-4e6d-99e6-d1e29a08adc0	/api/federation/auth/callback
2e713a57-2d5f-4835-aca9-8342751942d1	http://localhost:3000/api/auth/register*
2e713a57-2d5f-4835-aca9-8342751942d1	http://localhost:3000/api/auth/login
\.


--
-- TOC entry 4665 (class 0 OID 20644)
-- Dependencies: 274
-- Data for Name: required_action_config; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.required_action_config (required_action_id, value, name) FROM stdin;
\.


--
-- TOC entry 4666 (class 0 OID 20649)
-- Dependencies: 275
-- Data for Name: required_action_provider; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.required_action_provider (id, alias, name, realm_id, enabled, default_action, provider_id, priority) FROM stdin;
a27522ee-1934-4d97-b881-fa8e95d3d25e	VERIFY_EMAIL	Verify Email	573be4f5-590a-4831-a3f3-de3d8f56ec34	t	f	VERIFY_EMAIL	50
56887856-e7c7-44ab-9acb-1af4a3641df3	UPDATE_PROFILE	Update Profile	573be4f5-590a-4831-a3f3-de3d8f56ec34	t	f	UPDATE_PROFILE	40
d915f3d2-0127-4f9f-a976-2234f6e0b505	CONFIGURE_TOTP	Configure OTP	573be4f5-590a-4831-a3f3-de3d8f56ec34	t	f	CONFIGURE_TOTP	10
fb548566-3816-4624-929f-79dd3e202d49	UPDATE_PASSWORD	Update Password	573be4f5-590a-4831-a3f3-de3d8f56ec34	t	f	UPDATE_PASSWORD	30
b585be38-2285-47ef-a0f2-59f57339e834	TERMS_AND_CONDITIONS	Terms and Conditions	573be4f5-590a-4831-a3f3-de3d8f56ec34	f	f	TERMS_AND_CONDITIONS	20
451b4523-477a-48df-be3a-42266bf06b84	delete_account	Delete Account	573be4f5-590a-4831-a3f3-de3d8f56ec34	f	f	delete_account	60
c01f3482-674c-4091-9325-1e90c4e537b2	delete_credential	Delete Credential	573be4f5-590a-4831-a3f3-de3d8f56ec34	t	f	delete_credential	100
94348002-2be4-481d-9441-fb50ff625f97	update_user_locale	Update User Locale	573be4f5-590a-4831-a3f3-de3d8f56ec34	t	f	update_user_locale	1000
36db31f5-fcf3-4fa0-a749-539804ecb217	webauthn-register	Webauthn Register	573be4f5-590a-4831-a3f3-de3d8f56ec34	t	f	webauthn-register	70
a84d8060-63c8-45c7-a7f6-94c811414128	webauthn-register-passwordless	Webauthn Register Passwordless	573be4f5-590a-4831-a3f3-de3d8f56ec34	t	f	webauthn-register-passwordless	80
956c7432-efa3-4ffc-9a81-de08c1ab2105	VERIFY_PROFILE	Verify Profile	573be4f5-590a-4831-a3f3-de3d8f56ec34	t	f	VERIFY_PROFILE	90
db917b50-c8bf-47cf-87b7-f2c8abb870d4	VERIFY_EMAIL	Verify Email	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	t	f	VERIFY_EMAIL	50
ed5302bf-0e7d-4a59-a0e2-f57bbc1e9c5d	UPDATE_PROFILE	Update Profile	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	t	f	UPDATE_PROFILE	40
fd1878a3-f248-471b-8b04-ee85dd1edc78	CONFIGURE_TOTP	Configure OTP	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	t	f	CONFIGURE_TOTP	10
c4d72b5a-5244-47ce-b7ee-899da4ed1c93	UPDATE_PASSWORD	Update Password	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	t	f	UPDATE_PASSWORD	30
21bb5cb5-546c-4a93-918c-40479e64b351	TERMS_AND_CONDITIONS	Terms and Conditions	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	f	f	TERMS_AND_CONDITIONS	20
b5e962e4-3515-4567-8864-0316ebc8ba11	delete_account	Delete Account	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	f	f	delete_account	60
db73fbcc-6909-43f7-b30b-4eb1a76e7d05	delete_credential	Delete Credential	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	t	f	delete_credential	100
4b51337d-62cb-4911-9e54-9eec374903ed	update_user_locale	Update User Locale	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	t	f	update_user_locale	1000
4f4b8609-842b-44a9-841f-95385bc91da9	webauthn-register	Webauthn Register	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	t	f	webauthn-register	70
09fe1915-66b5-4ab4-9a00-41418b2045f1	webauthn-register-passwordless	Webauthn Register Passwordless	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	t	f	webauthn-register-passwordless	80
affb6be5-62bd-4f17-b70c-57e30c22de36	VERIFY_PROFILE	Verify Profile	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	t	f	VERIFY_PROFILE	90
142dd044-aec2-4347-bc52-b7ba69a4a403	VERIFY_EMAIL	Verify Email	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	t	f	VERIFY_EMAIL	50
eff89097-00a9-44a8-a307-afe7fc4d21d7	UPDATE_PROFILE	Update Profile	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	t	f	UPDATE_PROFILE	40
a9b8bdf3-7f8c-4d71-8c7b-6ab46a672dd0	CONFIGURE_TOTP	Configure OTP	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	t	f	CONFIGURE_TOTP	10
2858b95b-5974-4884-8dfe-d66b356c7ee8	UPDATE_PASSWORD	Update Password	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	t	f	UPDATE_PASSWORD	30
66994f53-4169-4b97-9ef4-7f7a0f8744d9	TERMS_AND_CONDITIONS	Terms and Conditions	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	f	f	TERMS_AND_CONDITIONS	20
36634eb4-687c-428a-80c1-ed056dcc17ff	delete_account	Delete Account	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	f	f	delete_account	60
9d77debb-07bc-4bc4-826f-b9f33581818c	delete_credential	Delete Credential	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	t	f	delete_credential	100
4c9f60f3-5d8f-47b2-b6e1-0718e7f95a1a	update_user_locale	Update User Locale	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	t	f	update_user_locale	1000
f50b894e-b211-4452-baa0-399aa3db0bd0	webauthn-register	Webauthn Register	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	t	f	webauthn-register	70
b85f7dd7-7194-468a-9ec5-19624e5b65c8	webauthn-register-passwordless	Webauthn Register Passwordless	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	t	f	webauthn-register-passwordless	80
0e62a55b-f214-4116-8711-f690e1af3777	VERIFY_PROFILE	Verify Profile	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	t	f	VERIFY_PROFILE	90
\.


--
-- TOC entry 4667 (class 0 OID 20656)
-- Dependencies: 276
-- Data for Name: resource_attribute; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.resource_attribute (id, name, value, resource_id) FROM stdin;
\.


--
-- TOC entry 4668 (class 0 OID 20662)
-- Dependencies: 277
-- Data for Name: resource_policy; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.resource_policy (resource_id, policy_id) FROM stdin;
\.


--
-- TOC entry 4669 (class 0 OID 20665)
-- Dependencies: 278
-- Data for Name: resource_scope; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.resource_scope (resource_id, scope_id) FROM stdin;
\.


--
-- TOC entry 4670 (class 0 OID 20668)
-- Dependencies: 279
-- Data for Name: resource_server; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.resource_server (id, allow_rs_remote_mgmt, policy_enforce_mode, decision_strategy) FROM stdin;
2e713a57-2d5f-4835-aca9-8342751942d1	t	0	1
\.


--
-- TOC entry 4671 (class 0 OID 20673)
-- Dependencies: 280
-- Data for Name: resource_server_perm_ticket; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.resource_server_perm_ticket (id, owner, requester, created_timestamp, granted_timestamp, resource_id, scope_id, resource_server_id, policy_id) FROM stdin;
\.


--
-- TOC entry 4672 (class 0 OID 20678)
-- Dependencies: 281
-- Data for Name: resource_server_policy; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.resource_server_policy (id, name, description, type, decision_strategy, logic, resource_server_id, owner) FROM stdin;
12544e4e-c3cc-45b9-b0d4-6c3479515fed	Default Policy	A policy that grants access only for users within this realm	js	0	0	2e713a57-2d5f-4835-aca9-8342751942d1	\N
73ef5ea0-1113-45b5-a5dd-6042cb2bd4e7	Default Permission	A permission that applies to the default resource type	resource	1	0	2e713a57-2d5f-4835-aca9-8342751942d1	\N
\.


--
-- TOC entry 4673 (class 0 OID 20683)
-- Dependencies: 282
-- Data for Name: resource_server_resource; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.resource_server_resource (id, name, type, icon_uri, owner, resource_server_id, owner_managed_access, display_name) FROM stdin;
7f074710-83ca-4250-af11-26fa87f5a162	Default Resource	urn:speedi-registry-app:resources:default	\N	2e713a57-2d5f-4835-aca9-8342751942d1	2e713a57-2d5f-4835-aca9-8342751942d1	f	\N
\.


--
-- TOC entry 4674 (class 0 OID 20689)
-- Dependencies: 283
-- Data for Name: resource_server_scope; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.resource_server_scope (id, name, icon_uri, resource_server_id, display_name) FROM stdin;
\.


--
-- TOC entry 4675 (class 0 OID 20694)
-- Dependencies: 284
-- Data for Name: resource_uris; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.resource_uris (resource_id, value) FROM stdin;
7f074710-83ca-4250-af11-26fa87f5a162	/*
\.


--
-- TOC entry 4676 (class 0 OID 20697)
-- Dependencies: 285
-- Data for Name: revoked_token; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.revoked_token (id, expire) FROM stdin;
\.


--
-- TOC entry 4677 (class 0 OID 20700)
-- Dependencies: 286
-- Data for Name: role_attribute; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.role_attribute (id, role_id, name, value) FROM stdin;
\.


--
-- TOC entry 4678 (class 0 OID 20705)
-- Dependencies: 287
-- Data for Name: scope_mapping; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.scope_mapping (client_id, role_id) FROM stdin;
da966e37-8ea8-4a7b-8b59-50904a68592b	adb5fe1e-3a1e-4828-9e5e-de17410695de
da966e37-8ea8-4a7b-8b59-50904a68592b	efc1723a-8ffb-4046-8954-bb1aaffa2bed
bfe8fa02-5527-4589-b742-fffc1ff2ecca	079a673e-5870-4eda-a663-f54f338c89b6
bfe8fa02-5527-4589-b742-fffc1ff2ecca	b9b03f2e-dff5-41a8-ba05-cc6e648704c9
62441632-3a92-48c0-92ab-d80cf0610229	9b349862-5881-4ff4-91ba-abef77d8a8c1
62441632-3a92-48c0-92ab-d80cf0610229	8b91fbd6-3c22-46ed-87b0-dac8523d9f55
\.


--
-- TOC entry 4679 (class 0 OID 20708)
-- Dependencies: 288
-- Data for Name: scope_policy; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.scope_policy (scope_id, policy_id) FROM stdin;
\.


--
-- TOC entry 4680 (class 0 OID 20711)
-- Dependencies: 289
-- Data for Name: server_config; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.server_config (server_config_key, value, version) FROM stdin;
crt_jgroups	{"prvKey":"MIIEowIBAAKCAQEA3SlqPTgYkbFb0TD5CUs6eQK9XsN2QE3tef2eFU0pmbYrvcL3Cnb3Vz9K/SU5OnhsEtT3XiPaw03Z8kIDh/1GxAwRVlOnesxNmNT9eOHi5DrKA3TMok1AwVo1mNka83jnqoJRoPKDjt0wJa8tv0U6gDQpPjbwpeRksUjIBUte6UIbQ83cu0Qm9fp9tduhm8Hd4MSslwNUBxlnYIe0tPV5tht5t42PLIu+iutlUcCVndulk/z+3Q0PiuYrR0SYEpygKdDq4Uv3ABedJZ00jAtjZqRR0oy/55WZZPpFgRDot6taSI8f5Z1Fvc409L1Y7AKRSFfRYSr92puraZGDW7ZA5wIDAQABAoIBABRdWT2vNKlLE5FSWRwp+TBmDYSfAFHbhcp94q3uH66FFRyxdIive7G6T5q6cBKaPsQH0t9a8yyYtpZAIzhvx1xgtW1QNqkatup5HP33OX/v3zos6croIiurtX5llL278a5vDDqDGj9wI/F/DU9XfejgOgv93cWTdPzTdCzzS8IJUFtwMWdAob21eRkPYUq0TZr1r0BLCTi2KKn+e9EihQxAInOZUzllm4EDSDVAVh7aJ14d8Xe54Wz6nwR84vGxf75AWV/A8p2ayoNNsVuxmJZPQZhigSvg9Im9AmLLY40WNjwomu6rPpwg96bj12sfrRfU5P/yz6aMPl75ODl3ZEECgYEA/1K7m8wocMVrd5SH6jkqeu0/cYfCn7kFC1VCS+XczI+IwuOXX+laejAjza9VFlYeb4XCBwm2RuUsZTGvG76m7//WJdbXYaRnDdCvKjDGRdvZaGCwHT3hCXtBeU6bNFpjNgxjq2pxlW0cWa17cE4N3Pi7QCWPbLJrDTvTdNOBteUCgYEA3b9/5E8QeGGTJaQUCnFmRwp1TK37aHdIc5E/Dd+R6NG8gxXAuhBAVLP5FsNt18ca9Be71Yjf12biGklXoX4xW1TZhu5qTT8Q78tctFLGAiuMeKzaFKXE1ZioyQm3YwIHaB9CWDsbSbz49uL+jvQU737tIg12BtySJgR4LhfGrtsCgYBmKkTH4rmL5nNKNjTslFNbPPPWCezm3LIYBtWwaRohAI5I7aj0x/tcSUcKVs5FUdB775nkFw7I74sEMw1OnMtP3Z9jJMSqXY6fCJIO39V2vrIQAiB2kvwpPxjD4aBZIpHwXqTDQqSQlkhx2ek61wDVGvJSiLULWZlcgkPqy3drwQKBgQDLdb3+2ZyfF8hPrTDGNC5H2IywAqK+w1Oy1f4o2I2kNWzmSbs//VFJZqiR/lZ2ubU9adlqn9/iX//tZoYFIyheSIgeifr3TXpYyxsQSTJtI1AMGW0vrLnh0eRsMYIWUfJB0wyor/LlwYId5UD0IXhkFu21ZOx6dz+RqmAqyp3+KQKBgCQuZhEBPVR1Yg70/wjiTZr9A3eKcsGXFdGQnSdpUs6tO+JqM2HHwzrLzDtgYi2k7THaPrl40J0fQuzoLsHmurGSMOo/9eVG/wgYworcZrMcf7DUhHIOY62tEp/ZwL7AEnzcO5hgK3vRFBB7BhBZnxIfPSm3+B0Vzm/RSuBBfCxo","pubKey":"MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA3SlqPTgYkbFb0TD5CUs6eQK9XsN2QE3tef2eFU0pmbYrvcL3Cnb3Vz9K/SU5OnhsEtT3XiPaw03Z8kIDh/1GxAwRVlOnesxNmNT9eOHi5DrKA3TMok1AwVo1mNka83jnqoJRoPKDjt0wJa8tv0U6gDQpPjbwpeRksUjIBUte6UIbQ83cu0Qm9fp9tduhm8Hd4MSslwNUBxlnYIe0tPV5tht5t42PLIu+iutlUcCVndulk/z+3Q0PiuYrR0SYEpygKdDq4Uv3ABedJZ00jAtjZqRR0oy/55WZZPpFgRDot6taSI8f5Z1Fvc409L1Y7AKRSFfRYSr92puraZGDW7ZA5wIDAQAB","crt":"MIICnTCCAYUCBgGapmBbbzANBgkqhkiG9w0BAQsFADASMRAwDgYDVQQDDAdqZ3JvdXBzMB4XDTI1MTEyMTEyMjM0NFoXDTI2MDEyMDEyMjUyM1owEjEQMA4GA1UEAwwHamdyb3VwczCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAN0paj04GJGxW9Ew+QlLOnkCvV7DdkBN7Xn9nhVNKZm2K73C9wp291c/Sv0lOTp4bBLU914j2sNN2fJCA4f9RsQMEVZTp3rMTZjU/Xjh4uQ6ygN0zKJNQMFaNZjZGvN456qCUaDyg47dMCWvLb9FOoA0KT428KXkZLFIyAVLXulCG0PN3LtEJvX6fbXboZvB3eDErJcDVAcZZ2CHtLT1ebYbebeNjyyLvorrZVHAlZ3bpZP8/t0ND4rmK0dEmBKcoCnQ6uFL9wAXnSWdNIwLY2akUdKMv+eVmWT6RYEQ6LerWkiPH+WdRb3ONPS9WOwCkUhX0WEq/dqbq2mRg1u2QOcCAwEAATANBgkqhkiG9w0BAQsFAAOCAQEAQs4zJjtZ5G+w8kQn/nlIkITnAme3/w0G4vPBnv7qPNF46tPHnnuoYirDddfB6dba4u+yefCkGLteDUsv2m/iSX/xBlNQqBdcfHlOiKMYWcONhp/DoxR4Tekt404lGIToCnhjEKCcfWoSe4ekZ+M3Ee/M8uFj8gOGaqVxLgTpbFuEzdCbIRno9eNBsfbMRtUC+r+ltlsxu9RL57hH2GJp5BG0GALGdRLky3TbCqMwzuLLEy6tKfKj+9nVuYw8ELeB8Tg72qvgZjfj17MgYDx1x37FAdepvtBFgSuAL6ey7MmsfvtGc0DonLE4I8CufzxW+qR60HRUKnSYloCDLB5LNw==","alias":"b6fde76e-c69a-49a2-bdd9-6f0dc64e3b97","generatedMillis":1763727924106}	1
\.


--
-- TOC entry 4681 (class 0 OID 20717)
-- Dependencies: 290
-- Data for Name: user_attribute; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.user_attribute (name, value, user_id, id, long_value_hash, long_value_hash_lower_case, long_value) FROM stdin;
is_temporary_admin	true	8d9ec690-d72f-4ac0-beea-42d640575100	b9373144-6dbd-4edc-9907-bce64150d785	\N	\N	\N
\.


--
-- TOC entry 4682 (class 0 OID 20723)
-- Dependencies: 291
-- Data for Name: user_consent; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.user_consent (id, client_id, user_id, created_date, last_updated_date, client_storage_provider, external_client_id) FROM stdin;
\.


--
-- TOC entry 4683 (class 0 OID 20728)
-- Dependencies: 292
-- Data for Name: user_consent_client_scope; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.user_consent_client_scope (user_consent_id, scope_id) FROM stdin;
\.


--
-- TOC entry 4684 (class 0 OID 20731)
-- Dependencies: 293
-- Data for Name: user_entity; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.user_entity (id, email, email_constraint, email_verified, enabled, federation_link, first_name, last_name, realm_id, username, created_timestamp, service_account_client_link, not_before) FROM stdin;
8d9ec690-d72f-4ac0-beea-42d640575100	\N	e27e510c-1e76-4cf4-bcc4-2e1f6d92039f	f	t	\N	\N	\N	573be4f5-590a-4831-a3f3-de3d8f56ec34	admin	1746203878046	\N	0
ca6de359-b616-4b39-a5f9-af5e125a0a5a	custodian1@sail.databank.notreal	custodian1@sail.databank.notreal	t	t	\N	Custodian	Admin	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	custodian1@sail.databank.notreal	1747664318570	\N	1754039230
7fe7978e-ea45-4673-90c8-fff2f50a8c5d	dan.ackroyd@ghostbusters.com	dan.ackroyd@ghostbusters.com	t	t	\N	Dan	Ackroyd	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	dan.ackroyd@ghostbusters.com	1747664279838	\N	0
3d55d1dd-1fbc-4953-bca7-e168880f35b1	\N	14850619-5bdd-4564-a751-f1f8fd30f81a	f	t	\N	\N	\N	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	service-account-speedi-registry-app	1746623775994	2e713a57-2d5f-4835-aca9-8342751942d1	0
3a1c49bd-501b-4680-99e6-9676ece145f2	vikas.rachakonda@hdruk.ac.uk	vikas.rachakonda@hdruk.ac.uk	t	t	\N	Vikas	Rachakonda	573be4f5-590a-4831-a3f3-de3d8f56ec34	vikas.rachakonda@hdruk.ac.uk	1746719526155	\N	0
c121b1ce-58e7-45fe-8ad1-b55ebe88ea96	tmillington001@dundee.ac.uk	tmillington001@dundee.ac.uk	t	t	\N	Tristan	Millington	573be4f5-590a-4831-a3f3-de3d8f56ec34	tmillington001@dundee.ac.uk	1746719855751	\N	0
e92db568-6bac-4fc2-8d86-49a1189e500c	systems@hdruk.ac.uk	systems@hdruk.ac.uk	t	t	\N	Admin	Istrator	573be4f5-590a-4831-a3f3-de3d8f56ec34	systems@hdruk.ac.uk	1747129795993	\N	0
6799aaad-e948-460e-a6da-e7a2cde36688	admin.user@healthdataorganisation.com	admin.user@healthdataorganisation.com	t	t	\N	Admin	User	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	admin.user@healthdataorganisation.com	1747314530507	\N	0
5ee2f9d0-3998-48d1-a9d7-5a13f584cd80	loki.sinclair@hdruk.ac.uk	loki.sinclair@hdruk.ac.uk	t	t	\N	Loki	Sinclair	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	loki.sinclair@hdruk.ac.uk	1747643008604	\N	0
72716858-9b45-42ec-9292-dc24c877f931	admin.user@tandyenergyltd.com	admin.user@tandyenergyltd.com	t	t	\N	Admin	User	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	admin.user@tandyenergyltd.com	1747664271027	\N	0
0db3e4c1-2406-450d-9892-0de23888555e	admin.user@tobaccoeultd.com	admin.user@tobaccoeultd.com	t	t	\N	Admin	User	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	admin.user@tobaccoeultd.com	1747664276263	\N	0
26c81ec3-f96b-4d3a-a828-7dfd8b02fce0	annie.potts@ghostbusters.com	annie.potts@ghostbusters.com	t	t	\N	Annie	Potts	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	annie.potts@ghostbusters.com	1747664283947	\N	0
ed1ecc24-0dd6-45b8-a6b0-aec6fe606d6a	bill.murray@ghostbusters.com	bill.murray@ghostbusters.com	t	t	\N	Bill	Murray	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	bill.murray@ghostbusters.com	1747664282192	\N	0
f73dfa67-b6a0-4645-ba55-6123061b7e94	custodian1@nhs.england.notreal	custodian1@nhs.england.notreal	t	t	\N	Custodian	Admin	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	custodian1@nhs.england.notreal	1747664320122	\N	0
04543a1f-6955-43da-9361-e113adf8ba99	delegate.sponsor@healthdataorganisation.com	delegate.sponsor@healthdataorganisation.com	t	t	\N	Delegate	Sponsor	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	delegate.sponsor@healthdataorganisation.com	1747664267517	\N	0
b4941c21-d7ca-4eba-9260-ff4c80ae695a	delegate.sponsor@tandyenergyltd.com	delegate.sponsor@tandyenergyltd.com	t	t	\N	Delegate	Sponsor	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	delegate.sponsor@tandyenergyltd.com	1747664272890	\N	0
04a67026-cdd5-482a-8952-d7296978de92	delegate.sponsor@tobaccoeultd.com	delegate.sponsor@tobaccoeultd.com	t	t	\N	Delegate	Sponsor	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	delegate.sponsor@tobaccoeultd.com	1747664277991	\N	0
53d093a8-bb85-4bdd-a2eb-edc0c5cfb853	harold.ramis@ghostbusters.com	harold.ramis@ghostbusters.com	t	t	\N	Harold	Ramis	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	harold.ramis@ghostbusters.com	1747664285878	\N	0
8eac955d-b612-4869-85d9-14f1c1c89ddd	organisation.owner@healthdataorganisation.com	organisation.owner@healthdataorganisation.com	t	t	\N	Organisation	Owner	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	organisation.owner@healthdataorganisation.com	1747664264093	\N	0
cd7ccf85-b3b3-4580-9403-444d5b099e43	organisation.owner@tandyenergyltd.com	organisation.owner@tandyenergyltd.com	t	t	\N	Organisation	Owner	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	organisation.owner@tandyenergyltd.com	1747664269346	\N	0
b667c709-6ff4-41a1-8bdb-c9a1ebbe369a	tobacco.dave@dodgydomain.com	tobacco.dave@dodgydomain.com	t	t	\N	Tobacco	Dave	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	tobacco.dave@dodgydomain.com	1747664291182	\N	0
57ca4c58-2582-440b-9232-e13d009d4c7e	tobacco.frank@tobaccoeultd.com	tobacco.frank@tobaccoeultd.com	t	t	\N	Tabacco	Frank	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	tobacco.frank@tobaccoeultd.com	1747664274699	\N	0
5c534c54-bc7f-4131-9ad4-68e91d6fa552	tobacco.john@dodgydomain.com	tobacco.john@dodgydomain.com	t	t	\N	Tobacco	John	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	tobacco.john@dodgydomain.com	1747664289501	\N	0
a3fac73d-eb8c-46c6-bf54-9587a7dddb18	sorin.gumeni@hdruk.ac.uk	sorin.gumeni@hdruk.ac.uk	t	t	\N	Sorin	Gumeni	573be4f5-590a-4831-a3f3-de3d8f56ec34	sorin.gumeni@hdruk.ac.uk	1747665444065	\N	0
a7c5d58a-c275-4518-bd11-65429d371f54	enquiries@safepeopleregistry.org	enquiries@safepeopleregistry.org	f	t	\N	\N	\N	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	enquiries@safepeopleregistry.org	1753716020354	\N	0
2758f21b-fa5e-4335-b68a-5919703838b0	calum.macdonald@hdruk.ac.uk	calum.macdonald@hdruk.ac.uk	t	t	\N	Calum	Macdonald	573be4f5-590a-4831-a3f3-de3d8f56ec34	calum.macdonald@hdruk.ac.uk	1747903818885	\N	0
25ac9f70-b14a-4b63-8b1e-1c7c58df2f3b	dan.nita@hdruk.ac.uk	dan.nita@hdruk.ac.uk	t	t	\N	\N	\N	573be4f5-590a-4831-a3f3-de3d8f56ec34	dan.nita@hdruk.ac.uk	1756906502656	\N	0
aeac7a1e-6a52-485a-be56-59f1b11e63b8	phil.reeks@hdruk.ac.uk	phil.reeks@hdruk.ac.uk	t	t	\N	Phil	Reeks	573be4f5-590a-4831-a3f3-de3d8f56ec34	phil.reeks@hdruk.ac.uk	1753448676457	\N	0
190af348-0a88-45f2-af1f-7e26dbf988a2	peter.hammans@hdruk.ac.uk	peter.hammans@hdruk.ac.uk	t	t	\N	Peter	Hammans	573be4f5-590a-4831-a3f3-de3d8f56ec34	peter.hammans@hdruk.ac.uk	1757507344680	\N	0
1d6042e5-bc7c-47a4-a49e-85e0da766d9b	loki.sinclair@hdruk.ac.uk	loki.sinclair@hdruk.ac.uk	f	t	ad28d10a-3ce4-4065-bacc-30b73110370f	null	null	726a9ec1-c25f-4f4c-a6bb-9fb0c2d8a9a8	loki.sinclair@hdruk.ac.uk	1758791412383	\N	0
b483eb56-3ac4-4e72-a9ac-fd7f217f619b	test.user+admin@safepeopleregistry.com	test.user+admin@safepeopleregistry.com	t	t	\N	Admin	User	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	test.user+admin@safepeopleregistry.com	1762255077228	\N	0
1575de97-4d60-435e-bf1b-a0376b7acdc2	test.user+custodian@safepeopleregistry.com	test.user+custodian@safepeopleregistry.com	t	t	\N	Custodian	Admin	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	test.user+custodian@safepeopleregistry.com	1762256842229	\N	0
5edbed6e-f610-4646-ad1d-c3faf155443a	test.user+organisation@safepeopleregistry.com	test.user+organisation@safepeopleregistry.com	t	t	\N	Org	Admin	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	test.user+organisation@safepeopleregistry.com	1762256733962	\N	0
c5f13a1e-ba33-4144-a68e-6833d464e300	test.user+noorganisationneeded@hdruk.ac.uk	test.user+noorganisationneeded@hdruk.ac.uk	t	t	\N	No Organisation 	Needed	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	test.user+noorganisationneeded@hdruk.ac.uk	1762420186518	\N	0
5539052c-be47-4345-bfce-c67c6f3b82c5	test.user+user@safepeopleregistry.com	test.user+user@safepeopleregistry.com	t	t	\N	Test	User	95b0b755-b0d8-46d1-99b5-be385e3fa5c4	test.user+user@safepeopleregistry.com	1762256616521	\N	0
\.


--
-- TOC entry 4685 (class 0 OID 20739)
-- Dependencies: 294
-- Data for Name: user_federation_config; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.user_federation_config (user_federation_provider_id, value, name) FROM stdin;
\.


--
-- TOC entry 4686 (class 0 OID 20744)
-- Dependencies: 295
-- Data for Name: user_federation_mapper; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.user_federation_mapper (id, name, federation_provider_id, federation_mapper_type, realm_id) FROM stdin;
\.


--
-- TOC entry 4687 (class 0 OID 20749)
-- Dependencies: 296
-- Data for Name: user_federation_mapper_config; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.user_federation_mapper_config (user_federation_mapper_id, value, name) FROM stdin;
\.


--
-- TOC entry 4688 (class 0 OID 20754)
-- Dependencies: 297
-- Data for Name: user_federation_provider; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.user_federation_provider (id, changed_sync_period, display_name, full_sync_period, last_sync, priority, provider_name, realm_id) FROM stdin;
\.


--
-- TOC entry 4689 (class 0 OID 20759)
-- Dependencies: 298
-- Data for Name: user_group_membership; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.user_group_membership (group_id, user_id, membership_type) FROM stdin;
8b2e3e02-1f10-44bd-809b-3ff8eff60d26	6799aaad-e948-460e-a6da-e7a2cde36688	UNMANAGED
8b2e3e02-1f10-44bd-809b-3ff8eff60d26	72716858-9b45-42ec-9292-dc24c877f931	UNMANAGED
e74850be-7489-4afc-940b-221f64d17fb6	7fe7978e-ea45-4673-90c8-fff2f50a8c5d	UNMANAGED
8b2e3e02-1f10-44bd-809b-3ff8eff60d26	0db3e4c1-2406-450d-9892-0de23888555e	UNMANAGED
e74850be-7489-4afc-940b-221f64d17fb6	26c81ec3-f96b-4d3a-a828-7dfd8b02fce0	UNMANAGED
e74850be-7489-4afc-940b-221f64d17fb6	ed1ecc24-0dd6-45b8-a6b0-aec6fe606d6a	UNMANAGED
d223a3ab-38c8-4052-9dda-001515cbe429	f73dfa67-b6a0-4645-ba55-6123061b7e94	UNMANAGED
d223a3ab-38c8-4052-9dda-001515cbe429	ca6de359-b616-4b39-a5f9-af5e125a0a5a	UNMANAGED
8b2e3e02-1f10-44bd-809b-3ff8eff60d26	04543a1f-6955-43da-9361-e113adf8ba99	UNMANAGED
8b2e3e02-1f10-44bd-809b-3ff8eff60d26	b4941c21-d7ca-4eba-9260-ff4c80ae695a	UNMANAGED
8b2e3e02-1f10-44bd-809b-3ff8eff60d26	04a67026-cdd5-482a-8952-d7296978de92	UNMANAGED
e74850be-7489-4afc-940b-221f64d17fb6	53d093a8-bb85-4bdd-a2eb-edc0c5cfb853	UNMANAGED
8b2e3e02-1f10-44bd-809b-3ff8eff60d26	8eac955d-b612-4869-85d9-14f1c1c89ddd	UNMANAGED
8b2e3e02-1f10-44bd-809b-3ff8eff60d26	cd7ccf85-b3b3-4580-9403-444d5b099e43	UNMANAGED
e74850be-7489-4afc-940b-221f64d17fb6	b667c709-6ff4-41a1-8bdb-c9a1ebbe369a	UNMANAGED
e74850be-7489-4afc-940b-221f64d17fb6	57ca4c58-2582-440b-9232-e13d009d4c7e	UNMANAGED
e74850be-7489-4afc-940b-221f64d17fb6	5c534c54-bc7f-4131-9ad4-68e91d6fa552	UNMANAGED
b0f21671-0661-418c-9dca-5e885a9e48ae	b483eb56-3ac4-4e72-a9ac-fd7f217f619b	UNMANAGED
e74850be-7489-4afc-940b-221f64d17fb6	5539052c-be47-4345-bfce-c67c6f3b82c5	UNMANAGED
d223a3ab-38c8-4052-9dda-001515cbe429	1575de97-4d60-435e-bf1b-a0376b7acdc2	UNMANAGED
\.


--
-- TOC entry 4690 (class 0 OID 20762)
-- Dependencies: 299
-- Data for Name: user_required_action; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.user_required_action (user_id, required_action) FROM stdin;
a7c5d58a-c275-4518-bd11-65429d371f54	UPDATE_PASSWORD
a7c5d58a-c275-4518-bd11-65429d371f54	VERIFY_EMAIL
\.


--
-- TOC entry 4691 (class 0 OID 20766)
-- Dependencies: 300
-- Data for Name: user_role_mapping; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.user_role_mapping (role_id, user_id) FROM stdin;
6a3d63b8-8120-496e-a754-46e48e6a77b6	8d9ec690-d72f-4ac0-beea-42d640575100
cd6344cb-fbb5-436b-8a77-dd60fbe40c27	8d9ec690-d72f-4ac0-beea-42d640575100
38b8a18d-3182-4cab-84a5-3e0060de74ef	3d55d1dd-1fbc-4953-bca7-e168880f35b1
4849c95c-ada2-45a0-927f-b0b894265dd4	3d55d1dd-1fbc-4953-bca7-e168880f35b1
6a3d63b8-8120-496e-a754-46e48e6a77b6	3a1c49bd-501b-4680-99e6-9676ece145f2
0a54fb78-d93e-4f7b-b101-a1f1386acf33	3a1c49bd-501b-4680-99e6-9676ece145f2
b612d24d-48a7-4b8f-9728-1d789e5dcdae	3a1c49bd-501b-4680-99e6-9676ece145f2
6a3d63b8-8120-496e-a754-46e48e6a77b6	c121b1ce-58e7-45fe-8ad1-b55ebe88ea96
cd6344cb-fbb5-436b-8a77-dd60fbe40c27	c121b1ce-58e7-45fe-8ad1-b55ebe88ea96
cd6344cb-fbb5-436b-8a77-dd60fbe40c27	3a1c49bd-501b-4680-99e6-9676ece145f2
6a3d63b8-8120-496e-a754-46e48e6a77b6	e92db568-6bac-4fc2-8d86-49a1189e500c
cd6344cb-fbb5-436b-8a77-dd60fbe40c27	e92db568-6bac-4fc2-8d86-49a1189e500c
38b8a18d-3182-4cab-84a5-3e0060de74ef	6799aaad-e948-460e-a6da-e7a2cde36688
b612d24d-48a7-4b8f-9728-1d789e5dcdae	c121b1ce-58e7-45fe-8ad1-b55ebe88ea96
0a54fb78-d93e-4f7b-b101-a1f1386acf33	c121b1ce-58e7-45fe-8ad1-b55ebe88ea96
38b8a18d-3182-4cab-84a5-3e0060de74ef	5ee2f9d0-3998-48d1-a9d7-5a13f584cd80
8b213433-8154-4229-85da-87b508eef114	5ee2f9d0-3998-48d1-a9d7-5a13f584cd80
eced41fc-ff26-401c-ad27-88f8ee0056d3	5ee2f9d0-3998-48d1-a9d7-5a13f584cd80
12d1e7fb-8837-4807-8c27-0ee3c030dcd0	5ee2f9d0-3998-48d1-a9d7-5a13f584cd80
079a673e-5870-4eda-a663-f54f338c89b6	5ee2f9d0-3998-48d1-a9d7-5a13f584cd80
018886e3-9ff8-4651-a714-28cfd2f964de	5ee2f9d0-3998-48d1-a9d7-5a13f584cd80
634f4714-e388-43e7-837d-e024096d7b30	5ee2f9d0-3998-48d1-a9d7-5a13f584cd80
3f459fb1-203d-4d56-915a-234bbd27e483	5ee2f9d0-3998-48d1-a9d7-5a13f584cd80
5797316a-b997-470a-8411-0a77b0804741	5ee2f9d0-3998-48d1-a9d7-5a13f584cd80
60eeb573-adcd-4a2d-bc3e-316133266861	5ee2f9d0-3998-48d1-a9d7-5a13f584cd80
12d1e7fb-8837-4807-8c27-0ee3c030dcd0	3d55d1dd-1fbc-4953-bca7-e168880f35b1
3d5201f7-e318-4f0f-b944-244deca8e05b	5ee2f9d0-3998-48d1-a9d7-5a13f584cd80
4849c95c-ada2-45a0-927f-b0b894265dd4	5ee2f9d0-3998-48d1-a9d7-5a13f584cd80
720e76e6-c357-40b1-9052-02900f96e428	5ee2f9d0-3998-48d1-a9d7-5a13f584cd80
4ad45ead-c31f-41f6-9647-b4aa9b44fe98	5ee2f9d0-3998-48d1-a9d7-5a13f584cd80
3996470f-df14-4291-b206-62694af0ab39	5ee2f9d0-3998-48d1-a9d7-5a13f584cd80
acb62ce9-59f0-4b29-87f1-dc31aafd2d6b	5ee2f9d0-3998-48d1-a9d7-5a13f584cd80
da09e718-2f43-4702-9889-e50063a38c04	5ee2f9d0-3998-48d1-a9d7-5a13f584cd80
3af56b88-35bf-417b-a6ef-724254c00816	5ee2f9d0-3998-48d1-a9d7-5a13f584cd80
0566f538-35d9-4d4f-9e09-7f2df4c65970	5ee2f9d0-3998-48d1-a9d7-5a13f584cd80
325eb064-a63c-4292-b6c7-e3caf7e11e56	5ee2f9d0-3998-48d1-a9d7-5a13f584cd80
6a407f74-4c91-45d4-9ec1-913dd65f6a59	5ee2f9d0-3998-48d1-a9d7-5a13f584cd80
13efbea1-a8ad-4792-b840-2ed6db8c2888	5ee2f9d0-3998-48d1-a9d7-5a13f584cd80
8a5437dc-620a-424d-93ad-7a41346dc385	5ee2f9d0-3998-48d1-a9d7-5a13f584cd80
1c2376ac-bef2-4102-85e6-cfb5c9112686	5ee2f9d0-3998-48d1-a9d7-5a13f584cd80
8bdf34d4-1e2d-47a4-a6e9-f349c17d4807	5ee2f9d0-3998-48d1-a9d7-5a13f584cd80
add48961-0a1b-4986-b6f3-80e25519371b	5ee2f9d0-3998-48d1-a9d7-5a13f584cd80
6aed831c-66eb-4b8d-80ad-88f26a6d6bfd	5ee2f9d0-3998-48d1-a9d7-5a13f584cd80
7528e9bf-afb3-4c7a-b124-3398ce229c3f	5ee2f9d0-3998-48d1-a9d7-5a13f584cd80
41e7c022-b0fd-412d-9f94-3e8c8e776f9b	5ee2f9d0-3998-48d1-a9d7-5a13f584cd80
d5573143-64e2-4089-8889-e1e9abd17bc9	5ee2f9d0-3998-48d1-a9d7-5a13f584cd80
b9b03f2e-dff5-41a8-ba05-cc6e648704c9	5ee2f9d0-3998-48d1-a9d7-5a13f584cd80
d5a4d17b-ddb7-4422-ae14-76069490b4f3	5ee2f9d0-3998-48d1-a9d7-5a13f584cd80
63abec50-6a86-4c7d-95b8-d91990b9ff45	5ee2f9d0-3998-48d1-a9d7-5a13f584cd80
4db5fd0a-168c-404c-9ef4-6cd563eb9892	5ee2f9d0-3998-48d1-a9d7-5a13f584cd80
ae76fc70-e837-410f-8ff2-21ff45afe23b	5ee2f9d0-3998-48d1-a9d7-5a13f584cd80
1d285d5d-72d1-4c3d-b32c-f4c9ab5e336a	5ee2f9d0-3998-48d1-a9d7-5a13f584cd80
8bf86b7b-d467-4c68-9f3b-17ef3e65f92e	5ee2f9d0-3998-48d1-a9d7-5a13f584cd80
60eeb573-adcd-4a2d-bc3e-316133266861	3d55d1dd-1fbc-4953-bca7-e168880f35b1
079a673e-5870-4eda-a663-f54f338c89b6	3d55d1dd-1fbc-4953-bca7-e168880f35b1
eced41fc-ff26-401c-ad27-88f8ee0056d3	3d55d1dd-1fbc-4953-bca7-e168880f35b1
325eb064-a63c-4292-b6c7-e3caf7e11e56	3d55d1dd-1fbc-4953-bca7-e168880f35b1
38b8a18d-3182-4cab-84a5-3e0060de74ef	8eac955d-b612-4869-85d9-14f1c1c89ddd
38b8a18d-3182-4cab-84a5-3e0060de74ef	04543a1f-6955-43da-9361-e113adf8ba99
38b8a18d-3182-4cab-84a5-3e0060de74ef	cd7ccf85-b3b3-4580-9403-444d5b099e43
38b8a18d-3182-4cab-84a5-3e0060de74ef	72716858-9b45-42ec-9292-dc24c877f931
38b8a18d-3182-4cab-84a5-3e0060de74ef	b4941c21-d7ca-4eba-9260-ff4c80ae695a
38b8a18d-3182-4cab-84a5-3e0060de74ef	57ca4c58-2582-440b-9232-e13d009d4c7e
38b8a18d-3182-4cab-84a5-3e0060de74ef	0db3e4c1-2406-450d-9892-0de23888555e
38b8a18d-3182-4cab-84a5-3e0060de74ef	04a67026-cdd5-482a-8952-d7296978de92
38b8a18d-3182-4cab-84a5-3e0060de74ef	7fe7978e-ea45-4673-90c8-fff2f50a8c5d
38b8a18d-3182-4cab-84a5-3e0060de74ef	ed1ecc24-0dd6-45b8-a6b0-aec6fe606d6a
38b8a18d-3182-4cab-84a5-3e0060de74ef	26c81ec3-f96b-4d3a-a828-7dfd8b02fce0
38b8a18d-3182-4cab-84a5-3e0060de74ef	53d093a8-bb85-4bdd-a2eb-edc0c5cfb853
38b8a18d-3182-4cab-84a5-3e0060de74ef	5c534c54-bc7f-4131-9ad4-68e91d6fa552
38b8a18d-3182-4cab-84a5-3e0060de74ef	b667c709-6ff4-41a1-8bdb-c9a1ebbe369a
38b8a18d-3182-4cab-84a5-3e0060de74ef	ca6de359-b616-4b39-a5f9-af5e125a0a5a
38b8a18d-3182-4cab-84a5-3e0060de74ef	f73dfa67-b6a0-4645-ba55-6123061b7e94
6a3d63b8-8120-496e-a754-46e48e6a77b6	a3fac73d-eb8c-46c6-bf54-9587a7dddb18
cd6344cb-fbb5-436b-8a77-dd60fbe40c27	a3fac73d-eb8c-46c6-bf54-9587a7dddb18
313bbcd7-d573-4f88-aa58-c217dbd310a8	a3fac73d-eb8c-46c6-bf54-9587a7dddb18
794f997f-e057-4ba2-9f60-879574231ddc	a3fac73d-eb8c-46c6-bf54-9587a7dddb18
0a54fb78-d93e-4f7b-b101-a1f1386acf33	a3fac73d-eb8c-46c6-bf54-9587a7dddb18
efc1723a-8ffb-4046-8954-bb1aaffa2bed	a3fac73d-eb8c-46c6-bf54-9587a7dddb18
adb5fe1e-3a1e-4828-9e5e-de17410695de	a3fac73d-eb8c-46c6-bf54-9587a7dddb18
8a05a143-0b30-4c35-9db1-df98c612e697	a3fac73d-eb8c-46c6-bf54-9587a7dddb18
8d136e1a-1563-4596-90e7-1aab669d4ada	a3fac73d-eb8c-46c6-bf54-9587a7dddb18
b612d24d-48a7-4b8f-9728-1d789e5dcdae	a3fac73d-eb8c-46c6-bf54-9587a7dddb18
4b5f2e8e-8fa6-4922-bfae-22c3dc843863	a3fac73d-eb8c-46c6-bf54-9587a7dddb18
8db5dac6-ab76-4c0a-8762-e6591ae394c7	a3fac73d-eb8c-46c6-bf54-9587a7dddb18
8a99120d-cdda-4113-b75d-49ea84b9e7d7	a3fac73d-eb8c-46c6-bf54-9587a7dddb18
881b2475-727c-4faa-9634-13a7d62f648c	a3fac73d-eb8c-46c6-bf54-9587a7dddb18
63cc1358-5792-45ac-b816-244a4e18bf09	a3fac73d-eb8c-46c6-bf54-9587a7dddb18
cce740bd-352a-4cbb-990c-f24ffeb5c830	a3fac73d-eb8c-46c6-bf54-9587a7dddb18
d28b5214-51d1-443e-8e63-ecf2e5cef7f3	a3fac73d-eb8c-46c6-bf54-9587a7dddb18
7554fb21-5876-456f-8be2-4cac91beda09	a3fac73d-eb8c-46c6-bf54-9587a7dddb18
91bbab83-b906-43c5-a7f1-dbfbc7ce62d5	a3fac73d-eb8c-46c6-bf54-9587a7dddb18
9631bb48-25e2-42bb-bc6b-1f47b9b08d5d	25ac9f70-b14a-4b63-8b1e-1c7c58df2f3b
a8d8fa2f-7e95-4f0d-bb26-6a8503b6621d	25ac9f70-b14a-4b63-8b1e-1c7c58df2f3b
2d20ce51-760b-4157-bd8c-2d1c8e9aa3c1	190af348-0a88-45f2-af1f-7e26dbf988a2
38b8a18d-3182-4cab-84a5-3e0060de74ef	5edbed6e-f610-4646-ad1d-c3faf155443a
385fb1af-9ba3-474d-9708-0e1f77d412f8	a3fac73d-eb8c-46c6-bf54-9587a7dddb18
2394a878-9bdf-428b-8e4f-f5d231362dcb	a3fac73d-eb8c-46c6-bf54-9587a7dddb18
23fd4323-8cc4-4b20-98f7-21010c9d5a8b	a3fac73d-eb8c-46c6-bf54-9587a7dddb18
9fcaeb3a-4545-435c-a2a6-99ee0a39411b	a3fac73d-eb8c-46c6-bf54-9587a7dddb18
b4ac9d89-455b-42af-89b8-462e2eca973d	a3fac73d-eb8c-46c6-bf54-9587a7dddb18
8a99120d-cdda-4113-b75d-49ea84b9e7d7	190af348-0a88-45f2-af1f-7e26dbf988a2
9fcaeb3a-4545-435c-a2a6-99ee0a39411b	190af348-0a88-45f2-af1f-7e26dbf988a2
38b8a18d-3182-4cab-84a5-3e0060de74ef	c5f13a1e-ba33-4144-a68e-6833d464e300
9631bb48-25e2-42bb-bc6b-1f47b9b08d5d	a3fac73d-eb8c-46c6-bf54-9587a7dddb18
1f1ddf50-19de-4bc1-9783-3c318b4df5b2	a3fac73d-eb8c-46c6-bf54-9587a7dddb18
d9f7a05a-a6a5-4dff-8506-17dd0799cfa1	a3fac73d-eb8c-46c6-bf54-9587a7dddb18
17717551-af2f-4b9e-9caf-a8c614c1e671	a3fac73d-eb8c-46c6-bf54-9587a7dddb18
71ed90ec-a4e8-4547-9d91-38604e515414	190af348-0a88-45f2-af1f-7e26dbf988a2
46cbdb19-2cf3-42c3-91de-8cd3f97e9411	a3fac73d-eb8c-46c6-bf54-9587a7dddb18
71ed90ec-a4e8-4547-9d91-38604e515414	a3fac73d-eb8c-46c6-bf54-9587a7dddb18
a8d8fa2f-7e95-4f0d-bb26-6a8503b6621d	a3fac73d-eb8c-46c6-bf54-9587a7dddb18
26c331f3-c0cc-4253-ad87-eded7097ddc9	190af348-0a88-45f2-af1f-7e26dbf988a2
efb884b0-ef69-4e16-8491-1fad00b44878	190af348-0a88-45f2-af1f-7e26dbf988a2
a62273e8-ab4b-48fc-8f92-428f5d748452	190af348-0a88-45f2-af1f-7e26dbf988a2
d30c30e5-1581-467a-952a-190182bd8904	190af348-0a88-45f2-af1f-7e26dbf988a2
918f0c5f-52da-4da8-83e8-b97f8eea053e	a3fac73d-eb8c-46c6-bf54-9587a7dddb18
cc9afc7f-f949-472e-929e-4be48690d022	a3fac73d-eb8c-46c6-bf54-9587a7dddb18
6a3d63b8-8120-496e-a754-46e48e6a77b6	25ac9f70-b14a-4b63-8b1e-1c7c58df2f3b
0e8fd425-209a-4ad3-980e-a6d31917d9d7	25ac9f70-b14a-4b63-8b1e-1c7c58df2f3b
91bbab83-b906-43c5-a7f1-dbfbc7ce62d5	25ac9f70-b14a-4b63-8b1e-1c7c58df2f3b
8db5dac6-ab76-4c0a-8762-e6591ae394c7	190af348-0a88-45f2-af1f-7e26dbf988a2
d9f7a05a-a6a5-4dff-8506-17dd0799cfa1	190af348-0a88-45f2-af1f-7e26dbf988a2
0e8fd425-209a-4ad3-980e-a6d31917d9d7	a3fac73d-eb8c-46c6-bf54-9587a7dddb18
b2ce55fe-e9f2-4496-ba1c-9080c1f7f012	a3fac73d-eb8c-46c6-bf54-9587a7dddb18
b9cd6ebe-b6e9-4c25-81dc-32b8b2af0ed3	a3fac73d-eb8c-46c6-bf54-9587a7dddb18
2d20ce51-760b-4157-bd8c-2d1c8e9aa3c1	a3fac73d-eb8c-46c6-bf54-9587a7dddb18
313bbcd7-d573-4f88-aa58-c217dbd310a8	25ac9f70-b14a-4b63-8b1e-1c7c58df2f3b
0a54fb78-d93e-4f7b-b101-a1f1386acf33	25ac9f70-b14a-4b63-8b1e-1c7c58df2f3b
e2039cd6-3211-44cc-a391-d5c8c9f329c3	25ac9f70-b14a-4b63-8b1e-1c7c58df2f3b
ffa6bbc7-13aa-40d1-a871-bee63832b195	190af348-0a88-45f2-af1f-7e26dbf988a2
9f0d8fc2-bc32-4793-9b6a-f7a067770ca1	190af348-0a88-45f2-af1f-7e26dbf988a2
30284747-d0b6-4322-81ac-af69cf433daf	a3fac73d-eb8c-46c6-bf54-9587a7dddb18
9f0d8fc2-bc32-4793-9b6a-f7a067770ca1	a3fac73d-eb8c-46c6-bf54-9587a7dddb18
e2039cd6-3211-44cc-a391-d5c8c9f329c3	a3fac73d-eb8c-46c6-bf54-9587a7dddb18
1f1ddf50-19de-4bc1-9783-3c318b4df5b2	190af348-0a88-45f2-af1f-7e26dbf988a2
b9cd6ebe-b6e9-4c25-81dc-32b8b2af0ed3	190af348-0a88-45f2-af1f-7e26dbf988a2
92fd977f-0530-454a-9128-5e56f4399c70	a3fac73d-eb8c-46c6-bf54-9587a7dddb18
26c331f3-c0cc-4253-ad87-eded7097ddc9	a3fac73d-eb8c-46c6-bf54-9587a7dddb18
8db5dac6-ab76-4c0a-8762-e6591ae394c7	25ac9f70-b14a-4b63-8b1e-1c7c58df2f3b
d28b5214-51d1-443e-8e63-ecf2e5cef7f3	25ac9f70-b14a-4b63-8b1e-1c7c58df2f3b
8d136e1a-1563-4596-90e7-1aab669d4ada	25ac9f70-b14a-4b63-8b1e-1c7c58df2f3b
b612d24d-48a7-4b8f-9728-1d789e5dcdae	25ac9f70-b14a-4b63-8b1e-1c7c58df2f3b
b4ac9d89-455b-42af-89b8-462e2eca973d	25ac9f70-b14a-4b63-8b1e-1c7c58df2f3b
63cc1358-5792-45ac-b816-244a4e18bf09	25ac9f70-b14a-4b63-8b1e-1c7c58df2f3b
cc9afc7f-f949-472e-929e-4be48690d022	190af348-0a88-45f2-af1f-7e26dbf988a2
e65c88a2-16cb-4cfa-a0ee-2455305867c3	a3fac73d-eb8c-46c6-bf54-9587a7dddb18
50fee5fb-d0a6-4f50-a3d0-ba67e975bdbb	a3fac73d-eb8c-46c6-bf54-9587a7dddb18
2c5ad8df-06c8-41e5-b1e9-37e5827e3365	a3fac73d-eb8c-46c6-bf54-9587a7dddb18
46cbdb19-2cf3-42c3-91de-8cd3f97e9411	25ac9f70-b14a-4b63-8b1e-1c7c58df2f3b
efc1723a-8ffb-4046-8954-bb1aaffa2bed	25ac9f70-b14a-4b63-8b1e-1c7c58df2f3b
ffa6bbc7-13aa-40d1-a871-bee63832b195	a3fac73d-eb8c-46c6-bf54-9587a7dddb18
f61cea99-1cbe-47ce-836b-00025542815a	a3fac73d-eb8c-46c6-bf54-9587a7dddb18
efb884b0-ef69-4e16-8491-1fad00b44878	a3fac73d-eb8c-46c6-bf54-9587a7dddb18
a62273e8-ab4b-48fc-8f92-428f5d748452	a3fac73d-eb8c-46c6-bf54-9587a7dddb18
d30c30e5-1581-467a-952a-190182bd8904	a3fac73d-eb8c-46c6-bf54-9587a7dddb18
634f4714-e388-43e7-837d-e024096d7b30	3d55d1dd-1fbc-4953-bca7-e168880f35b1
4db5fd0a-168c-404c-9ef4-6cd563eb9892	3d55d1dd-1fbc-4953-bca7-e168880f35b1
0566f538-35d9-4d4f-9e09-7f2df4c65970	3d55d1dd-1fbc-4953-bca7-e168880f35b1
13efbea1-a8ad-4792-b840-2ed6db8c2888	3d55d1dd-1fbc-4953-bca7-e168880f35b1
8a5437dc-620a-424d-93ad-7a41346dc385	3d55d1dd-1fbc-4953-bca7-e168880f35b1
7e349c00-81af-443b-affe-2cfff09e0067	3d55d1dd-1fbc-4953-bca7-e168880f35b1
6a407f74-4c91-45d4-9ec1-913dd65f6a59	3d55d1dd-1fbc-4953-bca7-e168880f35b1
b9b03f2e-dff5-41a8-ba05-cc6e648704c9	3d55d1dd-1fbc-4953-bca7-e168880f35b1
41e7c022-b0fd-412d-9f94-3e8c8e776f9b	3d55d1dd-1fbc-4953-bca7-e168880f35b1
3af56b88-35bf-417b-a6ef-724254c00816	3d55d1dd-1fbc-4953-bca7-e168880f35b1
1c2376ac-bef2-4102-85e6-cfb5c9112686	3d55d1dd-1fbc-4953-bca7-e168880f35b1
720e76e6-c357-40b1-9052-02900f96e428	3d55d1dd-1fbc-4953-bca7-e168880f35b1
d5573143-64e2-4089-8889-e1e9abd17bc9	3d55d1dd-1fbc-4953-bca7-e168880f35b1
d5a4d17b-ddb7-4422-ae14-76069490b4f3	3d55d1dd-1fbc-4953-bca7-e168880f35b1
acb62ce9-59f0-4b29-87f1-dc31aafd2d6b	3d55d1dd-1fbc-4953-bca7-e168880f35b1
da09e718-2f43-4702-9889-e50063a38c04	3d55d1dd-1fbc-4953-bca7-e168880f35b1
6aed831c-66eb-4b8d-80ad-88f26a6d6bfd	3d55d1dd-1fbc-4953-bca7-e168880f35b1
3f459fb1-203d-4d56-915a-234bbd27e483	3d55d1dd-1fbc-4953-bca7-e168880f35b1
ae76fc70-e837-410f-8ff2-21ff45afe23b	3d55d1dd-1fbc-4953-bca7-e168880f35b1
018886e3-9ff8-4651-a714-28cfd2f964de	3d55d1dd-1fbc-4953-bca7-e168880f35b1
63abec50-6a86-4c7d-95b8-d91990b9ff45	3d55d1dd-1fbc-4953-bca7-e168880f35b1
3996470f-df14-4291-b206-62694af0ab39	3d55d1dd-1fbc-4953-bca7-e168880f35b1
4ad45ead-c31f-41f6-9647-b4aa9b44fe98	3d55d1dd-1fbc-4953-bca7-e168880f35b1
8bdf34d4-1e2d-47a4-a6e9-f349c17d4807	3d55d1dd-1fbc-4953-bca7-e168880f35b1
5797316a-b997-470a-8411-0a77b0804741	3d55d1dd-1fbc-4953-bca7-e168880f35b1
1d285d5d-72d1-4c3d-b32c-f4c9ab5e336a	3d55d1dd-1fbc-4953-bca7-e168880f35b1
add48961-0a1b-4986-b6f3-80e25519371b	3d55d1dd-1fbc-4953-bca7-e168880f35b1
8b213433-8154-4229-85da-87b508eef114	3d55d1dd-1fbc-4953-bca7-e168880f35b1
3d5201f7-e318-4f0f-b944-244deca8e05b	3d55d1dd-1fbc-4953-bca7-e168880f35b1
7528e9bf-afb3-4c7a-b124-3398ce229c3f	3d55d1dd-1fbc-4953-bca7-e168880f35b1
6a3d63b8-8120-496e-a754-46e48e6a77b6	2758f21b-fa5e-4335-b68a-5919703838b0
adb5fe1e-3a1e-4828-9e5e-de17410695de	2758f21b-fa5e-4335-b68a-5919703838b0
0a54fb78-d93e-4f7b-b101-a1f1386acf33	2758f21b-fa5e-4335-b68a-5919703838b0
313bbcd7-d573-4f88-aa58-c217dbd310a8	2758f21b-fa5e-4335-b68a-5919703838b0
efc1723a-8ffb-4046-8954-bb1aaffa2bed	2758f21b-fa5e-4335-b68a-5919703838b0
b612d24d-48a7-4b8f-9728-1d789e5dcdae	2758f21b-fa5e-4335-b68a-5919703838b0
8d136e1a-1563-4596-90e7-1aab669d4ada	2758f21b-fa5e-4335-b68a-5919703838b0
794f997f-e057-4ba2-9f60-879574231ddc	2758f21b-fa5e-4335-b68a-5919703838b0
8a05a143-0b30-4c35-9db1-df98c612e697	2758f21b-fa5e-4335-b68a-5919703838b0
4b5f2e8e-8fa6-4922-bfae-22c3dc843863	2758f21b-fa5e-4335-b68a-5919703838b0
cce740bd-352a-4cbb-990c-f24ffeb5c830	2758f21b-fa5e-4335-b68a-5919703838b0
63cc1358-5792-45ac-b816-244a4e18bf09	2758f21b-fa5e-4335-b68a-5919703838b0
8a99120d-cdda-4113-b75d-49ea84b9e7d7	2758f21b-fa5e-4335-b68a-5919703838b0
881b2475-727c-4faa-9634-13a7d62f648c	2758f21b-fa5e-4335-b68a-5919703838b0
d28b5214-51d1-443e-8e63-ecf2e5cef7f3	2758f21b-fa5e-4335-b68a-5919703838b0
92fd977f-0530-454a-9128-5e56f4399c70	2758f21b-fa5e-4335-b68a-5919703838b0
ffa6bbc7-13aa-40d1-a871-bee63832b195	2758f21b-fa5e-4335-b68a-5919703838b0
0e8fd425-209a-4ad3-980e-a6d31917d9d7	2758f21b-fa5e-4335-b68a-5919703838b0
30284747-d0b6-4322-81ac-af69cf433daf	2758f21b-fa5e-4335-b68a-5919703838b0
26c331f3-c0cc-4253-ad87-eded7097ddc9	2758f21b-fa5e-4335-b68a-5919703838b0
7554fb21-5876-456f-8be2-4cac91beda09	2758f21b-fa5e-4335-b68a-5919703838b0
b9cd6ebe-b6e9-4c25-81dc-32b8b2af0ed3	2758f21b-fa5e-4335-b68a-5919703838b0
f61cea99-1cbe-47ce-836b-00025542815a	2758f21b-fa5e-4335-b68a-5919703838b0
cc9afc7f-f949-472e-929e-4be48690d022	2758f21b-fa5e-4335-b68a-5919703838b0
2d20ce51-760b-4157-bd8c-2d1c8e9aa3c1	2758f21b-fa5e-4335-b68a-5919703838b0
e2039cd6-3211-44cc-a391-d5c8c9f329c3	2758f21b-fa5e-4335-b68a-5919703838b0
8a05a143-0b30-4c35-9db1-df98c612e697	25ac9f70-b14a-4b63-8b1e-1c7c58df2f3b
1f1ddf50-19de-4bc1-9783-3c318b4df5b2	2758f21b-fa5e-4335-b68a-5919703838b0
50fee5fb-d0a6-4f50-a3d0-ba67e975bdbb	2758f21b-fa5e-4335-b68a-5919703838b0
a8d8fa2f-7e95-4f0d-bb26-6a8503b6621d	2758f21b-fa5e-4335-b68a-5919703838b0
4b5f2e8e-8fa6-4922-bfae-22c3dc843863	25ac9f70-b14a-4b63-8b1e-1c7c58df2f3b
8db5dac6-ab76-4c0a-8762-e6591ae394c7	2758f21b-fa5e-4335-b68a-5919703838b0
918f0c5f-52da-4da8-83e8-b97f8eea053e	2758f21b-fa5e-4335-b68a-5919703838b0
b2ce55fe-e9f2-4496-ba1c-9080c1f7f012	2758f21b-fa5e-4335-b68a-5919703838b0
9fcaeb3a-4545-435c-a2a6-99ee0a39411b	2758f21b-fa5e-4335-b68a-5919703838b0
b4ac9d89-455b-42af-89b8-462e2eca973d	2758f21b-fa5e-4335-b68a-5919703838b0
adb5fe1e-3a1e-4828-9e5e-de17410695de	25ac9f70-b14a-4b63-8b1e-1c7c58df2f3b
2394a878-9bdf-428b-8e4f-f5d231362dcb	2758f21b-fa5e-4335-b68a-5919703838b0
71ed90ec-a4e8-4547-9d91-38604e515414	2758f21b-fa5e-4335-b68a-5919703838b0
17717551-af2f-4b9e-9caf-a8c614c1e671	2758f21b-fa5e-4335-b68a-5919703838b0
cd6344cb-fbb5-436b-8a77-dd60fbe40c27	2758f21b-fa5e-4335-b68a-5919703838b0
efb884b0-ef69-4e16-8491-1fad00b44878	2758f21b-fa5e-4335-b68a-5919703838b0
a62273e8-ab4b-48fc-8f92-428f5d748452	2758f21b-fa5e-4335-b68a-5919703838b0
d30c30e5-1581-467a-952a-190182bd8904	2758f21b-fa5e-4335-b68a-5919703838b0
794f997f-e057-4ba2-9f60-879574231ddc	25ac9f70-b14a-4b63-8b1e-1c7c58df2f3b
8d136e1a-1563-4596-90e7-1aab669d4ada	190af348-0a88-45f2-af1f-7e26dbf988a2
313bbcd7-d573-4f88-aa58-c217dbd310a8	190af348-0a88-45f2-af1f-7e26dbf988a2
e2039cd6-3211-44cc-a391-d5c8c9f329c3	190af348-0a88-45f2-af1f-7e26dbf988a2
385fb1af-9ba3-474d-9708-0e1f77d412f8	2758f21b-fa5e-4335-b68a-5919703838b0
e65c88a2-16cb-4cfa-a0ee-2455305867c3	2758f21b-fa5e-4335-b68a-5919703838b0
23fd4323-8cc4-4b20-98f7-21010c9d5a8b	2758f21b-fa5e-4335-b68a-5919703838b0
9f0d8fc2-bc32-4793-9b6a-f7a067770ca1	2758f21b-fa5e-4335-b68a-5919703838b0
2c5ad8df-06c8-41e5-b1e9-37e5827e3365	2758f21b-fa5e-4335-b68a-5919703838b0
6a3d63b8-8120-496e-a754-46e48e6a77b6	190af348-0a88-45f2-af1f-7e26dbf988a2
794f997f-e057-4ba2-9f60-879574231ddc	190af348-0a88-45f2-af1f-7e26dbf988a2
91bbab83-b906-43c5-a7f1-dbfbc7ce62d5	190af348-0a88-45f2-af1f-7e26dbf988a2
9631bb48-25e2-42bb-bc6b-1f47b9b08d5d	2758f21b-fa5e-4335-b68a-5919703838b0
46cbdb19-2cf3-42c3-91de-8cd3f97e9411	2758f21b-fa5e-4335-b68a-5919703838b0
d9f7a05a-a6a5-4dff-8506-17dd0799cfa1	2758f21b-fa5e-4335-b68a-5919703838b0
91bbab83-b906-43c5-a7f1-dbfbc7ce62d5	2758f21b-fa5e-4335-b68a-5919703838b0
a8d8fa2f-7e95-4f0d-bb26-6a8503b6621d	190af348-0a88-45f2-af1f-7e26dbf988a2
adb5fe1e-3a1e-4828-9e5e-de17410695de	190af348-0a88-45f2-af1f-7e26dbf988a2
8a05a143-0b30-4c35-9db1-df98c612e697	190af348-0a88-45f2-af1f-7e26dbf988a2
0a54fb78-d93e-4f7b-b101-a1f1386acf33	190af348-0a88-45f2-af1f-7e26dbf988a2
b612d24d-48a7-4b8f-9728-1d789e5dcdae	190af348-0a88-45f2-af1f-7e26dbf988a2
efc1723a-8ffb-4046-8954-bb1aaffa2bed	190af348-0a88-45f2-af1f-7e26dbf988a2
4b5f2e8e-8fa6-4922-bfae-22c3dc843863	190af348-0a88-45f2-af1f-7e26dbf988a2
e65c88a2-16cb-4cfa-a0ee-2455305867c3	25ac9f70-b14a-4b63-8b1e-1c7c58df2f3b
b2ce55fe-e9f2-4496-ba1c-9080c1f7f012	25ac9f70-b14a-4b63-8b1e-1c7c58df2f3b
92fd977f-0530-454a-9128-5e56f4399c70	25ac9f70-b14a-4b63-8b1e-1c7c58df2f3b
385fb1af-9ba3-474d-9708-0e1f77d412f8	25ac9f70-b14a-4b63-8b1e-1c7c58df2f3b
1f1ddf50-19de-4bc1-9783-3c318b4df5b2	25ac9f70-b14a-4b63-8b1e-1c7c58df2f3b
6a3d63b8-8120-496e-a754-46e48e6a77b6	aeac7a1e-6a52-485a-be56-59f1b11e63b8
23fd4323-8cc4-4b20-98f7-21010c9d5a8b	aeac7a1e-6a52-485a-be56-59f1b11e63b8
b2ce55fe-e9f2-4496-ba1c-9080c1f7f012	aeac7a1e-6a52-485a-be56-59f1b11e63b8
cce740bd-352a-4cbb-990c-f24ffeb5c830	aeac7a1e-6a52-485a-be56-59f1b11e63b8
e65c88a2-16cb-4cfa-a0ee-2455305867c3	aeac7a1e-6a52-485a-be56-59f1b11e63b8
efc1723a-8ffb-4046-8954-bb1aaffa2bed	aeac7a1e-6a52-485a-be56-59f1b11e63b8
8d136e1a-1563-4596-90e7-1aab669d4ada	aeac7a1e-6a52-485a-be56-59f1b11e63b8
4b5f2e8e-8fa6-4922-bfae-22c3dc843863	aeac7a1e-6a52-485a-be56-59f1b11e63b8
2394a878-9bdf-428b-8e4f-f5d231362dcb	aeac7a1e-6a52-485a-be56-59f1b11e63b8
ffa6bbc7-13aa-40d1-a871-bee63832b195	aeac7a1e-6a52-485a-be56-59f1b11e63b8
b612d24d-48a7-4b8f-9728-1d789e5dcdae	aeac7a1e-6a52-485a-be56-59f1b11e63b8
2394a878-9bdf-428b-8e4f-f5d231362dcb	25ac9f70-b14a-4b63-8b1e-1c7c58df2f3b
794f997f-e057-4ba2-9f60-879574231ddc	aeac7a1e-6a52-485a-be56-59f1b11e63b8
63cc1358-5792-45ac-b816-244a4e18bf09	190af348-0a88-45f2-af1f-7e26dbf988a2
0ab4a22c-a6b0-4ecd-bce5-12ae08d53d94	1d6042e5-bc7c-47a4-a49e-85e0da766d9b
a8d8fa2f-7e95-4f0d-bb26-6a8503b6621d	aeac7a1e-6a52-485a-be56-59f1b11e63b8
8a05a143-0b30-4c35-9db1-df98c612e697	aeac7a1e-6a52-485a-be56-59f1b11e63b8
8db5dac6-ab76-4c0a-8762-e6591ae394c7	aeac7a1e-6a52-485a-be56-59f1b11e63b8
d28b5214-51d1-443e-8e63-ecf2e5cef7f3	190af348-0a88-45f2-af1f-7e26dbf988a2
92fd977f-0530-454a-9128-5e56f4399c70	190af348-0a88-45f2-af1f-7e26dbf988a2
313bbcd7-d573-4f88-aa58-c217dbd310a8	aeac7a1e-6a52-485a-be56-59f1b11e63b8
92fd977f-0530-454a-9128-5e56f4399c70	aeac7a1e-6a52-485a-be56-59f1b11e63b8
918f0c5f-52da-4da8-83e8-b97f8eea053e	25ac9f70-b14a-4b63-8b1e-1c7c58df2f3b
e65c88a2-16cb-4cfa-a0ee-2455305867c3	190af348-0a88-45f2-af1f-7e26dbf988a2
0e8fd425-209a-4ad3-980e-a6d31917d9d7	aeac7a1e-6a52-485a-be56-59f1b11e63b8
9fcaeb3a-4545-435c-a2a6-99ee0a39411b	aeac7a1e-6a52-485a-be56-59f1b11e63b8
2394a878-9bdf-428b-8e4f-f5d231362dcb	190af348-0a88-45f2-af1f-7e26dbf988a2
8a99120d-cdda-4113-b75d-49ea84b9e7d7	25ac9f70-b14a-4b63-8b1e-1c7c58df2f3b
918f0c5f-52da-4da8-83e8-b97f8eea053e	aeac7a1e-6a52-485a-be56-59f1b11e63b8
7554fb21-5876-456f-8be2-4cac91beda09	aeac7a1e-6a52-485a-be56-59f1b11e63b8
30284747-d0b6-4322-81ac-af69cf433daf	25ac9f70-b14a-4b63-8b1e-1c7c58df2f3b
b2ce55fe-e9f2-4496-ba1c-9080c1f7f012	190af348-0a88-45f2-af1f-7e26dbf988a2
63cc1358-5792-45ac-b816-244a4e18bf09	aeac7a1e-6a52-485a-be56-59f1b11e63b8
9631bb48-25e2-42bb-bc6b-1f47b9b08d5d	aeac7a1e-6a52-485a-be56-59f1b11e63b8
50fee5fb-d0a6-4f50-a3d0-ba67e975bdbb	aeac7a1e-6a52-485a-be56-59f1b11e63b8
918f0c5f-52da-4da8-83e8-b97f8eea053e	190af348-0a88-45f2-af1f-7e26dbf988a2
9f0d8fc2-bc32-4793-9b6a-f7a067770ca1	aeac7a1e-6a52-485a-be56-59f1b11e63b8
881b2475-727c-4faa-9634-13a7d62f648c	190af348-0a88-45f2-af1f-7e26dbf988a2
b4ac9d89-455b-42af-89b8-462e2eca973d	aeac7a1e-6a52-485a-be56-59f1b11e63b8
cc9afc7f-f949-472e-929e-4be48690d022	25ac9f70-b14a-4b63-8b1e-1c7c58df2f3b
385fb1af-9ba3-474d-9708-0e1f77d412f8	190af348-0a88-45f2-af1f-7e26dbf988a2
f61cea99-1cbe-47ce-836b-00025542815a	190af348-0a88-45f2-af1f-7e26dbf988a2
17717551-af2f-4b9e-9caf-a8c614c1e671	aeac7a1e-6a52-485a-be56-59f1b11e63b8
50fee5fb-d0a6-4f50-a3d0-ba67e975bdbb	25ac9f70-b14a-4b63-8b1e-1c7c58df2f3b
8a99120d-cdda-4113-b75d-49ea84b9e7d7	aeac7a1e-6a52-485a-be56-59f1b11e63b8
2d20ce51-760b-4157-bd8c-2d1c8e9aa3c1	aeac7a1e-6a52-485a-be56-59f1b11e63b8
7554fb21-5876-456f-8be2-4cac91beda09	25ac9f70-b14a-4b63-8b1e-1c7c58df2f3b
71ed90ec-a4e8-4547-9d91-38604e515414	aeac7a1e-6a52-485a-be56-59f1b11e63b8
cc9afc7f-f949-472e-929e-4be48690d022	aeac7a1e-6a52-485a-be56-59f1b11e63b8
b9cd6ebe-b6e9-4c25-81dc-32b8b2af0ed3	25ac9f70-b14a-4b63-8b1e-1c7c58df2f3b
23fd4323-8cc4-4b20-98f7-21010c9d5a8b	190af348-0a88-45f2-af1f-7e26dbf988a2
0a54fb78-d93e-4f7b-b101-a1f1386acf33	aeac7a1e-6a52-485a-be56-59f1b11e63b8
e2039cd6-3211-44cc-a391-d5c8c9f329c3	aeac7a1e-6a52-485a-be56-59f1b11e63b8
71ed90ec-a4e8-4547-9d91-38604e515414	25ac9f70-b14a-4b63-8b1e-1c7c58df2f3b
1f1ddf50-19de-4bc1-9783-3c318b4df5b2	aeac7a1e-6a52-485a-be56-59f1b11e63b8
91bbab83-b906-43c5-a7f1-dbfbc7ce62d5	aeac7a1e-6a52-485a-be56-59f1b11e63b8
26c331f3-c0cc-4253-ad87-eded7097ddc9	25ac9f70-b14a-4b63-8b1e-1c7c58df2f3b
46cbdb19-2cf3-42c3-91de-8cd3f97e9411	190af348-0a88-45f2-af1f-7e26dbf988a2
7554fb21-5876-456f-8be2-4cac91beda09	190af348-0a88-45f2-af1f-7e26dbf988a2
30284747-d0b6-4322-81ac-af69cf433daf	aeac7a1e-6a52-485a-be56-59f1b11e63b8
26c331f3-c0cc-4253-ad87-eded7097ddc9	aeac7a1e-6a52-485a-be56-59f1b11e63b8
9fcaeb3a-4545-435c-a2a6-99ee0a39411b	25ac9f70-b14a-4b63-8b1e-1c7c58df2f3b
cce740bd-352a-4cbb-990c-f24ffeb5c830	190af348-0a88-45f2-af1f-7e26dbf988a2
385fb1af-9ba3-474d-9708-0e1f77d412f8	aeac7a1e-6a52-485a-be56-59f1b11e63b8
2c5ad8df-06c8-41e5-b1e9-37e5827e3365	aeac7a1e-6a52-485a-be56-59f1b11e63b8
d9f7a05a-a6a5-4dff-8506-17dd0799cfa1	25ac9f70-b14a-4b63-8b1e-1c7c58df2f3b
30284747-d0b6-4322-81ac-af69cf433daf	190af348-0a88-45f2-af1f-7e26dbf988a2
46cbdb19-2cf3-42c3-91de-8cd3f97e9411	aeac7a1e-6a52-485a-be56-59f1b11e63b8
f61cea99-1cbe-47ce-836b-00025542815a	aeac7a1e-6a52-485a-be56-59f1b11e63b8
cd6344cb-fbb5-436b-8a77-dd60fbe40c27	aeac7a1e-6a52-485a-be56-59f1b11e63b8
efb884b0-ef69-4e16-8491-1fad00b44878	aeac7a1e-6a52-485a-be56-59f1b11e63b8
a62273e8-ab4b-48fc-8f92-428f5d748452	aeac7a1e-6a52-485a-be56-59f1b11e63b8
d30c30e5-1581-467a-952a-190182bd8904	aeac7a1e-6a52-485a-be56-59f1b11e63b8
881b2475-727c-4faa-9634-13a7d62f648c	25ac9f70-b14a-4b63-8b1e-1c7c58df2f3b
9f0d8fc2-bc32-4793-9b6a-f7a067770ca1	25ac9f70-b14a-4b63-8b1e-1c7c58df2f3b
efb884b0-ef69-4e16-8491-1fad00b44878	25ac9f70-b14a-4b63-8b1e-1c7c58df2f3b
a62273e8-ab4b-48fc-8f92-428f5d748452	25ac9f70-b14a-4b63-8b1e-1c7c58df2f3b
d30c30e5-1581-467a-952a-190182bd8904	25ac9f70-b14a-4b63-8b1e-1c7c58df2f3b
50fee5fb-d0a6-4f50-a3d0-ba67e975bdbb	190af348-0a88-45f2-af1f-7e26dbf988a2
d28b5214-51d1-443e-8e63-ecf2e5cef7f3	aeac7a1e-6a52-485a-be56-59f1b11e63b8
cce740bd-352a-4cbb-990c-f24ffeb5c830	25ac9f70-b14a-4b63-8b1e-1c7c58df2f3b
23fd4323-8cc4-4b20-98f7-21010c9d5a8b	25ac9f70-b14a-4b63-8b1e-1c7c58df2f3b
17717551-af2f-4b9e-9caf-a8c614c1e671	190af348-0a88-45f2-af1f-7e26dbf988a2
38b8a18d-3182-4cab-84a5-3e0060de74ef	a7c5d58a-c275-4518-bd11-65429d371f54
d9f7a05a-a6a5-4dff-8506-17dd0799cfa1	aeac7a1e-6a52-485a-be56-59f1b11e63b8
f61cea99-1cbe-47ce-836b-00025542815a	25ac9f70-b14a-4b63-8b1e-1c7c58df2f3b
2c5ad8df-06c8-41e5-b1e9-37e5827e3365	25ac9f70-b14a-4b63-8b1e-1c7c58df2f3b
0e8fd425-209a-4ad3-980e-a6d31917d9d7	190af348-0a88-45f2-af1f-7e26dbf988a2
881b2475-727c-4faa-9634-13a7d62f648c	aeac7a1e-6a52-485a-be56-59f1b11e63b8
9631bb48-25e2-42bb-bc6b-1f47b9b08d5d	190af348-0a88-45f2-af1f-7e26dbf988a2
ffa6bbc7-13aa-40d1-a871-bee63832b195	25ac9f70-b14a-4b63-8b1e-1c7c58df2f3b
17717551-af2f-4b9e-9caf-a8c614c1e671	25ac9f70-b14a-4b63-8b1e-1c7c58df2f3b
2c5ad8df-06c8-41e5-b1e9-37e5827e3365	190af348-0a88-45f2-af1f-7e26dbf988a2
adb5fe1e-3a1e-4828-9e5e-de17410695de	aeac7a1e-6a52-485a-be56-59f1b11e63b8
b9cd6ebe-b6e9-4c25-81dc-32b8b2af0ed3	aeac7a1e-6a52-485a-be56-59f1b11e63b8
2d20ce51-760b-4157-bd8c-2d1c8e9aa3c1	25ac9f70-b14a-4b63-8b1e-1c7c58df2f3b
b4ac9d89-455b-42af-89b8-462e2eca973d	190af348-0a88-45f2-af1f-7e26dbf988a2
38b8a18d-3182-4cab-84a5-3e0060de74ef	b483eb56-3ac4-4e72-a9ac-fd7f217f619b
38b8a18d-3182-4cab-84a5-3e0060de74ef	5539052c-be47-4345-bfce-c67c6f3b82c5
38b8a18d-3182-4cab-84a5-3e0060de74ef	1575de97-4d60-435e-bf1b-a0376b7acdc2
\.


--
-- TOC entry 4692 (class 0 OID 20769)
-- Dependencies: 301
-- Data for Name: web_origins; Type: TABLE DATA; Schema: public; Owner: peterhammans
--

COPY public.web_origins (client_id, value) FROM stdin;
ab6c7ed6-6fcd-479e-872f-ace1a9468cc5	+
15641592-9ee8-4f81-9105-06202f2c80b2	+
53dcc167-e5c7-4a51-b708-cef18370e62c	
5be18a22-1bf7-4158-b418-7c8b622c8ee0	+
2e713a57-2d5f-4835-aca9-8342751942d1	http://localhost:3000
\.


--
-- TOC entry 4255 (class 2606 OID 20774)
-- Name: org_domain ORG_DOMAIN_pkey; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.org_domain
    ADD CONSTRAINT "ORG_DOMAIN_pkey" PRIMARY KEY (id, name);


--
-- TOC entry 4247 (class 2606 OID 20776)
-- Name: org ORG_pkey; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.org
    ADD CONSTRAINT "ORG_pkey" PRIMARY KEY (id);


--
-- TOC entry 4347 (class 2606 OID 20778)
-- Name: server_config SERVER_CONFIG_pkey; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.server_config
    ADD CONSTRAINT "SERVER_CONFIG_pkey" PRIMARY KEY (server_config_key);


--
-- TOC entry 4231 (class 2606 OID 20780)
-- Name: keycloak_role UK_J3RWUVD56ONTGSUHOGM184WW2-2; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.keycloak_role
    ADD CONSTRAINT "UK_J3RWUVD56ONTGSUHOGM184WW2-2" UNIQUE (name, client_realm_constraint);


--
-- TOC entry 4124 (class 2606 OID 20782)
-- Name: client_auth_flow_bindings c_cli_flow_bind; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.client_auth_flow_bindings
    ADD CONSTRAINT c_cli_flow_bind PRIMARY KEY (client_id, binding_name);


--
-- TOC entry 4139 (class 2606 OID 20784)
-- Name: client_scope_client c_cli_scope_bind; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.client_scope_client
    ADD CONSTRAINT c_cli_scope_bind PRIMARY KEY (client_id, scope_id);


--
-- TOC entry 4126 (class 2606 OID 20786)
-- Name: client_initial_access cnstr_client_init_acc_pk; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.client_initial_access
    ADD CONSTRAINT cnstr_client_init_acc_pk PRIMARY KEY (id);


--
-- TOC entry 4274 (class 2606 OID 20788)
-- Name: realm_default_groups con_group_id_def_groups; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.realm_default_groups
    ADD CONSTRAINT con_group_id_def_groups UNIQUE (group_id);


--
-- TOC entry 4114 (class 2606 OID 20790)
-- Name: broker_link constr_broker_link_pk; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.broker_link
    ADD CONSTRAINT constr_broker_link_pk PRIMARY KEY (identity_provider, user_id);


--
-- TOC entry 4151 (class 2606 OID 20792)
-- Name: component_config constr_component_config_pk; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.component_config
    ADD CONSTRAINT constr_component_config_pk PRIMARY KEY (id);


--
-- TOC entry 4147 (class 2606 OID 20794)
-- Name: component constr_component_pk; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.component
    ADD CONSTRAINT constr_component_pk PRIMARY KEY (id);


--
-- TOC entry 4190 (class 2606 OID 20796)
-- Name: fed_user_required_action constr_fed_required_action; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.fed_user_required_action
    ADD CONSTRAINT constr_fed_required_action PRIMARY KEY (required_action, user_id);


--
-- TOC entry 4170 (class 2606 OID 20798)
-- Name: fed_user_attribute constr_fed_user_attr_pk; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.fed_user_attribute
    ADD CONSTRAINT constr_fed_user_attr_pk PRIMARY KEY (id);


--
-- TOC entry 4175 (class 2606 OID 20800)
-- Name: fed_user_consent constr_fed_user_consent_pk; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.fed_user_consent
    ADD CONSTRAINT constr_fed_user_consent_pk PRIMARY KEY (id);


--
-- TOC entry 4182 (class 2606 OID 20802)
-- Name: fed_user_credential constr_fed_user_cred_pk; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.fed_user_credential
    ADD CONSTRAINT constr_fed_user_cred_pk PRIMARY KEY (id);


--
-- TOC entry 4186 (class 2606 OID 20804)
-- Name: fed_user_group_membership constr_fed_user_group; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.fed_user_group_membership
    ADD CONSTRAINT constr_fed_user_group PRIMARY KEY (group_id, user_id);


--
-- TOC entry 4194 (class 2606 OID 20806)
-- Name: fed_user_role_mapping constr_fed_user_role; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.fed_user_role_mapping
    ADD CONSTRAINT constr_fed_user_role PRIMARY KEY (role_id, user_id);


--
-- TOC entry 4202 (class 2606 OID 20808)
-- Name: federated_user constr_federated_user; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.federated_user
    ADD CONSTRAINT constr_federated_user PRIMARY KEY (id);


--
-- TOC entry 4276 (class 2606 OID 20810)
-- Name: realm_default_groups constr_realm_default_groups; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.realm_default_groups
    ADD CONSTRAINT constr_realm_default_groups PRIMARY KEY (realm_id, group_id);


--
-- TOC entry 4279 (class 2606 OID 20812)
-- Name: realm_enabled_event_types constr_realm_enabl_event_types; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.realm_enabled_event_types
    ADD CONSTRAINT constr_realm_enabl_event_types PRIMARY KEY (realm_id, value);


--
-- TOC entry 4282 (class 2606 OID 20814)
-- Name: realm_events_listeners constr_realm_events_listeners; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.realm_events_listeners
    ADD CONSTRAINT constr_realm_events_listeners PRIMARY KEY (realm_id, value);


--
-- TOC entry 4291 (class 2606 OID 20816)
-- Name: realm_supported_locales constr_realm_supported_locales; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.realm_supported_locales
    ADD CONSTRAINT constr_realm_supported_locales PRIMARY KEY (realm_id, value);


--
-- TOC entry 4211 (class 2606 OID 20818)
-- Name: identity_provider constraint_2b; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.identity_provider
    ADD CONSTRAINT constraint_2b PRIMARY KEY (internal_id);


--
-- TOC entry 4121 (class 2606 OID 20820)
-- Name: client_attributes constraint_3c; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.client_attributes
    ADD CONSTRAINT constraint_3c PRIMARY KEY (client_id, name);


--
-- TOC entry 4167 (class 2606 OID 20822)
-- Name: event_entity constraint_4; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.event_entity
    ADD CONSTRAINT constraint_4 PRIMARY KEY (id);


--
-- TOC entry 4198 (class 2606 OID 20824)
-- Name: federated_identity constraint_40; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.federated_identity
    ADD CONSTRAINT constraint_40 PRIMARY KEY (identity_provider, user_id);


--
-- TOC entry 4266 (class 2606 OID 20826)
-- Name: realm constraint_4a; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.realm
    ADD CONSTRAINT constraint_4a PRIMARY KEY (id);


--
-- TOC entry 4382 (class 2606 OID 20828)
-- Name: user_federation_provider constraint_5c; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.user_federation_provider
    ADD CONSTRAINT constraint_5c PRIMARY KEY (id);


--
-- TOC entry 4116 (class 2606 OID 20830)
-- Name: client constraint_7; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.client
    ADD CONSTRAINT constraint_7 PRIMARY KEY (id);


--
-- TOC entry 4341 (class 2606 OID 20832)
-- Name: scope_mapping constraint_81; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.scope_mapping
    ADD CONSTRAINT constraint_81 PRIMARY KEY (client_id, role_id);


--
-- TOC entry 4129 (class 2606 OID 20834)
-- Name: client_node_registrations constraint_84; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.client_node_registrations
    ADD CONSTRAINT constraint_84 PRIMARY KEY (client_id, name);


--
-- TOC entry 4271 (class 2606 OID 20836)
-- Name: realm_attribute constraint_9; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.realm_attribute
    ADD CONSTRAINT constraint_9 PRIMARY KEY (name, realm_id);


--
-- TOC entry 4287 (class 2606 OID 20838)
-- Name: realm_required_credential constraint_92; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.realm_required_credential
    ADD CONSTRAINT constraint_92 PRIMARY KEY (realm_id, type);


--
-- TOC entry 4233 (class 2606 OID 20840)
-- Name: keycloak_role constraint_a; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.keycloak_role
    ADD CONSTRAINT constraint_a PRIMARY KEY (id);


--
-- TOC entry 4096 (class 2606 OID 20842)
-- Name: admin_event_entity constraint_admin_event_entity; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.admin_event_entity
    ADD CONSTRAINT constraint_admin_event_entity PRIMARY KEY (id);


--
-- TOC entry 4112 (class 2606 OID 20844)
-- Name: authenticator_config_entry constraint_auth_cfg_pk; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.authenticator_config_entry
    ADD CONSTRAINT constraint_auth_cfg_pk PRIMARY KEY (authenticator_id, name);


--
-- TOC entry 4102 (class 2606 OID 20846)
-- Name: authentication_execution constraint_auth_exec_pk; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.authentication_execution
    ADD CONSTRAINT constraint_auth_exec_pk PRIMARY KEY (id);


--
-- TOC entry 4106 (class 2606 OID 20848)
-- Name: authentication_flow constraint_auth_flow_pk; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.authentication_flow
    ADD CONSTRAINT constraint_auth_flow_pk PRIMARY KEY (id);


--
-- TOC entry 4109 (class 2606 OID 20850)
-- Name: authenticator_config constraint_auth_pk; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.authenticator_config
    ADD CONSTRAINT constraint_auth_pk PRIMARY KEY (id);


--
-- TOC entry 4391 (class 2606 OID 20852)
-- Name: user_role_mapping constraint_c; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.user_role_mapping
    ADD CONSTRAINT constraint_c PRIMARY KEY (role_id, user_id);


--
-- TOC entry 4154 (class 2606 OID 20854)
-- Name: composite_role constraint_composite_role; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.composite_role
    ADD CONSTRAINT constraint_composite_role PRIMARY KEY (composite, child_role);


--
-- TOC entry 4218 (class 2606 OID 20856)
-- Name: identity_provider_config constraint_d; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.identity_provider_config
    ADD CONSTRAINT constraint_d PRIMARY KEY (identity_provider_id, name);


--
-- TOC entry 4258 (class 2606 OID 20858)
-- Name: policy_config constraint_dpc; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.policy_config
    ADD CONSTRAINT constraint_dpc PRIMARY KEY (policy_id, name);


--
-- TOC entry 4289 (class 2606 OID 20860)
-- Name: realm_smtp_config constraint_e; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.realm_smtp_config
    ADD CONSTRAINT constraint_e PRIMARY KEY (realm_id, name);


--
-- TOC entry 4158 (class 2606 OID 20862)
-- Name: credential constraint_f; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.credential
    ADD CONSTRAINT constraint_f PRIMARY KEY (id);


--
-- TOC entry 4374 (class 2606 OID 20864)
-- Name: user_federation_config constraint_f9; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.user_federation_config
    ADD CONSTRAINT constraint_f9 PRIMARY KEY (user_federation_provider_id, name);


--
-- TOC entry 4312 (class 2606 OID 20866)
-- Name: resource_server_perm_ticket constraint_fapmt; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.resource_server_perm_ticket
    ADD CONSTRAINT constraint_fapmt PRIMARY KEY (id);


--
-- TOC entry 4323 (class 2606 OID 20868)
-- Name: resource_server_resource constraint_farsr; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.resource_server_resource
    ADD CONSTRAINT constraint_farsr PRIMARY KEY (id);


--
-- TOC entry 4318 (class 2606 OID 20870)
-- Name: resource_server_policy constraint_farsrp; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.resource_server_policy
    ADD CONSTRAINT constraint_farsrp PRIMARY KEY (id);


--
-- TOC entry 4099 (class 2606 OID 20872)
-- Name: associated_policy constraint_farsrpap; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.associated_policy
    ADD CONSTRAINT constraint_farsrpap PRIMARY KEY (policy_id, associated_policy_id);


--
-- TOC entry 4304 (class 2606 OID 20874)
-- Name: resource_policy constraint_farsrpp; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.resource_policy
    ADD CONSTRAINT constraint_farsrpp PRIMARY KEY (resource_id, policy_id);


--
-- TOC entry 4328 (class 2606 OID 20876)
-- Name: resource_server_scope constraint_farsrs; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.resource_server_scope
    ADD CONSTRAINT constraint_farsrs PRIMARY KEY (id);


--
-- TOC entry 4307 (class 2606 OID 20878)
-- Name: resource_scope constraint_farsrsp; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.resource_scope
    ADD CONSTRAINT constraint_farsrsp PRIMARY KEY (resource_id, scope_id);


--
-- TOC entry 4344 (class 2606 OID 20880)
-- Name: scope_policy constraint_farsrsps; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.scope_policy
    ADD CONSTRAINT constraint_farsrsps PRIMARY KEY (scope_id, policy_id);


--
-- TOC entry 4366 (class 2606 OID 20882)
-- Name: user_entity constraint_fb; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.user_entity
    ADD CONSTRAINT constraint_fb PRIMARY KEY (id);


--
-- TOC entry 4380 (class 2606 OID 20884)
-- Name: user_federation_mapper_config constraint_fedmapper_cfg_pm; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.user_federation_mapper_config
    ADD CONSTRAINT constraint_fedmapper_cfg_pm PRIMARY KEY (user_federation_mapper_id, name);


--
-- TOC entry 4376 (class 2606 OID 20886)
-- Name: user_federation_mapper constraint_fedmapperpm; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.user_federation_mapper
    ADD CONSTRAINT constraint_fedmapperpm PRIMARY KEY (id);


--
-- TOC entry 4180 (class 2606 OID 20888)
-- Name: fed_user_consent_cl_scope constraint_fgrntcsnt_clsc_pm; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.fed_user_consent_cl_scope
    ADD CONSTRAINT constraint_fgrntcsnt_clsc_pm PRIMARY KEY (user_consent_id, scope_id);


--
-- TOC entry 4362 (class 2606 OID 20890)
-- Name: user_consent_client_scope constraint_grntcsnt_clsc_pm; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.user_consent_client_scope
    ADD CONSTRAINT constraint_grntcsnt_clsc_pm PRIMARY KEY (user_consent_id, scope_id);


--
-- TOC entry 4355 (class 2606 OID 20892)
-- Name: user_consent constraint_grntcsnt_pm; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.user_consent
    ADD CONSTRAINT constraint_grntcsnt_pm PRIMARY KEY (id);


--
-- TOC entry 4227 (class 2606 OID 20894)
-- Name: keycloak_group constraint_group; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.keycloak_group
    ADD CONSTRAINT constraint_group PRIMARY KEY (id);


--
-- TOC entry 4204 (class 2606 OID 20896)
-- Name: group_attribute constraint_group_attribute_pk; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.group_attribute
    ADD CONSTRAINT constraint_group_attribute_pk PRIMARY KEY (id);


--
-- TOC entry 4208 (class 2606 OID 20898)
-- Name: group_role_mapping constraint_group_role; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.group_role_mapping
    ADD CONSTRAINT constraint_group_role PRIMARY KEY (role_id, group_id);


--
-- TOC entry 4220 (class 2606 OID 20900)
-- Name: identity_provider_mapper constraint_idpm; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.identity_provider_mapper
    ADD CONSTRAINT constraint_idpm PRIMARY KEY (id);


--
-- TOC entry 4223 (class 2606 OID 20902)
-- Name: idp_mapper_config constraint_idpmconfig; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.idp_mapper_config
    ADD CONSTRAINT constraint_idpmconfig PRIMARY KEY (idp_mapper_id, name);


--
-- TOC entry 4225 (class 2606 OID 20904)
-- Name: jgroups_ping constraint_jgroups_ping; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.jgroups_ping
    ADD CONSTRAINT constraint_jgroups_ping PRIMARY KEY (address);


--
-- TOC entry 4237 (class 2606 OID 20906)
-- Name: migration_model constraint_migmod; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.migration_model
    ADD CONSTRAINT constraint_migmod PRIMARY KEY (id);


--
-- TOC entry 4240 (class 2606 OID 20908)
-- Name: offline_client_session constraint_offl_cl_ses_pk3; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.offline_client_session
    ADD CONSTRAINT constraint_offl_cl_ses_pk3 PRIMARY KEY (user_session_id, client_id, client_storage_provider, external_client_id, offline_flag);


--
-- TOC entry 4242 (class 2606 OID 20910)
-- Name: offline_user_session constraint_offl_us_ses_pk2; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.offline_user_session
    ADD CONSTRAINT constraint_offl_us_ses_pk2 PRIMARY KEY (user_session_id, offline_flag);


--
-- TOC entry 4260 (class 2606 OID 20912)
-- Name: protocol_mapper constraint_pcm; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.protocol_mapper
    ADD CONSTRAINT constraint_pcm PRIMARY KEY (id);


--
-- TOC entry 4264 (class 2606 OID 20914)
-- Name: protocol_mapper_config constraint_pmconfig; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.protocol_mapper_config
    ADD CONSTRAINT constraint_pmconfig PRIMARY KEY (protocol_mapper_id, name);


--
-- TOC entry 4294 (class 2606 OID 20916)
-- Name: redirect_uris constraint_redirect_uris; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.redirect_uris
    ADD CONSTRAINT constraint_redirect_uris PRIMARY KEY (client_id, value);


--
-- TOC entry 4297 (class 2606 OID 20918)
-- Name: required_action_config constraint_req_act_cfg_pk; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.required_action_config
    ADD CONSTRAINT constraint_req_act_cfg_pk PRIMARY KEY (required_action_id, name);


--
-- TOC entry 4299 (class 2606 OID 20920)
-- Name: required_action_provider constraint_req_act_prv_pk; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.required_action_provider
    ADD CONSTRAINT constraint_req_act_prv_pk PRIMARY KEY (id);


--
-- TOC entry 4388 (class 2606 OID 20922)
-- Name: user_required_action constraint_required_action; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.user_required_action
    ADD CONSTRAINT constraint_required_action PRIMARY KEY (required_action, user_id);


--
-- TOC entry 4333 (class 2606 OID 20924)
-- Name: resource_uris constraint_resour_uris_pk; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.resource_uris
    ADD CONSTRAINT constraint_resour_uris_pk PRIMARY KEY (resource_id, value);


--
-- TOC entry 4338 (class 2606 OID 20926)
-- Name: role_attribute constraint_role_attribute_pk; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.role_attribute
    ADD CONSTRAINT constraint_role_attribute_pk PRIMARY KEY (id);


--
-- TOC entry 4335 (class 2606 OID 20928)
-- Name: revoked_token constraint_rt; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.revoked_token
    ADD CONSTRAINT constraint_rt PRIMARY KEY (id);


--
-- TOC entry 4349 (class 2606 OID 20930)
-- Name: user_attribute constraint_user_attribute_pk; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.user_attribute
    ADD CONSTRAINT constraint_user_attribute_pk PRIMARY KEY (id);


--
-- TOC entry 4385 (class 2606 OID 20932)
-- Name: user_group_membership constraint_user_group; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.user_group_membership
    ADD CONSTRAINT constraint_user_group PRIMARY KEY (group_id, user_id);


--
-- TOC entry 4394 (class 2606 OID 20934)
-- Name: web_origins constraint_web_origins; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.web_origins
    ADD CONSTRAINT constraint_web_origins PRIMARY KEY (client_id, value);


--
-- TOC entry 4161 (class 2606 OID 20936)
-- Name: databasechangeloglock databasechangeloglock_pkey; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.databasechangeloglock
    ADD CONSTRAINT databasechangeloglock_pkey PRIMARY KEY (id);


--
-- TOC entry 4137 (class 2606 OID 20938)
-- Name: client_scope_attributes pk_cl_tmpl_attr; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.client_scope_attributes
    ADD CONSTRAINT pk_cl_tmpl_attr PRIMARY KEY (scope_id, name);


--
-- TOC entry 4132 (class 2606 OID 20940)
-- Name: client_scope pk_cli_template; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.client_scope
    ADD CONSTRAINT pk_cli_template PRIMARY KEY (id);


--
-- TOC entry 4310 (class 2606 OID 20942)
-- Name: resource_server pk_resource_server; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.resource_server
    ADD CONSTRAINT pk_resource_server PRIMARY KEY (id);


--
-- TOC entry 4145 (class 2606 OID 20944)
-- Name: client_scope_role_mapping pk_template_scope; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.client_scope_role_mapping
    ADD CONSTRAINT pk_template_scope PRIMARY KEY (scope_id, role_id);


--
-- TOC entry 4165 (class 2606 OID 20946)
-- Name: default_client_scope r_def_cli_scope_bind; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.default_client_scope
    ADD CONSTRAINT r_def_cli_scope_bind PRIMARY KEY (realm_id, scope_id);


--
-- TOC entry 4285 (class 2606 OID 20948)
-- Name: realm_localizations realm_localizations_pkey; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.realm_localizations
    ADD CONSTRAINT realm_localizations_pkey PRIMARY KEY (realm_id, locale);


--
-- TOC entry 4302 (class 2606 OID 20950)
-- Name: resource_attribute res_attr_pk; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.resource_attribute
    ADD CONSTRAINT res_attr_pk PRIMARY KEY (id);


--
-- TOC entry 4229 (class 2606 OID 20952)
-- Name: keycloak_group sibling_names; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.keycloak_group
    ADD CONSTRAINT sibling_names UNIQUE (realm_id, parent_group, name);


--
-- TOC entry 4216 (class 2606 OID 20954)
-- Name: identity_provider uk_2daelwnibji49avxsrtuf6xj33; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.identity_provider
    ADD CONSTRAINT uk_2daelwnibji49avxsrtuf6xj33 UNIQUE (provider_alias, realm_id);


--
-- TOC entry 4119 (class 2606 OID 20956)
-- Name: client uk_b71cjlbenv945rb6gcon438at; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.client
    ADD CONSTRAINT uk_b71cjlbenv945rb6gcon438at UNIQUE (realm_id, client_id);


--
-- TOC entry 4134 (class 2606 OID 20958)
-- Name: client_scope uk_cli_scope; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.client_scope
    ADD CONSTRAINT uk_cli_scope UNIQUE (realm_id, name);


--
-- TOC entry 4370 (class 2606 OID 20960)
-- Name: user_entity uk_dykn684sl8up1crfei6eckhd7; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.user_entity
    ADD CONSTRAINT uk_dykn684sl8up1crfei6eckhd7 UNIQUE (realm_id, email_constraint);


--
-- TOC entry 4358 (class 2606 OID 20962)
-- Name: user_consent uk_external_consent; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.user_consent
    ADD CONSTRAINT uk_external_consent UNIQUE (client_storage_provider, external_client_id, user_id);


--
-- TOC entry 4326 (class 2606 OID 20964)
-- Name: resource_server_resource uk_frsr6t700s9v50bu18ws5ha6; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.resource_server_resource
    ADD CONSTRAINT uk_frsr6t700s9v50bu18ws5ha6 UNIQUE (name, owner, resource_server_id);


--
-- TOC entry 4316 (class 2606 OID 20966)
-- Name: resource_server_perm_ticket uk_frsr6t700s9v50bu18ws5pmt; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.resource_server_perm_ticket
    ADD CONSTRAINT uk_frsr6t700s9v50bu18ws5pmt UNIQUE (owner, requester, resource_server_id, resource_id, scope_id);


--
-- TOC entry 4321 (class 2606 OID 20968)
-- Name: resource_server_policy uk_frsrpt700s9v50bu18ws5ha6; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.resource_server_policy
    ADD CONSTRAINT uk_frsrpt700s9v50bu18ws5ha6 UNIQUE (name, resource_server_id);


--
-- TOC entry 4331 (class 2606 OID 20970)
-- Name: resource_server_scope uk_frsrst700s9v50bu18ws5ha6; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.resource_server_scope
    ADD CONSTRAINT uk_frsrst700s9v50bu18ws5ha6 UNIQUE (name, resource_server_id);


--
-- TOC entry 4360 (class 2606 OID 20972)
-- Name: user_consent uk_local_consent; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.user_consent
    ADD CONSTRAINT uk_local_consent UNIQUE (client_id, user_id);


--
-- TOC entry 4249 (class 2606 OID 20974)
-- Name: org uk_org_alias; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.org
    ADD CONSTRAINT uk_org_alias UNIQUE (realm_id, alias);


--
-- TOC entry 4251 (class 2606 OID 20976)
-- Name: org uk_org_group; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.org
    ADD CONSTRAINT uk_org_group UNIQUE (group_id);


--
-- TOC entry 4253 (class 2606 OID 20978)
-- Name: org uk_org_name; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.org
    ADD CONSTRAINT uk_org_name UNIQUE (realm_id, name);


--
-- TOC entry 4269 (class 2606 OID 20980)
-- Name: realm uk_orvsdmla56612eaefiq6wl5oi; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.realm
    ADD CONSTRAINT uk_orvsdmla56612eaefiq6wl5oi UNIQUE (name);


--
-- TOC entry 4372 (class 2606 OID 20982)
-- Name: user_entity uk_ru8tt6t700s9v50bu18ws5ha6; Type: CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.user_entity
    ADD CONSTRAINT uk_ru8tt6t700s9v50bu18ws5ha6 UNIQUE (realm_id, username);


--
-- TOC entry 4171 (class 1259 OID 20983)
-- Name: fed_user_attr_long_values; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX fed_user_attr_long_values ON public.fed_user_attribute USING btree (long_value_hash, name);


--
-- TOC entry 4172 (class 1259 OID 20984)
-- Name: fed_user_attr_long_values_lower_case; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX fed_user_attr_long_values_lower_case ON public.fed_user_attribute USING btree (long_value_hash_lower_case, name);


--
-- TOC entry 4097 (class 1259 OID 20985)
-- Name: idx_admin_event_time; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_admin_event_time ON public.admin_event_entity USING btree (realm_id, admin_event_time);


--
-- TOC entry 4100 (class 1259 OID 20986)
-- Name: idx_assoc_pol_assoc_pol_id; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_assoc_pol_assoc_pol_id ON public.associated_policy USING btree (associated_policy_id);


--
-- TOC entry 4110 (class 1259 OID 20987)
-- Name: idx_auth_config_realm; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_auth_config_realm ON public.authenticator_config USING btree (realm_id);


--
-- TOC entry 4103 (class 1259 OID 20988)
-- Name: idx_auth_exec_flow; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_auth_exec_flow ON public.authentication_execution USING btree (flow_id);


--
-- TOC entry 4104 (class 1259 OID 20989)
-- Name: idx_auth_exec_realm_flow; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_auth_exec_realm_flow ON public.authentication_execution USING btree (realm_id, flow_id);


--
-- TOC entry 4107 (class 1259 OID 20990)
-- Name: idx_auth_flow_realm; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_auth_flow_realm ON public.authentication_flow USING btree (realm_id);


--
-- TOC entry 4140 (class 1259 OID 20991)
-- Name: idx_cl_clscope; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_cl_clscope ON public.client_scope_client USING btree (scope_id);


--
-- TOC entry 4122 (class 1259 OID 20992)
-- Name: idx_client_att_by_name_value; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_client_att_by_name_value ON public.client_attributes USING btree (name, substr(value, 1, 255));


--
-- TOC entry 4117 (class 1259 OID 20993)
-- Name: idx_client_id; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_client_id ON public.client USING btree (client_id);


--
-- TOC entry 4127 (class 1259 OID 20994)
-- Name: idx_client_init_acc_realm; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_client_init_acc_realm ON public.client_initial_access USING btree (realm_id);


--
-- TOC entry 4135 (class 1259 OID 20995)
-- Name: idx_clscope_attrs; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_clscope_attrs ON public.client_scope_attributes USING btree (scope_id);


--
-- TOC entry 4141 (class 1259 OID 20996)
-- Name: idx_clscope_cl; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_clscope_cl ON public.client_scope_client USING btree (client_id);


--
-- TOC entry 4261 (class 1259 OID 20997)
-- Name: idx_clscope_protmap; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_clscope_protmap ON public.protocol_mapper USING btree (client_scope_id);


--
-- TOC entry 4142 (class 1259 OID 20998)
-- Name: idx_clscope_role; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_clscope_role ON public.client_scope_role_mapping USING btree (scope_id);


--
-- TOC entry 4152 (class 1259 OID 20999)
-- Name: idx_compo_config_compo; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_compo_config_compo ON public.component_config USING btree (component_id);


--
-- TOC entry 4148 (class 1259 OID 21000)
-- Name: idx_component_provider_type; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_component_provider_type ON public.component USING btree (provider_type);


--
-- TOC entry 4149 (class 1259 OID 21001)
-- Name: idx_component_realm; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_component_realm ON public.component USING btree (realm_id);


--
-- TOC entry 4155 (class 1259 OID 21002)
-- Name: idx_composite; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_composite ON public.composite_role USING btree (composite);


--
-- TOC entry 4156 (class 1259 OID 21003)
-- Name: idx_composite_child; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_composite_child ON public.composite_role USING btree (child_role);


--
-- TOC entry 4162 (class 1259 OID 21004)
-- Name: idx_defcls_realm; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_defcls_realm ON public.default_client_scope USING btree (realm_id);


--
-- TOC entry 4163 (class 1259 OID 21005)
-- Name: idx_defcls_scope; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_defcls_scope ON public.default_client_scope USING btree (scope_id);


--
-- TOC entry 4168 (class 1259 OID 21006)
-- Name: idx_event_time; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_event_time ON public.event_entity USING btree (realm_id, event_time);


--
-- TOC entry 4199 (class 1259 OID 21007)
-- Name: idx_fedidentity_feduser; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_fedidentity_feduser ON public.federated_identity USING btree (federated_user_id);


--
-- TOC entry 4200 (class 1259 OID 21008)
-- Name: idx_fedidentity_user; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_fedidentity_user ON public.federated_identity USING btree (user_id);


--
-- TOC entry 4173 (class 1259 OID 21009)
-- Name: idx_fu_attribute; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_fu_attribute ON public.fed_user_attribute USING btree (user_id, realm_id, name);


--
-- TOC entry 4176 (class 1259 OID 21010)
-- Name: idx_fu_cnsnt_ext; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_fu_cnsnt_ext ON public.fed_user_consent USING btree (user_id, client_storage_provider, external_client_id);


--
-- TOC entry 4177 (class 1259 OID 21011)
-- Name: idx_fu_consent; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_fu_consent ON public.fed_user_consent USING btree (user_id, client_id);


--
-- TOC entry 4178 (class 1259 OID 21012)
-- Name: idx_fu_consent_ru; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_fu_consent_ru ON public.fed_user_consent USING btree (realm_id, user_id);


--
-- TOC entry 4183 (class 1259 OID 21013)
-- Name: idx_fu_credential; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_fu_credential ON public.fed_user_credential USING btree (user_id, type);


--
-- TOC entry 4184 (class 1259 OID 21014)
-- Name: idx_fu_credential_ru; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_fu_credential_ru ON public.fed_user_credential USING btree (realm_id, user_id);


--
-- TOC entry 4187 (class 1259 OID 21015)
-- Name: idx_fu_group_membership; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_fu_group_membership ON public.fed_user_group_membership USING btree (user_id, group_id);


--
-- TOC entry 4188 (class 1259 OID 21016)
-- Name: idx_fu_group_membership_ru; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_fu_group_membership_ru ON public.fed_user_group_membership USING btree (realm_id, user_id);


--
-- TOC entry 4191 (class 1259 OID 21017)
-- Name: idx_fu_required_action; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_fu_required_action ON public.fed_user_required_action USING btree (user_id, required_action);


--
-- TOC entry 4192 (class 1259 OID 21018)
-- Name: idx_fu_required_action_ru; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_fu_required_action_ru ON public.fed_user_required_action USING btree (realm_id, user_id);


--
-- TOC entry 4195 (class 1259 OID 21019)
-- Name: idx_fu_role_mapping; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_fu_role_mapping ON public.fed_user_role_mapping USING btree (user_id, role_id);


--
-- TOC entry 4196 (class 1259 OID 21020)
-- Name: idx_fu_role_mapping_ru; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_fu_role_mapping_ru ON public.fed_user_role_mapping USING btree (realm_id, user_id);


--
-- TOC entry 4205 (class 1259 OID 21021)
-- Name: idx_group_att_by_name_value; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_group_att_by_name_value ON public.group_attribute USING btree (name, ((value)::character varying(250)));


--
-- TOC entry 4206 (class 1259 OID 21022)
-- Name: idx_group_attr_group; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_group_attr_group ON public.group_attribute USING btree (group_id);


--
-- TOC entry 4209 (class 1259 OID 21023)
-- Name: idx_group_role_mapp_group; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_group_role_mapp_group ON public.group_role_mapping USING btree (group_id);


--
-- TOC entry 4221 (class 1259 OID 21024)
-- Name: idx_id_prov_mapp_realm; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_id_prov_mapp_realm ON public.identity_provider_mapper USING btree (realm_id);


--
-- TOC entry 4212 (class 1259 OID 21025)
-- Name: idx_ident_prov_realm; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_ident_prov_realm ON public.identity_provider USING btree (realm_id);


--
-- TOC entry 4213 (class 1259 OID 21026)
-- Name: idx_idp_for_login; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_idp_for_login ON public.identity_provider USING btree (realm_id, enabled, link_only, hide_on_login, organization_id);


--
-- TOC entry 4214 (class 1259 OID 21027)
-- Name: idx_idp_realm_org; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_idp_realm_org ON public.identity_provider USING btree (realm_id, organization_id);


--
-- TOC entry 4234 (class 1259 OID 21028)
-- Name: idx_keycloak_role_client; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_keycloak_role_client ON public.keycloak_role USING btree (client);


--
-- TOC entry 4235 (class 1259 OID 21029)
-- Name: idx_keycloak_role_realm; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_keycloak_role_realm ON public.keycloak_role USING btree (realm);


--
-- TOC entry 4243 (class 1259 OID 21030)
-- Name: idx_offline_uss_by_broker_session_id; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_offline_uss_by_broker_session_id ON public.offline_user_session USING btree (broker_session_id, realm_id);


--
-- TOC entry 4244 (class 1259 OID 21031)
-- Name: idx_offline_uss_by_last_session_refresh; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_offline_uss_by_last_session_refresh ON public.offline_user_session USING btree (realm_id, offline_flag, last_session_refresh);


--
-- TOC entry 4245 (class 1259 OID 21032)
-- Name: idx_offline_uss_by_user; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_offline_uss_by_user ON public.offline_user_session USING btree (user_id, realm_id, offline_flag);


--
-- TOC entry 4256 (class 1259 OID 21033)
-- Name: idx_org_domain_org_id; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_org_domain_org_id ON public.org_domain USING btree (org_id);


--
-- TOC entry 4313 (class 1259 OID 21034)
-- Name: idx_perm_ticket_owner; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_perm_ticket_owner ON public.resource_server_perm_ticket USING btree (owner);


--
-- TOC entry 4314 (class 1259 OID 21035)
-- Name: idx_perm_ticket_requester; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_perm_ticket_requester ON public.resource_server_perm_ticket USING btree (requester);


--
-- TOC entry 4262 (class 1259 OID 21036)
-- Name: idx_protocol_mapper_client; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_protocol_mapper_client ON public.protocol_mapper USING btree (client_id);


--
-- TOC entry 4272 (class 1259 OID 21037)
-- Name: idx_realm_attr_realm; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_realm_attr_realm ON public.realm_attribute USING btree (realm_id);


--
-- TOC entry 4130 (class 1259 OID 21038)
-- Name: idx_realm_clscope; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_realm_clscope ON public.client_scope USING btree (realm_id);


--
-- TOC entry 4277 (class 1259 OID 21039)
-- Name: idx_realm_def_grp_realm; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_realm_def_grp_realm ON public.realm_default_groups USING btree (realm_id);


--
-- TOC entry 4283 (class 1259 OID 21040)
-- Name: idx_realm_evt_list_realm; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_realm_evt_list_realm ON public.realm_events_listeners USING btree (realm_id);


--
-- TOC entry 4280 (class 1259 OID 21041)
-- Name: idx_realm_evt_types_realm; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_realm_evt_types_realm ON public.realm_enabled_event_types USING btree (realm_id);


--
-- TOC entry 4267 (class 1259 OID 21042)
-- Name: idx_realm_master_adm_cli; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_realm_master_adm_cli ON public.realm USING btree (master_admin_client);


--
-- TOC entry 4292 (class 1259 OID 21043)
-- Name: idx_realm_supp_local_realm; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_realm_supp_local_realm ON public.realm_supported_locales USING btree (realm_id);


--
-- TOC entry 4295 (class 1259 OID 21044)
-- Name: idx_redir_uri_client; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_redir_uri_client ON public.redirect_uris USING btree (client_id);


--
-- TOC entry 4300 (class 1259 OID 21045)
-- Name: idx_req_act_prov_realm; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_req_act_prov_realm ON public.required_action_provider USING btree (realm_id);


--
-- TOC entry 4305 (class 1259 OID 21046)
-- Name: idx_res_policy_policy; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_res_policy_policy ON public.resource_policy USING btree (policy_id);


--
-- TOC entry 4308 (class 1259 OID 21047)
-- Name: idx_res_scope_scope; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_res_scope_scope ON public.resource_scope USING btree (scope_id);


--
-- TOC entry 4319 (class 1259 OID 21048)
-- Name: idx_res_serv_pol_res_serv; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_res_serv_pol_res_serv ON public.resource_server_policy USING btree (resource_server_id);


--
-- TOC entry 4324 (class 1259 OID 21049)
-- Name: idx_res_srv_res_res_srv; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_res_srv_res_res_srv ON public.resource_server_resource USING btree (resource_server_id);


--
-- TOC entry 4329 (class 1259 OID 21050)
-- Name: idx_res_srv_scope_res_srv; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_res_srv_scope_res_srv ON public.resource_server_scope USING btree (resource_server_id);


--
-- TOC entry 4336 (class 1259 OID 21051)
-- Name: idx_rev_token_on_expire; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_rev_token_on_expire ON public.revoked_token USING btree (expire);


--
-- TOC entry 4339 (class 1259 OID 21052)
-- Name: idx_role_attribute; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_role_attribute ON public.role_attribute USING btree (role_id);


--
-- TOC entry 4143 (class 1259 OID 21053)
-- Name: idx_role_clscope; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_role_clscope ON public.client_scope_role_mapping USING btree (role_id);


--
-- TOC entry 4342 (class 1259 OID 21054)
-- Name: idx_scope_mapping_role; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_scope_mapping_role ON public.scope_mapping USING btree (role_id);


--
-- TOC entry 4345 (class 1259 OID 21055)
-- Name: idx_scope_policy_policy; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_scope_policy_policy ON public.scope_policy USING btree (policy_id);


--
-- TOC entry 4238 (class 1259 OID 21056)
-- Name: idx_update_time; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_update_time ON public.migration_model USING btree (update_time);


--
-- TOC entry 4363 (class 1259 OID 21057)
-- Name: idx_usconsent_clscope; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_usconsent_clscope ON public.user_consent_client_scope USING btree (user_consent_id);


--
-- TOC entry 4364 (class 1259 OID 21058)
-- Name: idx_usconsent_scope_id; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_usconsent_scope_id ON public.user_consent_client_scope USING btree (scope_id);


--
-- TOC entry 4350 (class 1259 OID 21059)
-- Name: idx_user_attribute; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_user_attribute ON public.user_attribute USING btree (user_id);


--
-- TOC entry 4351 (class 1259 OID 21060)
-- Name: idx_user_attribute_name; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_user_attribute_name ON public.user_attribute USING btree (name, value);


--
-- TOC entry 4356 (class 1259 OID 21061)
-- Name: idx_user_consent; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_user_consent ON public.user_consent USING btree (user_id);


--
-- TOC entry 4159 (class 1259 OID 21062)
-- Name: idx_user_credential; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_user_credential ON public.credential USING btree (user_id);


--
-- TOC entry 4367 (class 1259 OID 21063)
-- Name: idx_user_email; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_user_email ON public.user_entity USING btree (email);


--
-- TOC entry 4386 (class 1259 OID 21064)
-- Name: idx_user_group_mapping; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_user_group_mapping ON public.user_group_membership USING btree (user_id);


--
-- TOC entry 4389 (class 1259 OID 21065)
-- Name: idx_user_reqactions; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_user_reqactions ON public.user_required_action USING btree (user_id);


--
-- TOC entry 4392 (class 1259 OID 21066)
-- Name: idx_user_role_mapping; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_user_role_mapping ON public.user_role_mapping USING btree (user_id);


--
-- TOC entry 4368 (class 1259 OID 21067)
-- Name: idx_user_service_account; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_user_service_account ON public.user_entity USING btree (realm_id, service_account_client_link);


--
-- TOC entry 4377 (class 1259 OID 21068)
-- Name: idx_usr_fed_map_fed_prv; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_usr_fed_map_fed_prv ON public.user_federation_mapper USING btree (federation_provider_id);


--
-- TOC entry 4378 (class 1259 OID 21069)
-- Name: idx_usr_fed_map_realm; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_usr_fed_map_realm ON public.user_federation_mapper USING btree (realm_id);


--
-- TOC entry 4383 (class 1259 OID 21070)
-- Name: idx_usr_fed_prv_realm; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_usr_fed_prv_realm ON public.user_federation_provider USING btree (realm_id);


--
-- TOC entry 4395 (class 1259 OID 21071)
-- Name: idx_web_orig_client; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX idx_web_orig_client ON public.web_origins USING btree (client_id);


--
-- TOC entry 4352 (class 1259 OID 21072)
-- Name: user_attr_long_values; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX user_attr_long_values ON public.user_attribute USING btree (long_value_hash, name);


--
-- TOC entry 4353 (class 1259 OID 21073)
-- Name: user_attr_long_values_lower_case; Type: INDEX; Schema: public; Owner: peterhammans
--

CREATE INDEX user_attr_long_values_lower_case ON public.user_attribute USING btree (long_value_hash_lower_case, name);


--
-- TOC entry 4416 (class 2606 OID 21074)
-- Name: identity_provider fk2b4ebc52ae5c3b34; Type: FK CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.identity_provider
    ADD CONSTRAINT fk2b4ebc52ae5c3b34 FOREIGN KEY (realm_id) REFERENCES public.realm(id);


--
-- TOC entry 4402 (class 2606 OID 21079)
-- Name: client_attributes fk3c47c64beacca966; Type: FK CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.client_attributes
    ADD CONSTRAINT fk3c47c64beacca966 FOREIGN KEY (client_id) REFERENCES public.client(id);


--
-- TOC entry 4413 (class 2606 OID 21084)
-- Name: federated_identity fk404288b92ef007a6; Type: FK CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.federated_identity
    ADD CONSTRAINT fk404288b92ef007a6 FOREIGN KEY (user_id) REFERENCES public.user_entity(id);


--
-- TOC entry 4404 (class 2606 OID 21089)
-- Name: client_node_registrations fk4129723ba992f594; Type: FK CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.client_node_registrations
    ADD CONSTRAINT fk4129723ba992f594 FOREIGN KEY (client_id) REFERENCES public.client(id);


--
-- TOC entry 4432 (class 2606 OID 21094)
-- Name: redirect_uris fk_1burs8pb4ouj97h5wuppahv9f; Type: FK CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.redirect_uris
    ADD CONSTRAINT fk_1burs8pb4ouj97h5wuppahv9f FOREIGN KEY (client_id) REFERENCES public.client(id);


--
-- TOC entry 4458 (class 2606 OID 21099)
-- Name: user_federation_provider fk_1fj32f6ptolw2qy60cd8n01e8; Type: FK CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.user_federation_provider
    ADD CONSTRAINT fk_1fj32f6ptolw2qy60cd8n01e8 FOREIGN KEY (realm_id) REFERENCES public.realm(id);


--
-- TOC entry 4429 (class 2606 OID 21104)
-- Name: realm_required_credential fk_5hg65lybevavkqfki3kponh9v; Type: FK CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.realm_required_credential
    ADD CONSTRAINT fk_5hg65lybevavkqfki3kponh9v FOREIGN KEY (realm_id) REFERENCES public.realm(id);


--
-- TOC entry 4434 (class 2606 OID 21109)
-- Name: resource_attribute fk_5hrm2vlf9ql5fu022kqepovbr; Type: FK CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.resource_attribute
    ADD CONSTRAINT fk_5hrm2vlf9ql5fu022kqepovbr FOREIGN KEY (resource_id) REFERENCES public.resource_server_resource(id);


--
-- TOC entry 4451 (class 2606 OID 21114)
-- Name: user_attribute fk_5hrm2vlf9ql5fu043kqepovbr; Type: FK CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.user_attribute
    ADD CONSTRAINT fk_5hrm2vlf9ql5fu043kqepovbr FOREIGN KEY (user_id) REFERENCES public.user_entity(id);


--
-- TOC entry 4460 (class 2606 OID 21119)
-- Name: user_required_action fk_6qj3w1jw9cvafhe19bwsiuvmd; Type: FK CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.user_required_action
    ADD CONSTRAINT fk_6qj3w1jw9cvafhe19bwsiuvmd FOREIGN KEY (user_id) REFERENCES public.user_entity(id);


--
-- TOC entry 4420 (class 2606 OID 21124)
-- Name: keycloak_role fk_6vyqfe4cn4wlq8r6kt5vdsj5c; Type: FK CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.keycloak_role
    ADD CONSTRAINT fk_6vyqfe4cn4wlq8r6kt5vdsj5c FOREIGN KEY (realm) REFERENCES public.realm(id);


--
-- TOC entry 4430 (class 2606 OID 21129)
-- Name: realm_smtp_config fk_70ej8xdxgxd0b9hh6180irr0o; Type: FK CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.realm_smtp_config
    ADD CONSTRAINT fk_70ej8xdxgxd0b9hh6180irr0o FOREIGN KEY (realm_id) REFERENCES public.realm(id);


--
-- TOC entry 4425 (class 2606 OID 21134)
-- Name: realm_attribute fk_8shxd6l3e9atqukacxgpffptw; Type: FK CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.realm_attribute
    ADD CONSTRAINT fk_8shxd6l3e9atqukacxgpffptw FOREIGN KEY (realm_id) REFERENCES public.realm(id);


--
-- TOC entry 4409 (class 2606 OID 21139)
-- Name: composite_role fk_a63wvekftu8jo1pnj81e7mce2; Type: FK CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.composite_role
    ADD CONSTRAINT fk_a63wvekftu8jo1pnj81e7mce2 FOREIGN KEY (composite) REFERENCES public.keycloak_role(id);


--
-- TOC entry 4398 (class 2606 OID 21144)
-- Name: authentication_execution fk_auth_exec_flow; Type: FK CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.authentication_execution
    ADD CONSTRAINT fk_auth_exec_flow FOREIGN KEY (flow_id) REFERENCES public.authentication_flow(id);


--
-- TOC entry 4399 (class 2606 OID 21149)
-- Name: authentication_execution fk_auth_exec_realm; Type: FK CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.authentication_execution
    ADD CONSTRAINT fk_auth_exec_realm FOREIGN KEY (realm_id) REFERENCES public.realm(id);


--
-- TOC entry 4400 (class 2606 OID 21154)
-- Name: authentication_flow fk_auth_flow_realm; Type: FK CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.authentication_flow
    ADD CONSTRAINT fk_auth_flow_realm FOREIGN KEY (realm_id) REFERENCES public.realm(id);


--
-- TOC entry 4401 (class 2606 OID 21159)
-- Name: authenticator_config fk_auth_realm; Type: FK CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.authenticator_config
    ADD CONSTRAINT fk_auth_realm FOREIGN KEY (realm_id) REFERENCES public.realm(id);


--
-- TOC entry 4461 (class 2606 OID 21164)
-- Name: user_role_mapping fk_c4fqv34p1mbylloxang7b1q3l; Type: FK CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.user_role_mapping
    ADD CONSTRAINT fk_c4fqv34p1mbylloxang7b1q3l FOREIGN KEY (user_id) REFERENCES public.user_entity(id);


--
-- TOC entry 4405 (class 2606 OID 21169)
-- Name: client_scope_attributes fk_cl_scope_attr_scope; Type: FK CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.client_scope_attributes
    ADD CONSTRAINT fk_cl_scope_attr_scope FOREIGN KEY (scope_id) REFERENCES public.client_scope(id);


--
-- TOC entry 4406 (class 2606 OID 21174)
-- Name: client_scope_role_mapping fk_cl_scope_rm_scope; Type: FK CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.client_scope_role_mapping
    ADD CONSTRAINT fk_cl_scope_rm_scope FOREIGN KEY (scope_id) REFERENCES public.client_scope(id);


--
-- TOC entry 4422 (class 2606 OID 21179)
-- Name: protocol_mapper fk_cli_scope_mapper; Type: FK CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.protocol_mapper
    ADD CONSTRAINT fk_cli_scope_mapper FOREIGN KEY (client_scope_id) REFERENCES public.client_scope(id);


--
-- TOC entry 4403 (class 2606 OID 21184)
-- Name: client_initial_access fk_client_init_acc_realm; Type: FK CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.client_initial_access
    ADD CONSTRAINT fk_client_init_acc_realm FOREIGN KEY (realm_id) REFERENCES public.realm(id);


--
-- TOC entry 4408 (class 2606 OID 21189)
-- Name: component_config fk_component_config; Type: FK CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.component_config
    ADD CONSTRAINT fk_component_config FOREIGN KEY (component_id) REFERENCES public.component(id);


--
-- TOC entry 4407 (class 2606 OID 21194)
-- Name: component fk_component_realm; Type: FK CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.component
    ADD CONSTRAINT fk_component_realm FOREIGN KEY (realm_id) REFERENCES public.realm(id);


--
-- TOC entry 4426 (class 2606 OID 21199)
-- Name: realm_default_groups fk_def_groups_realm; Type: FK CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.realm_default_groups
    ADD CONSTRAINT fk_def_groups_realm FOREIGN KEY (realm_id) REFERENCES public.realm(id);


--
-- TOC entry 4457 (class 2606 OID 21204)
-- Name: user_federation_mapper_config fk_fedmapper_cfg; Type: FK CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.user_federation_mapper_config
    ADD CONSTRAINT fk_fedmapper_cfg FOREIGN KEY (user_federation_mapper_id) REFERENCES public.user_federation_mapper(id);


--
-- TOC entry 4455 (class 2606 OID 21209)
-- Name: user_federation_mapper fk_fedmapperpm_fedprv; Type: FK CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.user_federation_mapper
    ADD CONSTRAINT fk_fedmapperpm_fedprv FOREIGN KEY (federation_provider_id) REFERENCES public.user_federation_provider(id);


--
-- TOC entry 4456 (class 2606 OID 21214)
-- Name: user_federation_mapper fk_fedmapperpm_realm; Type: FK CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.user_federation_mapper
    ADD CONSTRAINT fk_fedmapperpm_realm FOREIGN KEY (realm_id) REFERENCES public.realm(id);


--
-- TOC entry 4396 (class 2606 OID 21219)
-- Name: associated_policy fk_frsr5s213xcx4wnkog82ssrfy; Type: FK CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.associated_policy
    ADD CONSTRAINT fk_frsr5s213xcx4wnkog82ssrfy FOREIGN KEY (associated_policy_id) REFERENCES public.resource_server_policy(id);


--
-- TOC entry 4449 (class 2606 OID 21224)
-- Name: scope_policy fk_frsrasp13xcx4wnkog82ssrfy; Type: FK CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.scope_policy
    ADD CONSTRAINT fk_frsrasp13xcx4wnkog82ssrfy FOREIGN KEY (policy_id) REFERENCES public.resource_server_policy(id);


--
-- TOC entry 4439 (class 2606 OID 21229)
-- Name: resource_server_perm_ticket fk_frsrho213xcx4wnkog82sspmt; Type: FK CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.resource_server_perm_ticket
    ADD CONSTRAINT fk_frsrho213xcx4wnkog82sspmt FOREIGN KEY (resource_server_id) REFERENCES public.resource_server(id);


--
-- TOC entry 4444 (class 2606 OID 21234)
-- Name: resource_server_resource fk_frsrho213xcx4wnkog82ssrfy; Type: FK CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.resource_server_resource
    ADD CONSTRAINT fk_frsrho213xcx4wnkog82ssrfy FOREIGN KEY (resource_server_id) REFERENCES public.resource_server(id);


--
-- TOC entry 4440 (class 2606 OID 21239)
-- Name: resource_server_perm_ticket fk_frsrho213xcx4wnkog83sspmt; Type: FK CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.resource_server_perm_ticket
    ADD CONSTRAINT fk_frsrho213xcx4wnkog83sspmt FOREIGN KEY (resource_id) REFERENCES public.resource_server_resource(id);


--
-- TOC entry 4441 (class 2606 OID 21244)
-- Name: resource_server_perm_ticket fk_frsrho213xcx4wnkog84sspmt; Type: FK CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.resource_server_perm_ticket
    ADD CONSTRAINT fk_frsrho213xcx4wnkog84sspmt FOREIGN KEY (scope_id) REFERENCES public.resource_server_scope(id);


--
-- TOC entry 4397 (class 2606 OID 21249)
-- Name: associated_policy fk_frsrpas14xcx4wnkog82ssrfy; Type: FK CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.associated_policy
    ADD CONSTRAINT fk_frsrpas14xcx4wnkog82ssrfy FOREIGN KEY (policy_id) REFERENCES public.resource_server_policy(id);


--
-- TOC entry 4450 (class 2606 OID 21254)
-- Name: scope_policy fk_frsrpass3xcx4wnkog82ssrfy; Type: FK CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.scope_policy
    ADD CONSTRAINT fk_frsrpass3xcx4wnkog82ssrfy FOREIGN KEY (scope_id) REFERENCES public.resource_server_scope(id);


--
-- TOC entry 4442 (class 2606 OID 21259)
-- Name: resource_server_perm_ticket fk_frsrpo2128cx4wnkog82ssrfy; Type: FK CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.resource_server_perm_ticket
    ADD CONSTRAINT fk_frsrpo2128cx4wnkog82ssrfy FOREIGN KEY (policy_id) REFERENCES public.resource_server_policy(id);


--
-- TOC entry 4443 (class 2606 OID 21264)
-- Name: resource_server_policy fk_frsrpo213xcx4wnkog82ssrfy; Type: FK CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.resource_server_policy
    ADD CONSTRAINT fk_frsrpo213xcx4wnkog82ssrfy FOREIGN KEY (resource_server_id) REFERENCES public.resource_server(id);


--
-- TOC entry 4437 (class 2606 OID 21269)
-- Name: resource_scope fk_frsrpos13xcx4wnkog82ssrfy; Type: FK CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.resource_scope
    ADD CONSTRAINT fk_frsrpos13xcx4wnkog82ssrfy FOREIGN KEY (resource_id) REFERENCES public.resource_server_resource(id);


--
-- TOC entry 4435 (class 2606 OID 21274)
-- Name: resource_policy fk_frsrpos53xcx4wnkog82ssrfy; Type: FK CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.resource_policy
    ADD CONSTRAINT fk_frsrpos53xcx4wnkog82ssrfy FOREIGN KEY (resource_id) REFERENCES public.resource_server_resource(id);


--
-- TOC entry 4436 (class 2606 OID 21279)
-- Name: resource_policy fk_frsrpp213xcx4wnkog82ssrfy; Type: FK CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.resource_policy
    ADD CONSTRAINT fk_frsrpp213xcx4wnkog82ssrfy FOREIGN KEY (policy_id) REFERENCES public.resource_server_policy(id);


--
-- TOC entry 4438 (class 2606 OID 21284)
-- Name: resource_scope fk_frsrps213xcx4wnkog82ssrfy; Type: FK CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.resource_scope
    ADD CONSTRAINT fk_frsrps213xcx4wnkog82ssrfy FOREIGN KEY (scope_id) REFERENCES public.resource_server_scope(id);


--
-- TOC entry 4445 (class 2606 OID 21289)
-- Name: resource_server_scope fk_frsrso213xcx4wnkog82ssrfy; Type: FK CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.resource_server_scope
    ADD CONSTRAINT fk_frsrso213xcx4wnkog82ssrfy FOREIGN KEY (resource_server_id) REFERENCES public.resource_server(id);


--
-- TOC entry 4410 (class 2606 OID 21294)
-- Name: composite_role fk_gr7thllb9lu8q4vqa4524jjy8; Type: FK CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.composite_role
    ADD CONSTRAINT fk_gr7thllb9lu8q4vqa4524jjy8 FOREIGN KEY (child_role) REFERENCES public.keycloak_role(id);


--
-- TOC entry 4453 (class 2606 OID 21299)
-- Name: user_consent_client_scope fk_grntcsnt_clsc_usc; Type: FK CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.user_consent_client_scope
    ADD CONSTRAINT fk_grntcsnt_clsc_usc FOREIGN KEY (user_consent_id) REFERENCES public.user_consent(id);


--
-- TOC entry 4452 (class 2606 OID 21304)
-- Name: user_consent fk_grntcsnt_user; Type: FK CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.user_consent
    ADD CONSTRAINT fk_grntcsnt_user FOREIGN KEY (user_id) REFERENCES public.user_entity(id);


--
-- TOC entry 4414 (class 2606 OID 21309)
-- Name: group_attribute fk_group_attribute_group; Type: FK CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.group_attribute
    ADD CONSTRAINT fk_group_attribute_group FOREIGN KEY (group_id) REFERENCES public.keycloak_group(id);


--
-- TOC entry 4415 (class 2606 OID 21314)
-- Name: group_role_mapping fk_group_role_group; Type: FK CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.group_role_mapping
    ADD CONSTRAINT fk_group_role_group FOREIGN KEY (group_id) REFERENCES public.keycloak_group(id);


--
-- TOC entry 4427 (class 2606 OID 21319)
-- Name: realm_enabled_event_types fk_h846o4h0w8epx5nwedrf5y69j; Type: FK CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.realm_enabled_event_types
    ADD CONSTRAINT fk_h846o4h0w8epx5nwedrf5y69j FOREIGN KEY (realm_id) REFERENCES public.realm(id);


--
-- TOC entry 4428 (class 2606 OID 21324)
-- Name: realm_events_listeners fk_h846o4h0w8epx5nxev9f5y69j; Type: FK CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.realm_events_listeners
    ADD CONSTRAINT fk_h846o4h0w8epx5nxev9f5y69j FOREIGN KEY (realm_id) REFERENCES public.realm(id);


--
-- TOC entry 4418 (class 2606 OID 21329)
-- Name: identity_provider_mapper fk_idpm_realm; Type: FK CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.identity_provider_mapper
    ADD CONSTRAINT fk_idpm_realm FOREIGN KEY (realm_id) REFERENCES public.realm(id);


--
-- TOC entry 4419 (class 2606 OID 21334)
-- Name: idp_mapper_config fk_idpmconfig; Type: FK CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.idp_mapper_config
    ADD CONSTRAINT fk_idpmconfig FOREIGN KEY (idp_mapper_id) REFERENCES public.identity_provider_mapper(id);


--
-- TOC entry 4462 (class 2606 OID 21339)
-- Name: web_origins fk_lojpho213xcx4wnkog82ssrfy; Type: FK CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.web_origins
    ADD CONSTRAINT fk_lojpho213xcx4wnkog82ssrfy FOREIGN KEY (client_id) REFERENCES public.client(id);


--
-- TOC entry 4448 (class 2606 OID 21344)
-- Name: scope_mapping fk_ouse064plmlr732lxjcn1q5f1; Type: FK CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.scope_mapping
    ADD CONSTRAINT fk_ouse064plmlr732lxjcn1q5f1 FOREIGN KEY (client_id) REFERENCES public.client(id);


--
-- TOC entry 4423 (class 2606 OID 21349)
-- Name: protocol_mapper fk_pcm_realm; Type: FK CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.protocol_mapper
    ADD CONSTRAINT fk_pcm_realm FOREIGN KEY (client_id) REFERENCES public.client(id);


--
-- TOC entry 4411 (class 2606 OID 21354)
-- Name: credential fk_pfyr0glasqyl0dei3kl69r6v0; Type: FK CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.credential
    ADD CONSTRAINT fk_pfyr0glasqyl0dei3kl69r6v0 FOREIGN KEY (user_id) REFERENCES public.user_entity(id);


--
-- TOC entry 4424 (class 2606 OID 21359)
-- Name: protocol_mapper_config fk_pmconfig; Type: FK CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.protocol_mapper_config
    ADD CONSTRAINT fk_pmconfig FOREIGN KEY (protocol_mapper_id) REFERENCES public.protocol_mapper(id);


--
-- TOC entry 4412 (class 2606 OID 21364)
-- Name: default_client_scope fk_r_def_cli_scope_realm; Type: FK CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.default_client_scope
    ADD CONSTRAINT fk_r_def_cli_scope_realm FOREIGN KEY (realm_id) REFERENCES public.realm(id);


--
-- TOC entry 4433 (class 2606 OID 21369)
-- Name: required_action_provider fk_req_act_realm; Type: FK CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.required_action_provider
    ADD CONSTRAINT fk_req_act_realm FOREIGN KEY (realm_id) REFERENCES public.realm(id);


--
-- TOC entry 4446 (class 2606 OID 21374)
-- Name: resource_uris fk_resource_server_uris; Type: FK CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.resource_uris
    ADD CONSTRAINT fk_resource_server_uris FOREIGN KEY (resource_id) REFERENCES public.resource_server_resource(id);


--
-- TOC entry 4447 (class 2606 OID 21379)
-- Name: role_attribute fk_role_attribute_id; Type: FK CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.role_attribute
    ADD CONSTRAINT fk_role_attribute_id FOREIGN KEY (role_id) REFERENCES public.keycloak_role(id);


--
-- TOC entry 4431 (class 2606 OID 21384)
-- Name: realm_supported_locales fk_supported_locales_realm; Type: FK CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.realm_supported_locales
    ADD CONSTRAINT fk_supported_locales_realm FOREIGN KEY (realm_id) REFERENCES public.realm(id);


--
-- TOC entry 4454 (class 2606 OID 21389)
-- Name: user_federation_config fk_t13hpu1j94r2ebpekr39x5eu5; Type: FK CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.user_federation_config
    ADD CONSTRAINT fk_t13hpu1j94r2ebpekr39x5eu5 FOREIGN KEY (user_federation_provider_id) REFERENCES public.user_federation_provider(id);


--
-- TOC entry 4459 (class 2606 OID 21394)
-- Name: user_group_membership fk_user_group_user; Type: FK CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.user_group_membership
    ADD CONSTRAINT fk_user_group_user FOREIGN KEY (user_id) REFERENCES public.user_entity(id);


--
-- TOC entry 4421 (class 2606 OID 21399)
-- Name: policy_config fkdc34197cf864c4e43; Type: FK CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.policy_config
    ADD CONSTRAINT fkdc34197cf864c4e43 FOREIGN KEY (policy_id) REFERENCES public.resource_server_policy(id);


--
-- TOC entry 4417 (class 2606 OID 21404)
-- Name: identity_provider_config fkdc4897cf864c4e43; Type: FK CONSTRAINT; Schema: public; Owner: peterhammans
--

ALTER TABLE ONLY public.identity_provider_config
    ADD CONSTRAINT fkdc4897cf864c4e43 FOREIGN KEY (identity_provider_id) REFERENCES public.identity_provider(internal_id);


--
-- TOC entry 4698 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: pg_database_owner
--

GRANT ALL ON SCHEMA public TO peterhammans;


-- Completed on 2026-01-20 11:43:40 GMT

--
-- PostgreSQL database dump complete
--

\unrestrict sb6WPglJ8kEk8s0EpQqkBm4ATiRwifT2cE0euzThcXemPEsCmc7IwKLzhKUzfpg

