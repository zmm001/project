�}F� r 	  ғ��[J���a	����px�<�t����\��L̷s�4(4\��O>1���ۄg�J���jH'���)�/�o��IZ]��6oZ��qǼR��8 ���y	��8��Q��y\Q�
c���ek���^h�9����DʡrVsO�Gjk=��`�&�x�J{fkm�!�s�T�:�H(F�
���Z� GK]Q𝧍�g�R�� SE��ں5�`6������ӟ���j��C�����?]*
6�ki�,ʰ��rE���rlU
�dwH%]������� ѣ/��<�w��d�w@�+��F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�eturns>
        public static string GetPicReplace(this object o, string oldPicURL, string NewPicURL)
        {
            if (o == null)
            {
                return "";
            }
            return o.ToString().Replace(string.IsNullOrEmpty(oldPicURL) ? "http://cpic7.edushi.com/" : oldPicURL, string.IsNullOrEmpty(NewPicURL) ? System.Configuration.ConfigurationManager.AppSettings["CdnPicUrl"] : NewPicURL);
        }
    }
}
