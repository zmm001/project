�}a� r �	  ���f�����a	��U��_��v����3�!9-�wN�`tl�V_<%v�t��G1�X�<8
�����8�A��3��3υ�^b����P3�N�A��*B�O�#�m���?U�2���Ba���Z(�t>�#�w����9��ۦN��M��gk�⟢�Oӱ���vZ�}/�7���V�����k��;&��1׷a^%P��h５��Bݩ(md8z��Q�#�Ho�0��Q�8���ԌR�N�H�1��E�4A?Z��L>S�B���c���6~���m�gBJ��Oƛ�_&�r���c�[�����U�	<z}��UDQ�b�k�'{V���G�_�%�܇�spX\�Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�lD(�V52ou ��.C����O~��N�?hiqs'������(�s_�5%n�~��{u�w2�/�
jW�Vr{u@d�`�Sߤ8,�V/�*X��O��7�;^mz�f���"�Yxǖ���v]�	w��y�E݅��Xs�	�мz��U���٨��O��T�ݯ6C���� �;�� /gB�k��/��yl��~ӮHOoU�~S^�Jf>*��G��ҿ�ݮW�7�C�Bx0giO#�Lf���^z,#�x���X�I�(���7�k\_��* qlN�N�}�j
�h�x�8a���)M{�'g�1`t�{!�\L��7�h�
�)����3�������N��6+�>�9������Ē J��QK�T�Y���#C祷K����&�'W�i�`��x���΁�Y@��������5�����jz�.wi��m�O+�"�G̚�d����â�w��f5�T�����5�F�����=`��P���^.ǧ	�6uqרED4-�?kUobject sender, EventArgs e)
        {
            Exception ex = HttpContext.Current.Server.GetLastError();
            string ip = HttpContext.Current.Request.UserHostAddress;
            string url = HttpContext.Current.Request.Url.ToString();
            LogOperate.WriteErrorLog("客户机IP:" + ip + "\r\n错误地址:" + url + "\r\n异常信息:" + Server.GetLastError().Message + "", ex);
        }
    }
}