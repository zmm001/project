�}�� r K	  }��2��a���a	����px�<�t����\��L̷s�4(4\��O>1���ۄg�J���jH'���)�/�o��IZ]��BV���`?��f��gmua���B틑��ƅ�Pu8#�S���v%���}Q�[�#�qu�a��5]��F��X�B�\B����P��g�y;VC�i�xE`nn��E���<l�oT����N���G�m1�����:3��l�*~� ��������'��Fq����F��{���JQ_#�����i����{�	<�7�#H������ ѣ/��<�w��d�w@�+��F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�ns>
        public static string GetPicReplace(this object o, string oldPicURL, string NewPicURL)
        {
            if (o == null)
            {
                return "";
            }
            return o.ToString().Replace(string.IsNullOrEmpty(oldPicURL) ? "http://cpic7.edushi.com/" : oldPicURL, string.IsNullOrEmpty(NewPicURL) ? Common.GetConfigString("CdnPicUrl") : NewPicURL);
        }
    }
}
