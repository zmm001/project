�}�� r +   �-��"���a	����px�<�t����\��L̷s�4(4\��O>1���ۄg�J���;j~ġ@�7ͭ����%Ωm��&H߉!fiTtdM��eydp����$�H|'㼓y�k��kה�wQ.���Xz�����Q��\�,e2��=�h@�*�6�K*�(�D �Uv��* uڰ-� �i���Y.�2�p�Bm0���/
�&�_��&`�I��f~?�;��utH^�������m����U�8�+w�D�O�1�G4 ���m�#H������ ѣ/��<�w��d�w@�+��F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�ns>
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