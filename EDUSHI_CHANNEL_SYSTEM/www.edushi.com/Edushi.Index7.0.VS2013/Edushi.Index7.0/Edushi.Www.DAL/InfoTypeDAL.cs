�}�� r |	  %��ʝ��k��a	��
��px�<�t����\��L̷s�4(4\��O>1���ۄg�J���jH'�^L��;�Um,���0�4[fm'���Ԭ��\���T��Sb.�9g���_�8F* pRP�~��G��3,���G�q�I��ޙ���a7�J�}�a@fR\zS4pء�(z���FD{0�Ĵ���R�z3zi6)e*˶D�YJ�p�$w^[�/&Q��k��	���`h�����;�p8�K�ƭv{
�?�K�m��
|Fp*+H���� ѣ/��<�w��d�w@�+��F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�l�&5�����˫�S+���e��b��b��-P�k{FN��K���D**%BYU�;L�	a��I�	Rg;υ��:�O� ���
o�=�V�426s�D�W)s��<���]��ӆ�{���XF��<a���|�f��d[i�RbT��r�Q>6��*Wz��l�R�I2�)���fX���������|:��~�Ҙ���|���Z�b�Ds� "/����H��Bc�i�Õ1�6�k����P:iv�*2���y�f|�����!jʌ�������p�x��v�~���4��\�< ����ȯ'ը�;Ó�h�w�K���n>��[k��3,>����+�hx/��,�<8J�T:��Mk�Q���%1z/8;]n������F#ɹ�ᥗ���G��d�]5�����19;�FF�f+�6���3�G�xJ����e�K�ŌH��<����;�[��TE���5~�Z?w��^����%���,w�|.
з��xl�y.Add("IT_State", 1);

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
