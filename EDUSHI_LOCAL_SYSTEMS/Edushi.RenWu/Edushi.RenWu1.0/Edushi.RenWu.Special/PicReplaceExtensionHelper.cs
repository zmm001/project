�}Z� r ?!  ��ΟS�à��a	����px�<�t����\��L̷s�4(4\��O>1���ۄg�J���jH'���)�/�o��IZ]��BV�ِ;T�ɐ��BVLd	!�Eu��Xr�f�	hS�	�}d�_O�w�G�r�2��~��^-EXu�IڃⳊǂg�e`�S���]�����du�L-��3�ڿ�����Fy��x�I
�Ng�Ԋ�b3��Su( .�1f�Tn-3�)F��2T����&�mߴwvs9�+:���
J�cM�����F������� ѣ/��<�w��d�w@�+��F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�</returns>
        public static string GetPicReplace(this object o, string oldPicURL=null,string NewPicURL=null)
        {
            if (o == null)
            {
                return "";
            }
            return o.ToString().Replace(string.IsNullOrEmpty(oldPicURL) ? "http://cpic7.edushi.com/" : oldPicURL, string.IsNullOrEmpty(NewPicURL) ? Common.GetConfigString("CdnZxPicUrl") : NewPicURL);
        }
    }
}
