�}&� r �  �a��g��a	��L��B����2��OPb(�ݴy9&���Xc��L��G�gvr�E�Mi.C.�<��Y��F��aӑc��L�#��]{�q�V<'ߋ�6�L�������NŎ/� BC�~��[cπ�T�X������~��;���*�����;HB��xp"�[.����F��]�ߟ�R�|<�����6��� ���]v��aUT�l
>P
����T���A�edX��.����>c���3ѱ~㏼�|�	�������V:{|qHװ )|r/���������x;���L�-��f%_�� �s4oUJA��@������ű�/�A�˳��~?I<�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�l�(p>�]�^�-pɮ�Wu�5:W�Ƞd>�5/*QHC���b�F�+�����G�`�Oan΁�;�K?�OB!Ւ8��^�1�Dp�(��#t�0+O�MG�f@
�v0_��n�?�����m�V:��<�<�1G|��t>�	�eh�#,�&T�G�^�sh5����7K����Vg��\����T#H���Ƿ��_�H�-;��<�Z��l�@����0Z.\/���y�C�OF��)o�����o���m�����O ���<d��f��	��3@��
?[�F�v�:#�g�b�����]����N?�`8 ����y��g�����R�RP���u	��8�|�~r=x���-n �.�p��. �M���&=ˁ����(�|�Dd�-Ч�<�2�ȕ2��ɾh�p����k��D5����]K��Q��7ٌs��┨puD�<�>w� &�4��.�>�Bs�����KYW� ��ǖ,�µ���1W�������.����heability(HttpCacheability.Public);
            }

            Response.ContentEncoding = Encoding.GetEncoding(WebHelper.GetQueryString("encoding", "utf-8"));

            ALLCityDataProvideBLL _bll = new ALLCityDataProvideBLL();
            StringBuilder sb = _bll.GetSbProvinceInfo();
            StringBuilder sbPY = _bll.GetsbCityPYInfo();
            Response.Write(sb.ToString() + "\r\n" + sbPY.ToString());
            Response.End();
        }

    }
}
