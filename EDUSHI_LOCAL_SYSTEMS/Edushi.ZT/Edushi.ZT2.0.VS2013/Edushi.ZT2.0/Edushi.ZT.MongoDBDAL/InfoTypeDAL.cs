�}� r "  fL��P����a	���#^���}ꭱ���f�2��G����CsqpMGwnJ�����X،DQ�p(�+���iC %��p�
/��OW#����uOc-+Ky�9�o�s 
��$m��oA��=ٌ��I��`p,eⰑ)�䩯�_H���Rф��e�7������>v'��މ"yP�D��s����*��a�|
�2��#"&�d�~^|~�ً�ʕC'��b����N{i�_n���
�	}2�6*� ��?��=j'׋P&55mﵡĞi��15S̘�#H������ ѣ/��<�w��d�w@�+��F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�l�'X���O{4���l"+7��3w�-������.%'-�-o-A�Ʊ+�_i���������O<b�h+�'��o�r����6�rr!����hlRa��<Z�GSrk*�9��LO�>c���8G�8+A�T.��E}�(>����s�!#�+qY� �G�
��u��9s���z'�;��)7Q����wJn�?�UV���cz��]zcs�EG8E�Ο�3=T���辚�K��9���Ə���;{Ոd�x��y�M���<}�6EIm�\����g��4�b͢�6S�%�ћ���oK>^+��[E3t164��F�T/o^h�*��F��t�R{ʊ>)2J�7p�����s+>g��t���B�1L�J��� �yIC��;�@d��w�!s"���}���U宝�ݤ�ǽu��r�m}�?���o�b.!�Ndt�I�gy�n���\�1�a����s�Ѵ`��,��p��Ël�T�$Ӳ{{���5p{�vbq��?�s��%���e1��<A�ry = new QueryDocument();
            query.Add("IT_State", 1);

            #region 老的查询条件模式
            //IMongoQuery query = null;
            //query = Query.And(
            //         Query.EQ("IT_State", 1)
            //     );
            #endregion

            return _mongoCollection.FindAs<InfoTypeModel>(query).SetSortOrder(sort).ToList();
        }
        #endregion
    }
}
