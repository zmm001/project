�}�� r �  n%S(���R��a	���#_>���l=�v8%W��C��h�(D���Ƴf[}�s^e��f^�
T�|�rM�4	��4���z��o�� 
��Su���v�XV�F)�U)���ܟU����y�$fC�5!Q[��ub�	.~�vp6�f�F0%�Y����9n�3$�~X)C��	������@�e�ݩ�v��I8�f�5bd�����*վܐ��em ����5�g��&<ěs�|g�qя_]��ޱ�4$ڐ�������z2yЌR��VH��z}.��A�v�?� ѣ/��<�w��d�w@�+��F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�lD"�Q�W�(��lx�3��7��r�u�='���0MF�&�;Q-ΐilnc�C����νtp�U�����*���=��5��`��:4��J���̏��f,�<z�a<��SJN�M �}��A���A�a��K�q5G@a�ӱ�t2�6���&N~�F��wS����3d
"�Md�㨙��_ȣ.Yg��
�摔2gf�ܞ�i��%�z�f�נ��6���l���ur�(Պ
+�
;M�|�n|M6W%X�8��M��N���t[_@��U����('K�^�3#$x�|8=yf���dN��Sp�cT8S�����r���mzp[�$����uu����'X_]��ۨ�}��ޛ�U}�7],qHvE���w�놀+�Qθ��)�A�(EZ�����A��}V�/��|��a���t�Ƌ��.Ģ�
.N�z�i��Z��s8����2# �V��w>#�C	��Mc�tHn�ߣ�R^����	��
`��l����-��E��1����lD[.�F#��|�)�U�"���d2ou�ѷ H2N�9q7��|r��lS ��V�r���8���hZ����ʗt�h QTB���=jux�����Q�����}����'�M#��^�`Q��g�s�G�C��uH��ܧr��1`ѿ";şO���ɳ��,�L��͉��=���?���?��%OMH%3�w��MΒVO����e���'m�슏X�n%L��{'|h>���.pK��$	Y��Bf���I�~���`�ߧ{�X���Jh]�w��(=m��f�<y^�\E�����KB��zqy�B��R���Q�Kȿ6�_m��
��d�]g����;���NW�0�g]�{���qgpk���Q�f��x��F�$3"������f~𯔦��i��>Ud���5V86��k|�./( �Km�ǐ���������;UWqW9D:��4���`�"���{�x��6]�Ƃ�a�����6�q·�&���nץ�7h��ram>
        /// <returns></returns>
        public List<UserFavoritesModel> GetUserFavoritesList(string UF_UserID, string UF_Type, string UF_Source_ID, int pageIndex, int pageSize, ref int iRecordCount, bool isNeedReturnData = false, bool isNeedCount = false)
        {
            return _userFavoritesDal.GetUserFavoritesList(UF_UserID, UF_Type, UF_Source_ID, pageIndex, pageSize, ref iRecordCount, isNeedReturnData, isNeedCount);
        }
        #endregion
    }
}
