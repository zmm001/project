�}3� r �  G6�R�����a	����_���ꬩ>t83TM�&��18OVY����G�^q�C%������8�b�&Z���(�����V�5�3��4��Tb4�hDɑ�Ћ��Z+�#�`���[����=!K=�DF����B�_��:�'{��_��P���W�Z�v<��@�3�?��V��"<}@-_�#�J3���nY��^`�����ɣ=��]��B�(�xlTe��> �ޅ�b��3��yV�}��^G���Ċ��]�;���֡�>w����N
@&r�ɯ~�1��/����Q�@�+��F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�lD*|`�:B��s�s��&��qp�o�F�n� �.��!�_+7���x�o�&X�3��Q3m�Mi"6}I_+c��It=�:�p�+64��2�A(b��w+D�}`{i����ڒn�Re�����*����]�>@��}䈱G�s��̂Z���$�����f�u�l�-і%�߇�,4�<��� <�ڳ�脚���J��=���n�d?�T�h,`7�Z{���܆�o�f8-'���|}V ~��;N�ǈ�΃���d+tc��Jg���{���y
�gd&b5[�MA�c%#�`��w��&KO�D�m%S3$�Q��'�T�����@�UWEn��������ˍ5�D�Uیca�Ř�m�c]!qmF
7�BC �w�>�����F]V��]�Po2�H�t�3�gɖ�e~g/���}������:��/⾒>t���:�P���=>G�<�1��[�d��c����H�](�]��pRx���<���\f@�1#/0 {
            DigBLL dig = new DigBLL(XunBaoCityCode, XunBaoLanguage);
            DataTable dt = dig.GetNewestTrophy(6);
            rptCowry.DataSource = dt.DefaultView;
            rptCowry.DataBind();
        }
        protected void AspNetPager_PageChanged(object sender, EventArgs e)
        {
            BindWillUser();
        }
    }
}
