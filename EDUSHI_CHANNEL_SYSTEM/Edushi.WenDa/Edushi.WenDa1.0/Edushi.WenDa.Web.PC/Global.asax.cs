�}�� r 	  {=�R��E���a	��S��_B�v⬩�3�+��s�鑦��=�1i*��s]L�5v���PЗ�B�s(]ޛ��t����Nq������ +�Jh�������MA`<ã�K#���Ϊw-��>�b�{ջ�d��Y%�]�'\�7ƾ���H˶�r`M�<}]�"�q������{����� j��;)/�˷��n!^9��j��՞���\�Ud<~aS=nN2q��5���Q3�6���0Z�vf�=q�)=�E����=��(��+��Z
s!�{{ԩ�w4�Ld�a��X�8�
��vI!FXn���h'�_��D�7��j����3��3����8��SVƉ��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�lD(�V52ou ��.C����O~��N�?hiqs'������(�s_�5%n�~��{u�w2�/�
jW�Vr{u@d�`�Sߤ8,�V/�*X��O��7�;^mz�f���"�Yxǖ���v]�	w��y�E݅��Xs�	�мz��U���٨��O��T�ݯ6C���� �;�� /gB�k��1c�^�<>s��8F��\C
rC�czT�O) 	��V�ֽ��ЭZ��[�CSagZ*�V#���]PW`wV�+��� �Q�K���~P�\TC��7xp]�o�H�l
�N�u�)J@@���e"�F�C/!�>r�Ga��Q�/J�^�J����8Ɉ��2���H�l�l�|�9�����Ә�Ii��P�X����#C祷K����C�H�,�`��1���ʔ�_E����͒��+�����jz�.wi��m�O+�"�G̚�d����â�w��f5�T�����5�F�����=`��P���^.ǧ	�6uqרED2-�?kUcation_Error(object sender, EventArgs e)
        {
            Exception ex = HttpContext.Current.Server.GetLastError();
            string ip = HttpContext.Current.Request.UserHostAddress;
            string url = HttpContext.Current.Request.Url.ToString();
            LogOperate.WriteErrorLog("客户机IP:" + ip + "\r\n错误地址:" + url + "\r\n异常信息:" + Server.GetLastError().Message + "", ex);
        }
    }
}