�}� r �  �c���ۍ��a	���+@>�w|꯽*>��S������ \��Su��ze�������Jg5l�F��[2"*vN�Yo�^��.����秞�s�H?qF� ���xFX��_�@��6���(�4������[k���ouV���PfZ]�i�fG4_�T�^mZ&���ᮼk��
꫏vb�)�X왘��᧜���r�:���uY�IȘ��F!��xd�xȸd�\��c���3�}��̑E1�QS4c���:�K����H����{N}�r������ ѣ/��<�w��d�w@�+��F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�returns>
        public static string GetPicReplace(this object o, string oldPicURL, string NewPicURL)
        {
            if (o == null)
            {
                return "";
            }
            return o.ToString().Replace(string.IsNullOrEmpty(oldPicURL) ? "http://cpic7.edushi.com/" : oldPicURL, string.IsNullOrEmpty(NewPicURL) ? "http://npic7.edushi.com/" : NewPicURL);
        }
    }
}
