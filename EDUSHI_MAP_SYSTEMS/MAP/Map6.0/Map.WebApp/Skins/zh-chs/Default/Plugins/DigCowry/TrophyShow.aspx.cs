�}�� r g  �ˎ)�Z���a	��� ��^N��}ꯑ6\��D��|�֍�;H]�QgO�;/��������V����\��kȅH�d�IM �}��7l�a��=E3��;�g0ɏ��?�Z�n��F����)�EN	�j�����2�y�#�eL�sR_����G�^�IC�u��l������|���.x��%��`����CS0m���!Ѐ(�O�o���V%��'�Ko��.LX���ۉ��S��WEEn�?O��@-V-�Y�i�b#� K��<fH�#H������ ѣ/��<�w��d�w@�+��F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�l.b%�Ï���������d��kҏ�Ҽ9V��hX����F %ȑ��*�_׮�;^�:ŢN�AL���`~��|����X���1Դaq�H?;�`+L�'�⑃-O�ӑo���U����Uʳb����?���E��Z����bcl������s��m��q� 8�?f=M���?}.�Vo�%y��x��o���ʢ	K�Z��(�:�.aY�+5.�rm��2Kd<Cf���w�f�?b;���)vsI�F:3XC�x�I5%�Tn����t��������_m܇O|����
��m�ɾ�P�f���:.%l�D�P#Q0�at#K���f�]A��S�
�͉t{�0�1d�~�*��=��2��f����UF�ϖ���k��`��<@ ��+T��nX��cFL���&��.�h�d��USOp�S���	G{�� ۗ����-�� �(]h�aM?J;���Җ�}U�����X��.�62�,����=L�˯s� ���$T��l*|=�^(�س���>�����7�$�bd�^�A�Q��=F�#7��8�������s1Q��9�m��q���g��C���?"����4�wq.:I6ʌK��w~��c���MA� G�؟���+���sa��{K��oҒ��e����ö�z+Ƴwc��;![��{kfo���4*I��tw�[,d��"�pg��PJd���-�W��
Z[cR#��}D~+TC_��2��!��n��c�q�6�9ɧ���8%wS9��S�ђ=���0��[:U��w�ԩ%i��n��a�9�9� �;4� �;��G�ҡ�Q;�����$��5Ԭn��'o�H�д��+Y�K���w�d��HL�CSO��H\{�?4��=�T[LI�FRF�@�	��	P�'�3at��WZ�S1�k�p�d��l'&{S���ǻR�M����k���Ǫ�!��ܽKo�����q�N�@��y�ȀN�$��ɏ�cj|�`#����%O!�߰��IZ��"trophydatalist");
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
