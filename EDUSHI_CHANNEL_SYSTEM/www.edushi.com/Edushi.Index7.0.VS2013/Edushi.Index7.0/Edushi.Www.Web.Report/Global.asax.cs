�}u� r �	  �	��6���a	��@��px�<�t����\��L̷s�4(4\��O>1���ۄg�J���;j8m�{��t�i��֍K�x�Ŷ�P��Yc�b���)�IK҂8�_�U���炜�*�*���e梽A���,���:Hڠ��4�=����}�PD�HcGz�
���5���j+WJ��r�[�}3���Hi~���&Iq�lX����b�&��&`_�iz�K@#x���hM��O��i<M�W)Ѻ����L"׿N3
�f"t 3��О�\㑄n���K�m�=�`'X2c�d�`jǊ�0���'�8jhyx��Sп���x�� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�l�*������&��a{���*�F�q�P�B|3'�	�wp����)���bҞӯA�ʄ�̓�W��?��r8 �AX"-מu������h��#�F:(���
��V�P���e��"4�DJ����qV�s��B�܌f�3d���+���ԍ,!N|�[Lf��B�za�T�Onn��l�.uP-m3�]�!�[!�Yd=���̆�n{|�����
��@�cg��ܮ�ml~;1���n8y�x�>"�8	r�Z��*$�b�l%/+�Z��b�tL��L:07�#�N{F��(҄�� ^5}66��Y��.�P�|� ���k�]��9�&���rK��C�x�{'@�ڞB*�:���
'+�b�x��f/ml뺴=D<��&\�}�X��FD<��,Ix�nG�1���q;qsANb�$p�7
�z������������
U���>��Ô�+h���4����@�P ��S��R����o��I�W��D�,�6�s$ݯ          "{controller}/{action}/{id}", // 带有参数的 URL
                new { controller = "Home", action = "Index", id = UrlParameter.Optional } // 参数默认值
            );

        }

        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();

            RegisterGlobalFilters(GlobalFilters.Filters);
            RegisterRoutes(RouteTable.Routes);
        }
    }
}