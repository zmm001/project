�}U� r w  H����E��a	����_���}������^W�ˏ��蘗kk���H��x.�s����Y5h�R��IdF�W����+'n3F]�/K�}��p���y��D��S�"��g[�Û���9d��<x��e_�g8� �_>�Xs��t�>���@'sH�"�7t�������(nk�N�tf.*��ڛn���TK��9�W ��mm  �mx+p�V�/�l���L�6�6���:����L#.�_ej�Q��1�?/�ՋK�y᱋I��6�l����� ѣ/��<�w��d�w@�+��F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�nExecutingContext actionContext)
        {
            var loginUserId = DataHelper.GetUserId();
            if (loginUserId<=0)
            {
                actionContext.Result = new RedirectResult("/login.html");
            }
        }
    }
}