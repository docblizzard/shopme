PGDMP  .    !                {            shopme    16.1    16.1 	    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16397    shopme    DATABASE     y   CREATE DATABASE shopme WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'French_France.1252';
    DROP DATABASE shopme;
                postgres    false            �            1259    16423    users    TABLE     �   CREATE TABLE public.users (
    username character varying(50) NOT NULL,
    email character varying(50) NOT NULL,
    pwd character varying(255) NOT NULL,
    id character varying(100) NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false            �          0    16423    users 
   TABLE DATA           9   COPY public.users (username, email, pwd, id) FROM stdin;
    public          postgres    false    215   �                  2606    16431    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public            postgres    false    215                       2606    16427    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    215                       2606    16429    users users_username_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);
 B   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key;
       public            postgres    false    215            �   �  x�m��r�0��y�let���`L�pOB�]1�ƀ�`?}���t2ٜ���_Z�}���Vi�l�o�>-��Zg�?��)��h��&�")(#�9
�"�e��uӨ�ʣۥj��z��qwX�!x7�_����K�;��Ό�a���~�,I�j��E65qWU	�V��"�#��n� �k���J��_�l�&����/�����~���/���<��aPt��� V��lqP�8�T��a$���K�t&�rirc���O������T�Z��H�⺊�N�!<�|�������܃��v��a���$1��y��� Re!��"$Z�.N�&�\za�z���G�7�>i�`S��	�yj�t���=��q[Mڝ�ۦp�a �F�Yh�,�F+ �G��Vr�d��G;�ƿF�!;I9�t���R�s=}�;�^��,�t�I��ϼ77�6���-��{��b�*�֔b�s�aL�����s�"�'�cM��|���0��t.�2��ҡ��v֩}�K��d�iV�xmfy��3JY�0�
@�_h+80^F�J�	W��+��mܻ�j������J6Nm���=�ʧ��;���?=��~^�C��V��X$g]�H9 ��y���ƶ~��V��'"     