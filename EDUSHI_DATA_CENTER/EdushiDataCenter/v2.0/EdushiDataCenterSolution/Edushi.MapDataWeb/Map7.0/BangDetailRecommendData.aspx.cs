�}`� r �  �%Z	p6��a	���_���ꬩ>t8�ϻ�M�IK�w��Z[BX��@�RhV[z=�BG���(��C�Ӑ���t���=Y#�	1\�M��<�]뿧&q���b!uZ���@�BRbX�?�AV�1s9�n%�����9Lʃ󗼪�^�8��R)W���n*�L
u>\�(��Q�GB�r>�;=�� ���" p������r�]
��9ra��&g̞%��mam�]�ݍ��tk#k��5?H�n|�Y����;EgY��! ȫ}
����Q�R�˽�.���ЊgWo�+��1d�@�+��F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�l�!�8XN�	�à���Wf�#0�]4����C�,j���rYtC?�@�M�P	�S�s<����.M�g�T k���r�7�"շ�|��qH���eh��mMm�Rϛ�C�[���{������5�ls���s�����h��%*�Ko�aU�ѵ����ɪyI�f�t�b�.�G�X�pO���jHA~D�s u(�Wdm��(���H���v^﴾�Ev��)]����X�w��g.���T�M�E��s}�~�oY�K�Њ��nk.���2UX�Q�>p� Z�
o�n�\V�������<\���d�����^V�d��k팛�	����-:^a0�g���'+�y����P��Qb�Y�� _���+M���D��a����?kx�}�v˥��R(6s��Te����$���<�~3!~&w��ҫ�l��N=�wG�9�n�"�1׎��C5����c�X.ڦ��*X�ňuGSc�	� %�{k/|K>4	�  MapDataProvideBLL _mapDataBLL = new MapDataProvideBLL(sCityCode, sLanguage);
            DataSet ds = _mapDataBLL.BangDetailRecommendData(sCityCode);
            Response.Write(toxmlstring(ds));
            Response.End();
        }
    }
}