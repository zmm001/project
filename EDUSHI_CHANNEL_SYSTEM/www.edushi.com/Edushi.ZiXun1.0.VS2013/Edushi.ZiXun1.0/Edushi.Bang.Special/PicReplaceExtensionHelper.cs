�}Z� r 6
  <ʍ���h��a	��
��px�<�t����\��L̷s�4(4\��O>1���ۄg�J���jH'���)�/�o��IZ]��BV�9�?T��	HT�t5{|P�X���d1h3�i�6�w�\��`x2zB��Mެ"�GSs>�鷀���4�B��� -gm�C׌�~�ٚ5jk�+�)����#C�� h�ݱ�A���'�&؎HD}�C�-?�|�7G	�]�	mŰ���0��]XV�Κ&Z�Wq���%ؑ��H�g��旐H��-�� ѣ/��<�w��d�w@�+��F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�ns>
        public static string GetPicReplace(this object o, string oldPicURL, string NewPicURL)
        {
            if (o == null)
            {
                return "";
            }
            return o.ToString().Replace(oldPicURL, NewPicURL);
        }
    }
}
