�}�� r �  �~�������a	���ӟ8��}��eZ�՞ ���q�����a<K)�}6��J3��P�_�bGpFÊ&��^\ �~�(��?������r�)w��s:%`�I�hY�Iz?�h�/Qj���B�7���w�e�5�?O΀�v����y,���������Eĭ��-j�U����S�|z��ݯ`S,�0t��0����UR��gJ�"A��E�@/^DSa�9W����ضѿ�ZNS�)�Q_��h�ܩ+��4�c��)��e����&`ݔ����ن�t�t��@D��pȲ"�<�w��d�w@�+��F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�l�)v���lx+��R�W��c�Y�[�RW>b$#(N-����<�1����"1W��B�v?���}t^�V�8�#P ��H�y�fŏ��ɁM	t�s�A^ʽ��=�4��ʐ�ks�Ň6Pj1 ����6f��/EZB��¯��RGe�Zs�|H_PJ�&"Tm%!���t���<v7z:��qd}*���{��QڈU@`�x�`n���o��9�ڱ9���S|��V��F��{��,֔����N����G����	]!�*j�g"}����X������߷J �q�R�+�T���0�5��0F~*S�	0~
6j�q�@�]¡Z���O�C+�-_��+5�Ð~���1�N��q�Ki��rƩM� ��b����q�/h2�%�_6�i�mB�`A�f0l1&��8]�h|~ j�h.dt��@������Omʡ�� X�Cx��? W4�/��w�'��Z/L���l��"���\�@!��fO��2)��XC�>D�)?��f\</returns>
        public bool CheckImage(string  sID, int nCheck, ImageType imagetype)
        {
            if (imagetype == ImageType.UserHeadPic)
            {
                dal = new CheckImageDAL(MemberSettingBLL.CurrentDbConn);
            }
            return dal.CheckImage(sID, nCheck, imagetype);
        }
    }
}
