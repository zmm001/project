�}�� r �  #ͱ���nr��a	��� ��^2��}�o����Iդ�8z�,�_J?Qz�K����ǽ�O�d�B�6���〡�����S�xBb鋞n���U��7/�BP��)����G	����W�9*vYO G�֪���_����9O��+�:Ƨ�Yp)�G�Q�o����w܀v��"�K����ߣ�#֙K���`��f�y�v�*N���S>�,,|8<��w"�p���9�Q�
f'!a�50�����,�'������i�b#� K��<fH�#H������ ѣ/��<�w��d�w@�+��F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�l1_R:�X�B��g%M��Tᜤ�W7x=�"\�����C>Y@'�5)�Ju�֩�N?\�r����ؿ�j�y���ǍT������]v����
a��s�u��q7��b���+jM�W@�~�f20���G����p��gt��7<��'g��{�I` H�6�gĤo��/��sB"�_���3�1W���Ĵ:�6� �bZ�-��ܴ�rf9��;,�F�o�&׾�hI[}��գboO���"d���)p�e�n����4���AM�ڭ�i��zRs��f��竨�TqA���jT'6[:�P[�{��f�S����	P��q~2���@"��L��5��Ќ��3qM�s�-���fc~h�x�s�r��Z�\D��ml�-8+ ���� +������;�VUQ�΋�OK�y����V3aC��o)�I)pY �������j[$I9"eXJ�Y��-��N�����? 2�6J��r�J�ۼY���M׉�l�'X���G]`�R��*�_4\�����d�Q�F=1�a�;� 6KZ��Z�̲�k/Xз��$]��J�	�(��+Q$�)�FN:��^���È�_�׉�!����)���;d�n�ξi�/�^n	����?�p�o3*�V�=��!T��G��.x��9s�h�r��&@����0i�"�.~���$t��=m�aK�ʽ����Ŀ��M�s�"�F��
�����=��8�N��P�\��l�A�U(lN�G�գ�g΄{�'���;I�+,�͙���wB)q6�j,z,| ��-�+a+V'GN�iΟ��� w��{yw�r"����r�i*{��Xf��� X�С|�m�=��2�jd8��w�!s"���_�B�����O������Bť:� W�k����Qk�&�aj�7�hˆŋ	���iu�x�a��E���'�D�?� ����&�ȕ ��s58�Q�O[�jp��-��Y��l�&������Tst)e.Item.FindControl("trophydatalist");
            if (ds.Tables.Contains("AllTrophy"))
            {
                DataView dv = ds.Tables["AllTrophy"].DefaultView;
                dv.RowFilter = "DC_PID =" + ds.Tables["AllProvider"].Rows[e.Item.ItemIndex]["DC_PID"].ToString();
                trophyList.DataSource = dv;
                trophyList.DataBind();
            }
        }
	}
}
