�}�� r ^"  �
|�za���a	��a���8�w��IQ���ɠZ./W���L5lh���,WQEh>9S��;A�TB:��A:Ҥ���B�<$�d�&�j���ر��`FPD����R���x/�����L�9�<�UW��:[�r�M@��*	&5�7���l1�x���H@��2�oQ$��Dnö�������9�Fdi�@�S�d��H����P"n��#��NwE���F�~Mh�s`&
��L�ɜy�>6vE����[�����Hc��>��|$�.�5A�n���Y��R��͕id����w�* ����m"�46��X�9kۖ;s�v����'�֍aۈ�0���q�~Ͼsl��٪;m�;�%�	N��C`RwcC�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�l'��a	�Y*�r(r�}]!���noXa@��;N�@+sc6P9�O7���J���>�D/'���o�h����N�$�����`j�+V��<��R��I�v��p�-Р��p�i�tp�$^"鳛Pɱ������5Ϊ�MlR�����{�(^@�؎�;�h��i᠖t�]H��Ϳw��g:7�rn�㕧}�эe��Sb��L�S&w�Qq�kV�p�;���I[.��Am����+GU�*����8��/FOd5J�ʾ�zۿC�a��/����:t���qi(M�
�e��+iDcS�	�EKEl���*��(��Jxg�{ȷØ��=�au��"����S�C�>WF���D��DF���NW���q������_P�?�ý��w�!�y�jG��t���b��yu��F]�i%��;Y�bhC+n���c�AO����C�|v1���[����+N��Sߊ�O"�^���G�3\; �^�F}�$\��3o�X�~MӆX�N�ageSize { get; set; }
        public int TotalItemCount { get; set; }
        public int TotalPageCount { get { return (int)Math.Ceiling(TotalItemCount / (double)PageSize); } }
        public int StartRecordIndex { get { return (CurrentPageIndex - 1) * PageSize + 1; } }
        public int EndRecordIndex { get { return TotalItemCount > CurrentPageIndex * PageSize ? CurrentPageIndex * PageSize : TotalItemCount; } }
    }
}
