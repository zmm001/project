�}�� r �  ��e
8�#���a	��R��_B�v����3�+��s�鑦��=�)_<%vb;*��RJ���^nrOG����M��П�ѬԱ�o��C��	$(x������ߋT���Q�_��}�&�沫v��+ />�`��<���$��G�?�ϛ�;@�q�Y��P�Cе�*⋇��|��ٞ���� �G�֒9���"s�N�z9ʽ��'�Cإl���;GZ�=�!�|ye�� rA�x^��;���# �(��%�fK�a.���yx��X�F��;)u�U�Q�N�
�{y�#��R�Q�*-Sb�����*Cn��q'i�-�D�		ٟZh�0�nۻ��v��:]4}k�.�D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�lD(�V52ou ��.C����~��N�?Hku3'������(�s_�5%nL椩@Oś	��ۘu�<��թ�+�/ʈKo�}���^�	9���)z�/r�Y��m�u�~��>��,gZB`��Z��H�\#~W���1����eh��lTX��<�<**h�ݯJ����Zz���"-gB�k��I�^�Zw?��j%��|C(t��egF�Z@>��d�Ȏ����q��N�&Y"|v �S;���EW4,#�x���*�Q�憋P�g\��1j|H�R�[�lV�S�n�	NQ���u�V�M^�{!�\L��{�/���ֆ�;ȉ��y���d�d�%1�q�9��ߴ�ۋ�I"��Jf3�T����Tn͈�K����i�2F�x�#��u΂�ו�0JQ�������������jz�.wi��m�O+�"�G̚�d����â�w��f5�T�����5�F�����=`��P���^.ǧ	�6uqרED1-�?kUror(object sender, EventArgs e)
        {
            Exception ex = HttpContext.Current.Server.GetLastError();
            string ip = HttpContext.Current.Request.UserHostAddress;
            string url = HttpContext.Current.Request.Url.ToString();
            LogOperate.WriteErrorLog("客户机IP:" + ip + "\r\n错误地址:" + url + "\r\n异常信息:" + Server.GetLastError().Message + "", ex);
        }
    }
}