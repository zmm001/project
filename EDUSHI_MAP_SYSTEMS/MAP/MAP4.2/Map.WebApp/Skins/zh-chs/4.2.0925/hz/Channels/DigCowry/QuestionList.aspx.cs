�}�� r �  �v�b�f��a	��� �Ӟ���}��o�c��0��lp�M�;�<A�������T����:����n����{z�ֹ�.	2�ɝ[=I��T���L�u�����qT�V�����ķ�iLP�x�]#�S��G-�8���7B�ٸ+�|m�>��n��]�jkw����Ug4��qWo�Q��h��9�fu��3u<TW���Ň�\9*lFJ6�q R�Psg�p-QhUDe|������0L��� 7�xMH��y�Դ�>6�̜aL��<fH�#H������ ѣ/��<�w��d�w@�+��F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�lD-���Ctڌ'�NGp�c�[� ��/�`"n2%�kH"�%����!�/�]�&)ְ������o�����Æ���P)�~���d��b��'wr)&Ċ�	-~
��o$G�+���sִ�E8���*GN�Q�dg�eB)WJ B�CQɚm�xN�`�f�CY�ልs����vp��f%�a9(��b���)�h�H�q��r��̽�!��<�6�������m	�\��V̏��|a^���kgP}$��8�Gm�Q���Sn��ERd4�1a�&ߌv�1Ejj��@W��D~#y��l����X
�-����:��#ا�Tn�y�t�u��G@�L2���0$��su,����}p(�R�i]1 ��ӊǇ�ӄ2Ƀ~�$�����Wp̀��B��ӻ��X#ֹ�����r����B�����y�Uf��=�U�S~|�TCT�~�&�Eף��O�^A�O��+
�P*� �;,��J��Ykl,I��tP9�gE 5G����Y�|>(�Paper"];
                    questiondatalist.DataBind();
                }
                if (ds.Tables.Contains("ResPaperLottery"))
                {
                    trophydatalist.DataSource = ds.Tables["ResPaperLottery"];
                    trophydatalist.DataBind();
                }
            }
            //冠名商通栏广告
            GlobalADUserControl1.CurrentURL = sDigDataUrl + "&req=1";
            GlobalADUserControl1.CurrentPicPath = sDigPicPath;
		}
	}
}
