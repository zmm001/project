�}� r �  6�yc�� @��a	��
��_�����>t81X�X���~�R@Gxr������g�v9�O���$&��R�K���G�ɚ�f��(Q�'�ޕ'"D�#壡��=�R�*$R4Q���f�cTo�@ۇ>�!e��p}�,�y���KQ��
��d�}���(h�356r�Sr �Ҥ���S�Wo*�������ͅ"p��ޗ>ok�+��}g�Z
��,�*��`>MGXV�ʻ��S�
~�>�ݎ'٩��J��V��Y�R����0���UZ,���RY踁���Ah���� ѣ/��<�w��d�w@�+��F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�l��<����^�SJJ���+�O@F/4S����T�P�65G6 �H)ˍ�!л}GޞJ������J�b8��pԇ��_hj���y��w����63j� P�ZHw��03P=�#�Z\�[wF�%X��E.�ͼ�o��)��[I1��v>̾Mt�ׂ��J�顄�f�{��r�s���g����@G|��!�,�]'���Q�a��� �7*�?�Ի981�;��=KĈ�6�Q��W��9��$��D��M\����,JhK�ā�"L"��_qC�k<�	֯�_a�$$Xi"ۈY(�A����Ҝ�C�|�l�)��l�K+���}�ij���͇�A���kR5+���C<���Gח��e|��rY>�t������jJ��Fn�� ��:H�����lJ���� �u�U�,�@m��"�J�6�/q�	�o��A+:��Ԋ����S�bu�>nv�|�N����?ϯ��
��9�q�P�Ƒ����IO�ȃh,� �*P��MGy��ing());
            rptTro.DataSource = dt.DefaultView;
            rptTro.DataBind();            
        }

        private void GetOneOtherTph(int pid)
        {
            DigBLL dig = new DigBLL(Domain, Language);
            DataTable dt = dig.GetOtherTrophy(pid);
            rptOther.DataSource = dt.DefaultView;
            rptOther.DataBind();
        }
    }
}
