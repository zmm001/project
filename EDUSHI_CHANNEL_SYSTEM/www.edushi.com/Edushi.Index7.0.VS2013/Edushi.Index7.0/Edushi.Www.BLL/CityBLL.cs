�}h� r U	  �"�� ����a	��� �#A���}�l����f�5��6Y����5"`/�5�>[Dv^|�9�]>��0o��6�f�Nd���|T����Y�`_'���]�RAڳq�Q�Y�X��#������,��4HL���|��^���11t�h'�M�pR�7J�JA�Zh�h`,��IC�t!��%� D]��ߞ��2p�V6 ����(7�f��h�j�,p�<�[Y���JS]��@�h��gĘ�}����Z��@8�� �O�!�����cU��<fH�#H������ ѣ/��<�w��d�w@�+��F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�lD&�{�P*�A�k?"-!ج�|Ѕ��n[|�p�q��{�t6���L���X��O7��Ŷ��&D�`���r}����;����5�4Coe���Ml2z�"���Pk��������%m׷E���Xv�F���f�2	��4�R���l(��J�yH4�Z�rM�"\�:�~���`jy�)�r�%���A@������#�*ã�c�A_Pb��nI \�yVq'�Vlp,��鸺-�<�`�r�,�K�sH3�=���WO��IPh�3�b_z���)����4yD�K�@4QCj��1	�� "G6���n,�VS'r�I��1I\�<B������*$�?F��+�)'�ȁ�{�@����牋9���x]���8+^;J����0<�"��"��'('[D�)̙�ty�9�V�ȉ�ь��-?��5Ԅ?�r���否GW�S��a�l��G�[dơ���򈶤j��7ߘ��-�������]���7�)���J!���9{
            return CacheConfigHelper.GetDataFromCache(DataEnum.PcWwwCache.ProvinceListCache, (ccm) => { return ccm.CacheKey; }, () =>
            {
                return new CityDAL().GetProvinceData();

            }) as DataTable;
        }
        #endregion
    }
}
