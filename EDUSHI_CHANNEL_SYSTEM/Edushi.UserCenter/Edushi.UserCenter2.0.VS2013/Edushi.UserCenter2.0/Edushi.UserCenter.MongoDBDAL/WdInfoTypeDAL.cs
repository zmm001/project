�}�� r   �°hX� ��a	���+_>���=�v8gyq����F,�9[����hT�D��T�?J�zm]P���jr�
Gn?�sQ�U@���.hyc�*O�G�ob3N)4�d����� �M9�����Ӄ6Ce�wœԮ/r�a���	��R�׋S\��E�@״�3�hM��/l8��^X��=T�@�%�����vx,��_p5�S���S^b�Q F�f�X-���Ό�y�}��c{��,�Q�bdZ1O��d
3�ԍ��}o���#9kz�����%����C�e=v���Iw@�+��F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�lD&�{�P*���m>�;��)P8A��e�D2l�[͝#��=���B�R���-{5*����/,:%���]f@�1��Vb7��CeެQ�\DҸ<�&t�_�t(c�:30�����w���_��]1�/v.N���hg��4�zoyy(���8D4�sXU�;f��<����Mls�#�)�\߂�/W�Һ����z\�$��m�t�T\[��Cc \�yVq'�Uwsk����5��<�<�K��hf�nH}�q�r@��%�rP�|)}���)�����4��/�����ǖ���f	��sv[Aߏ�(�S[|�Uʮ@G�B������6^\p�@"��7�{b����(�������lƵ�n�����N�{7,E~`x����0)�!����f{.t�V�ʎ<6�9�V�ȉ�ь��-?��5Ԅ?�r���否GW�S��a�l��G�[dơ���򈶤j��7ߘ��-�������]���7�)���J� �'�9", 1 } };

            #region 老的查询条件模式
            //IMongoQuery query = null;
            //query = Query.And(
            //         Query.EQ("IT_State", 1)
            //     );
            #endregion

            return mongoCollection.FindAs<WdInfoTypeModel>(query).SetSortOrder(sort).ToList();
        } 
        #endregion
    }
}
