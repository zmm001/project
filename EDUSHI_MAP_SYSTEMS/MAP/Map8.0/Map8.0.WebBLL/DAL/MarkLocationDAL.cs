�}�� r   ��hkQ�$���a	��������}�QE��[,��,m�}QԔ����~�8�fQL�.yC�R��Z]יb�����#� ��F-lp�S��O�L����#.�79���	������&@�y�d�鹗�Y;e�$�Ϥ ���3����Aׯ�"��[�?޺h�R&+h-�� ��V�/��zݒ��Vxܫ�3L���U`�SI�{�O �$o��ҋU�L�Oʧ���B1ʺ_�lE��8��U��S�g16J�tQ*L\��8�����7��#٪��B�7���	�:�eѣ/��<�w��d�w@�+��F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�l�)v���C7���Q����Ԃ������e�X�V��_���ذ���Zn5g��o��_腡Ø�}������a���y���kf}�i��CrR<��n	����n��A������us�Ƙ�q�:��$uo�r�������M�xL��f8�#����_{L����R"���t�"Q��Ov?V�� q|�0.ŀS�דZ�Cnn�i�gi���r�������<I�$�h��{��q�� ������E����	4vڧ��e1/�Et�g3[���"�z�ש��׫ܖ�)�G�x�+�T���?�5��.	O?�q@?Xw'�%D�G�d�f �eYM�w^��yٝ%T���O#�E�!���D�A����$�&��T�ʐ�<��n%wb�?�^ V�/��`^�k$��U1�5%C �:(]=N܎@������Omʡ�� X�Cx��? W4�/��w�'��Z/L���l��"���\�@!��fO��2)��XC�>D�)?��f\lD��0j|D��0�-���:|�����bBT��=��nMB+s�X�lŪ�ީ�}3±�ٍN痲���J��B���dxt�����c¶�g
�"�1_ad8��r+�Mqǘ�Րd�!��d����d��	�խr��w �0�O'�ٴ9'ځՂ�|(�1�&���-��m�R�I&�J��LǶg]��W��JO��΀��!�#�E��N��q?T����PZ�gj��<k<��ma��`<���Fg�P��%��	P�\�':U�p/�d_�R�������"-D�<�}x��`
b�YȢ���~�N7L��eD���m�Hw�g��~����KĤX[�(�=фR�����X��iG��Z�1F������E�	��E�|�9�B<��4�>�/��)����y<��<���,z�q�հ�Q��<�����t�Di�K\�ܕ��Nȿfm�Y�E�Ա�6�8�Bp6C#@1i��q��&%�(\�����~D{��>����dJ�]�oString()) > 0;
        }

        public bool deleteInfo(int lmid, int id)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.AppendFormat("delete from [dbo].[Local_MarkLocation] where [LML_ID]={0} and [LM_ID]={1}", id, lmid);
            return this.ExecuteNonQuery(strSql.ToString()) > 0;
        }
    }
}
