�}�� r �  ��7F���a	��/�˞���}��+��X/���#�$�I����L)jr�<�^�16崚�nX"Mj��$�c/2��V�
��p���gz]�S&�Hz�Ej1�3��S�<��"
� ]�	�Z�*n�pk�*�H'H
 ~+c_{¨��߀����
�2�b÷7�����Vâ{��7!����1��s��!���������c�������ҍ�H���(܆6�+޸���uK���&~}���Thh�%_����/g�RK��˩L��Gf�Y��� Y�l5���C���Ҋ�4��PD����m� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�l�/���8>���m�PI,�5��jb������.�/�����>CH��[�4qe;9Y{���/k�a�A=�1����w�]�T��SLDd�21��J�u���1�=al'ǁM��L
�挅i�<:"}#D6��������!����U�u**;�i]{�P���*ڿs���9�ľ������(43q�)��#�/�񺑨��i���6t��Bܿ��ix"�m���1�H��t@a�.je~xA��S��j`�A��)7���K����V[���e1�`ȼ��󭤺�reܥ����3��NQ?�g�E�RC�?�.�<Q0f���>��@=K�/���I����M�ġ%����84��}�i�|�2���w�)��@��-��|�!�
�˅�*ތ,��L�~gn��&db��M�Ju����H��~t�@q���I<+����'�d.���L��sF�\j>�@rh,u^(��\�6	�wv���|A�s�[_�8��WF)r�S	��ǊRZ�         string sLanguage = WebHelper.GetQueryString("l", "zh-chs");

            MapDataProvideBLL _mapDataBLL = new MapDataProvideBLL(sCityCode, sLanguage);

            DataTable dtReferece = _mapDataBLL.GetReferencePointData();
            ResponseJson(dtReferece, "refrencePoints");
            Response.End();
		}
	}
}
