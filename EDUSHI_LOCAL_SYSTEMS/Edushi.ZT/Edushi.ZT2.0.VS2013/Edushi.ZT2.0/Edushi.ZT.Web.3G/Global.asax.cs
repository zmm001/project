�}�� r +"  ��#�_�C��a	��S��px�<�t����\��L̷s�4(4\��O>1���ۄg�J���;j8m�{��t�i��֍K�x�ņ���3}���m����^d�i߭�(F�PZ��c&�kZ�{�#��:1A90sS0�Y�z�ϱ�n���V��^��o��`��G=pH�?�3N�O^a���xz�Zb0zt����,��V�8��u�H;V�e�r�ɩ�	l\��W�I�w�{�s>�V)���5��ܿʜgc�-� �q����$G�:��H�*8��] �=�Z��7����6&��t�	�tjU�iJ8�"2�|�%�hQ���d�S��
n�JVyhlƋ��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�l(ʹ��_�6r���TTU��ǒJ�����	3�*�#m}�CC=�ţl����@l��%.A�23|�zOTn`�߸��bw��)"�����ĳ�x�XA+�Y����*�D�+�� �$����O׍M�EL�p*�K�ko�z�@w��;��/�.5��8ñ�m���������v��O�t�5Zg[�M�՞<�v]�SH����52-=W�:�+3�7�ʳcp���) hNi��+o����1��7�궭gy��#���1z�+DK~�/]*E
�&c#���b�}�G"�H��e��>]7�t� :���ľ�y��*��4�g��F�K��J��qU5��;�]Ek��x:�lxSi��p���0�)�j���2���^�(V�ݾ� ����l��=(�����(73�g���*j���g�h'	��G%kn��%E��o V��;�u7������@�����0��#����R۸���M�Zp!�g�Y�l��ct sender, EventArgs e)
        {
            Exception ex = HttpContext.Current.Server.GetLastError();
            string ip = HttpContext.Current.Request.UserHostAddress;
            string url = HttpContext.Current.Request.Url.ToString();
            LogOperate.WriteErrorLog("客户机IP:" + ip + "\r\n错误地址:" + url + "\r\n异常信息:" + Server.GetLastError().Message + "", ex);
        }
    }
}