�} � r �  ��	�5�Z��a	���+_L�7|�쑹�|�m��&%zV&���;�y
iOl6�dG^~�C��;�ju��P�����a������A�l��������v��lG���j�} �.�d��7�ɵJ�C��^ޫc�{̑�VXP�j��n�-^���)���C��.�Fدԭ���"גM�kM��穧`=��a������ł�P����!�hb�YN��]�����~fjJ.bX�g���U%�߇b���~�cˁ*�H-����&ˬ��HH�#H������ ѣ/��<�w��d�w@�+��F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�l�*��rEU��5޼ �S0��d+����"��z=��T�\̜������%�n��YA���
�����颮-�t݇����B�փ�#d
�*~�LAL{!Z�>���^PՕ�����1� uJ�ys�$����5�k#��r/�|�D���[e%ߕ�T��-���x�0_;�]�!����]7���0&_�͎�_��\�bS�(Sd�!E���D;9���ԗ�r{�PX"$�!Rx����s��Pg�Q�Oʅ�KJ��{���ܱy�mr-/����6#@���PJI{��&�Da���.cVu$et�Q)S�waC�J���>�
�Gtw�b�+�o�.�EV5�|(~��8K����̑IVD���U&Rb��[}�՟�����Tɰ���e�Ԛ�)����8T��ϼ�!,b%L?å��e��
qi2�5�I;f��5��B���!y���/b&e�o�K��`�j81S<�d
�R�2��#h�����b1�C���Ts�Rȍj��U��׮xC})>lD$9�qԴ��8����O�s���c�*�@����w*W����œI^�C���)ld�ue����k��R��<g����!X)h�`GJG]J:�1��x���X���k�c�=�m,��3�ќ.FJ�	G�E0q;��XeK����p�`�Ӊ6�Q[����pΦ�������H�?����Q^T��o��:H���lF���$m?�_S�d��c�!�$���Y3�׶ʗ�r�ڧ�T����P�F�Z)-��~��5<?�Z���jQ/��u%d}�bN�������^�k1)P��2��(%_ȵUnh�if	xJ���'��*?����?Dt�\���m�T���s�f��5�r7���b��r�o.�F�7moh۹Tm£oO� �4$ϥ�u�Ip/!=N
Ն&���˗�e�σe���$H/��@`9�+��$dg��M�L+|�^K&9ڋV�= r7��WƜz��n�^��g�z}ޡ�Tk!nb����]7U�
𮉏�apDataProvideBLL(sCityCode, sLanguage);
            DataSet ds = _mapDataBLL.HYDetailRecommendData(sCityCode);
            //string strContent = toxmlstring(ds);
            //DataSet ds2 = todataset(strContent);
            Response.Write(toxmlstring(ds));
            Response.End();
            
		}

         
	}
}