�}�� r 5!  �\$>�p���a	��� ��px�<�t����\��L̷s�4(4\��O>1���ۄg�J���jH'�^L��;���_��"�@��]���P�$�/��d�bˤW������q<;*�A���1o�iD��<�����,7�����f�C���O�c�-�� �<�epCr)e[��4G������uWG۰ؤ�N�/De��7ס��i&�I��)(�ᷳw���:~��r�����_U��w~�Q/�bM��bF�@�K��<fH�#H������ ѣ/��<�w��d�w@�+��F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�l�)v���~h+����5_+J��X��gc7�D!S�Q�шT	oN��)T�+���a�5�t�>����)?��cB�u�������U���(a߅}���Q�O�� 1��B�ɖ�������L��'=����c���^����B���f����!���t�3��rbtH��=->]�?��B�:��UВzDf�O�gJ���P��9�ǟ5ڒ�e}�I�U��a��y��iѮ�ɑ�C�����
Oƈ��K
x�Na�m/t���<�X�����Ϣ��oJ���y^�줳q�zf��ssc �j~9?c�\+�O��L �eYM�>�y�bׁHz���M%�N�y���d�oC��rƩM�/��~�纛<��n%wb�k�sX�k�4�s]�ekJ��lA�-2Z��uaWڞ@������Omʡ�� X�Cx��? W4�/��w�'��Z/L���l��"���\�@!��fO��2)��XC�>D��(?�)f\el>();
            }
            QueryDocument query = new QueryDocument();
            query.Add("IT_State", 1);

            return _mongoCollection.FindAs<RenWuInfoTypeModel>(query).SetSortOrder(sort).ToList();
        }
        #endregion
    }
}
