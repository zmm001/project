�}�� r 8!  �4<��]S���a	����px�<�t�=��D<��3��\�����WiD*�L�R�<�Η�tK���%�(��>E�Z�D�Mb�|Rܿ~[N:w%�2�rz��7#*θ b6Q����ʈP�ï��8����E�n��t��D�������qY5���1s!�V�	�����aڷz�>�7�? �k�n�z���N�ӛv� ׵��u�Z6�ӱD�.��_� �Usw"�S|�߹�"Z��5g�"�S�CQ�*�c������[[�mӶ���H�#H������ ѣ/��<�w��d�w@�+��F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�l�&^��ɪ���>�oa�:���nPwA/j�}���L�ѝ����]�`z�z�+�Q�$-����Be�fRnR(��8����]��c��aŰ=#�у�M��4oO)�\����#����Ut�	��mį`��j̏o�}��gJ��[��o�eH3/����)UgV'���|�T��j��;4��5��]C�Mi7���K��)���p��jtQkU�r�Iq-�8cNM��@�:i�}���?��m�yk�V,µ��)�CHT��0�,��F�����[�ޣ�C9�"�M�?Q.nyw�ҝrT"_�f��j�y��z[
`5'��n�j@�ъ�	Ĳ
�!þG�t	��!��l?R�PH0@DB.Ҝ�����}�Sb#���B9z��W���D�n�ۀ�ԭ��Pt���yL����Y@R�������`�nNq!�J�bAs:�@1��� ]�'/� 4]�q���ՕI~#ʖ[6��b�,��9=�d ��-y = new QueryDocument();
            query.Add("IT_State", 1);

            #region 老的查询条件模式
            //IMongoQuery query = null;
            //query = Query.And(
            //         Query.EQ("IT_State", 1)
            //     );
            #endregion

            return _mongoCollection.FindAs<ZiXunInfoTypeModel>(query).SetSortOrder(sort).ToList();
        }
        #endregion
    }
}
