�}'� r )
  ��ކ��k8��a	���#_8��}ꬽ�qx7.�F����Y���X ���='��k���=�\O��=�1&\U7�*s��Qk��
�W��<���ʱ�G�*Xz?0��� ��I �����M��X��l��J阯���坄�@�趄���!"j6����{H�%r8qBHȰEn�&�Lʅj�kP]!,��F�6��d�?$�r�����cIr�q��P�́��� ��/�Oܞқ9"PG���[X2��C~��'H>fH�#H������ ѣ/��<�w��d�w@�+��F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�l�(p>.f9̣�7�/G��%�PYO����������8��1 ����LFF�5J(�;����i\P�EJ���d`7I���.J�4�@�s�˨��R�ZEl���B�k6��˕�gAc�I���l�sU��ث�ojW��������CN�Ҥ#4�|]���Ph5����7Q����o�Hb���$�R/IѪڂ�ȩC�@�/_U��-�p�ԉ^'��:��S^38Bɓ�7�M� ]
��4`�������Ԋa�����+Fu*��o��$?��"@��
?�F�	�Jtd�A�~�����_����R�m(6�J8 ����y��g��ᚽL��e��=Lĕ}�K�zn6+���S:�I�y��4�D����)=������(�|�Dd�-���<�@��\|����7~�g����g��D5����]K��Q��7ٌs��┨puD�<�>w� &�4��.�>�Bs�����KYW� ��ǖ,�µ���1W����¾�.�ҕ�nt query = new QueryDocument();
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
