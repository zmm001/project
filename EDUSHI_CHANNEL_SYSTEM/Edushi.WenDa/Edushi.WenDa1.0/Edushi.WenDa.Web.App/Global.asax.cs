�}�� r �  ��EY*ui���a	��S��_B�v⬩�3�+��s�鑦��=�)_<%vD�����Y�nEN 4�4#P���P�p-M�sS������ő������:L:1�.\�.q���7��o<�\Ƕ:gʓ����q�XR�c:�,Xf�H�mpC���W���V*齚c>*<�D���~�ǔ�_�A���d����������Rց;�"h��'Z�=�'��u_�� |I`{_��[�CQ�s��B��.�`�@U��j�����T���Ip�!�jc�)�C
�MD�gJ���N_q."�g�F#X"�]�R7�HA�d�Qe+!~��ӓ{;�nq�/�Ir����Z�[ƣ��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�lD'�G��ѭ�/�ޫ� E�hJ�:~8 x��F'Q�������߅���5>:v�-�&����>p��c��,C�	c���߄��.�/�G�E���{g�F�a�Ew��Qn��c�@�Ց�@����Ő�T1��{��8��)b{ߧ`�����,>o�|�+�ύ��[w��ثp���(�čֹ����ۄ�B���k�Qq�dۏ8��9���.�������(�"V�+�י?��6��S�_[ry�
2���s"�{���g���͈�:b���[�^�}�wo�)��_����8������ ������ntQ��7���hɥ�D�=��-:T����Mu?�׳��I�/��}D6�Ь���O�wx�-[q��2�ޯl�HZ�@�ѡ=5ہ������ת�u�ğ*�Ҋ�oA��y� 2�M�!�	_�ط�{�9e8V�^�7	�G9!b�RZ'qOtŬ�%y(�ԡ�Jا8W��%	�}]R��D��on_Error(object sender, EventArgs e)
        {
            Exception ex = HttpContext.Current.Server.GetLastError();
            string ip = HttpContext.Current.Request.UserHostAddress;
            string url = HttpContext.Current.Request.Url.ToString();
            LogOperate.WriteErrorLog("客户机IP:" + ip + "\r\n错误地址:" + url + "\r\n异常信息:" + Server.GetLastError().Message + "", ex);
        }
    }
}