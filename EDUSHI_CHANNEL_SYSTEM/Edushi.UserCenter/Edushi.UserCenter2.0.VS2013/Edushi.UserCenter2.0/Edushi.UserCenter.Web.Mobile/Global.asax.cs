�}�� r   ssR	5�S��a	��Q��_B�v����3�+��s�鑦��=�)_%vb;*��RJ^hrOG����M��П�ѬԱ�o��C��	D�g�W�	����K>���,��!!���+�e���[��'/>`��<���$���G�?�O���@�u�Y��P�CХs8oDL�^�I���[��9@��S������G�" ���
�^�CJ`o�e�$���7��W��%>��:�N�����"WtIb2���%�t��Ԅ����Z�q��RHJk�=(T���VĊ��n����=��Ϝ�)NϿ|�p��(j�ct�s����L�k?�����7C%� ��ջu¹{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�l�(O���C��Xba������;XvNng���r�I0�1-T��e�̨��NU4$�}� y�(J,���i o*����:�#]�gB�Z���:�� R�q����,����ʴƂd]{Bz�wx�+�򕨟�+�Y��jg�3�X�L�`c%��t��������@�����+�`dD���SǸ	ԓ��*�Z ��&��܈�$?��ު`�BӇٍ�>�J 8۷����0s'圈�����5��ye^|��A�ԟ���p�UD@r�8A�]�?6�qF2��{�J]�_�ʊ��E4dW��H�$�1+b1�Mm*�����)Ԙ(χ��{uBnn�BR;�_���E��ٲ�>>U�^%'X4Q�� rQ6.o{K��o\��L(qG�d����,f=<��9���lV��#�+�e�]V.�k�֣�5�>��߷�_Kx��t_~�^���t��xk�'$x��:��t���P2���~v8Mߩ��4r�:�K[��%�Tg�����B�on_Error(object sender, EventArgs e)
        {
            Exception ex = HttpContext.Current.Server.GetLastError();
            string ip = HttpContext.Current.Request.UserHostAddress;
            string url = HttpContext.Current.Request.Url.ToString();
            LogOperate.WriteErrorLog("客户机IP:" + ip + "\r\n错误地址:" + url + "\r\n异常信息:" + Server.GetLastError().Message + "", ex);
        }
    }
}