�}_� r 7  ����vV���a	����px�<�t����\��L̷s�4(4\��O>1���ۄg�J���jH'R�뻺�a�n@u�UaX�B�!t�h�q�,PRt����(��-��:.9U0��xඒK��í��T��z�)�G�),��0FG�;��q}����0�iRab�	�`�6W��ï����_+vJ��`�v�;d�7���<�Sr8�t�$oDֺ�A �p���(�.��y��"ஈ����e��X$ 5�k��b����s�P�M��
�M��e�fY�l�w��lw@�+��F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�l�,na]8h�Ϋ�*�����iVu�A\c�@��+��&F��������ԷV_��{��:�:.�o�/�z0�#T�\{]�qX�~��6��G�<�&w�%ў���pʱ2�k>�`�vvW�|�mzz�����ߒ���Ch��.\U����E�����R� �O�81�3�}T���5z�ky	WL��6��R�R�L;:]OrcS#�����$!�	���\�`�^{�`5��I����%�^'SHT�Vؐf��-�6�z�ɓ��߁�#j���a_�� ;f�.s���!��������oG����} Ã.�g���l}4$~�B�������%������lw%0tr�n+M�g, �y%b�N���)�"O��#wC�ɟ_���YI��,;N�PQ��f�rB�k�	~$�Hb�Ty�}��Aƿ�~�/�m�=)j�^�
�Qy��b�j
��EaMvJEL\Md���K��TY��RL\�WzSf�M��	?c���CH�HNl�5�U������y�똚?Q~7@��
@��S� ^=��ƣ ږtH�/�䥱�������z���J����W�5��3�O]��g��ϖ��_��d������̈́ h}
h� ?��b�b����/�5�6��AT��̜�����k{��$49�v��V^�鞿�f���Dw̔���A �`V��KB�ʯ�W	cS�b$gE�����.������r�$N�,Q��L;/��Ci���"���Q?IZlD�0r�yV@�Z��eu0?� r(y�և(�I��ӠO� Y5����!�N��:��PU��\;˸���úNf��C�e�w�.��V��D��$,��WN��rl%~[a��\Dy�E~��s��=pkV��+�����S9����H"%OD0ݻ[�6�*��c�@�j&R�[kY|TS�3�<�c=�v�P������1萵FH1�y4�с�Q~��O��A]i�{����f�C,�p�3���	x�
�ج�j0�x��+��\UJ���#� if (!string.IsNullOrEmpty(urls))
            {
                string temp = PageRequest.GetHtml(string.Format(_url, 1, System.Web.HttpUtility.UrlEncode(urls)));
                result["URL"] = temp;
            }
            if (!string.IsNullOrEmpty(dirs))
            {
                string temp = PageRequest.GetHtml(string.Format(_url, 0, System.Web.HttpUtility.UrlEncode(urls)));
                result["DIR"] = temp;
            }
            return result;
        }
    }
}
