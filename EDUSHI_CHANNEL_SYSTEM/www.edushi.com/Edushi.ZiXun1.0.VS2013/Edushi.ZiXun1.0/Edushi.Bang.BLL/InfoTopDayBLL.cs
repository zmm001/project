�}�� r �	  �)٩�b��a	����px�<�t����\��L̷s�4(4\��O>1���ۄg�J���jH'�^L��;��_RS�*�r,z��N˶�8k4�ϯɪ�_�:�2e*{e�[�%�"���aAF�#�TƏ��R{-(-���(_~��q���Oia��I�8D�gH��v��o
�f^��&6_��
�~(����"��A�l��>�|�]�C��w.���ʹ�(�.۟=�*(U�+�Rg?L4g]�Rj=��0��^p6K��8
�ӱ�[�/��<�w��d�w@�+��F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�l�,na]>��$�2f��=ֵV��i��nc|?���^Dޯe��MV��'��եs��7��q���,z[�5�.�z�H@ <�ݏ��7)M6��x
�
��W��8Q����"���UF#�TI!@���s��:�=TdD�r���r\���D
`C�Sx���n�x𷈥��[��t?�x	WL�� ��O	�U���LG 3X)fz�伛�Y%m_ڨ�`���I�z�Bq�s:�+58�;zc:�3��%����	���M�T���ҋ�k���a|�G��j��m1�
]L����3HgG���oJ�Ӿ�~�_��[u�F}4+t�h�������p����#(㛥����օ�r�Jή�E֓�E�RYO�e��q�'ަ����$��}	ſ���1ŬSf�i�ӗv�ŧ��X����m� ��
8>�s��=)j�^�
�Qy��b�j
��EaMvJEL\Md���K��TY��RL\�WzSf�M��	?c��CH�HNl%?4��Q��#I�3�0`{,7�g{�=�-/槗H���t#�����pD5�?�cO*(S
��sT���<>��t�K�}U�1p�E� ���w`kf������v}�겮rO��n��lW�O/�M���~��
��(�~86KGsD����l�4�B��i�4#P�0mT�X�+*<�j��@NQ�p�<l��	CifjF��Y�1l�T�?�ԋ��k�u<
���>�c��j)�%�_��V�YɪNO�@mCg�C:/Ҫ��m��
�p�i~��u��x"��}`%	�*�B,���S%�oL�=Pw�L�>���fΗ���|{��y�۬
z�)B�ڤvla��n�
1Y%��xw���5��ٛ`�3XS�:� \�a u�����PJ�Oi�u��z�G%���
����4�'Ĳ[�B���nl{�g��XZ�$����ʮu�'��ҳwm�sϣ��?|2�����Q��d�^���F�j�_?ٟ�/�:��t����X<s�t objType = new DataAccess().CreateObject("InfoTopDayDAL");//创建InfoTopDayDAL的实例
            return objType == null ? new List<InfoTopDayModel>() : ((IInfoTopDayDAL)objType).GetTopDayData(sCityCode, ParentITID, ITID, topNum);
        }
        #endregion
    }
}
