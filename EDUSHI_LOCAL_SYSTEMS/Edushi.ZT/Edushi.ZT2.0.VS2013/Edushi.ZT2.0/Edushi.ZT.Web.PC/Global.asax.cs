�}�� r E"  ��ih�9����a	��R��px�<�t����\��L̷s�4(4\��O>1���ۄg�J���;j8m�{��t�i��֍K�x�ņ���3}���m����^d�i߭�(F�N;�[)/�ǋ�����*�r�	kYEW��h ���1 =KV�i�!a�_/��8m�]�������ש�sS�x
3��%� 3.���rbݸX���L��J������a��@-֡'���c�۱aڰe<E,���)�X5���X�R%~i_�j��W��H�%=uj�A
�Z����?A�ԁ1�
�h��sz��xp��qf��69����F^���%ȥ���/�.�D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�l(ʹ��_�6r���TTՈ�ǂJ�����	3�*�#m}�CC=�ţl�x�z����jXD�}��#9��ƾ�|�Dn��$q{9���1�,���J�M�|.�[O�}W+i����r�_�9 =��uU���y�a���ᴬY����j���� �5��8ð�[���������v��O�4zl��vfS���2�
gJ�xK����P0*<*V�U�&0�,�Ңtq��܄11OH{0��+o����1��7�׬�v_��+����3t��:Sk d�>Kq?7�'R���h_�|�Qx��O��e��>]7�t�2�É���Sx�
�\���o��U�V��3K��G2��)�Z'Ek��x:�Tn��p���0�y�q����3���X�Ig����"����[�� rI�����(73�g���*j���g�h'	��G%kn��%E��o V��;�u7������@�����0��#����R۸���M�Zp!�g�Y�l��ect sender, EventArgs e)
        {
            Exception ex = HttpContext.Current.Server.GetLastError();
            string ip = HttpContext.Current.Request.UserHostAddress;
            string url = HttpContext.Current.Request.Url.ToString();
            LogOperate.WriteErrorLog("客户机IP:" + ip + "\r\n错误地址:" + url + "\r\n异常信息:" + Server.GetLastError().Message + "", ex);
        }
    }
}