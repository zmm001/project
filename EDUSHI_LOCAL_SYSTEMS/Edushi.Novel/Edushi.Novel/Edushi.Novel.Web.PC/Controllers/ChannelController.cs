�}C� r �   |:L3,����a	��� �#^���}ꬱ������KI�DQ=�v'ɫ��y�,�%V�s��%����B�	,2���4�8iZ�P��n9�b`"Q�t���*y��a?_Ƨ� �s*�#�C��9����9�"�t�"�D)��>m%�����OI��2��ͪ����P���4@V�w)��<�ɗqf:o���h���3K̄X���Т�z�;auj4�Y��`��xcydIQ 1�}� ֻ�/�/�\�C��i��G�
�����i	̂�� K��<fH�#H������ ѣ/��<�w��d�w@�+��F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�l��U�����K���u�ʦ����L��ā�Fjj���x�$Ҿ=�o��ѥ(k@3U�����n�B�n�e/��":T���E &YZv�zM�.�x?��}��?��尽!���.i�=������DϹ�	���
�H��#�\�f�t�:���y��� %�+�� -���Έ�ki�V�Wb�
�ڏ�!�.�S4����
#�� �G����
�3�Mܗ���;n×$��y��ބ?��x�XX��Q���N0��kh�\SE_���w�*~�R�i��E�a!l�IH�à�O�;,�Hל�#�<z�Hrb?ǽ����%�rG{+TکQ����κ��K�ʔ����\*ځ�m3��1Nf_�%�������6mo�
���=�s+�c�|�g=�a��R�V"���I���{M�U@�L6EfD�m�}��bʒ��v�bTy�ϥJK;I���5Q�n�B�ZB��K
�鞉6�
-��zy޵�㴃o�����<װ���H����fl%?4H�l��lf�A�nZ�ePM7�9;0,0���K��ޱx��6WH4�K����=� ޽�Ţ�[��%��i6{��L@Ғj�0sε8y�l�(��
;����a�V���h�T��W��]d�����-�9�NSGsD��H6�.�;��]]� Ƚ���,	��,�!�vV���NG
�R�l��	Lff:TLJ��R�rJ��*�������w���3�m��W�b������Io �?4�_5}����l��k��=;��'�G�:��3B)�s�\/¡�F?�eO�#]Xs�Y�+���R6ۂĤ�|k��<���*�K,�֤?"5��/�O@��Pu���z��ܶ?�z�&�>"L� pF%ӳĻ�$�5!�L>��)�Otm�V��;���=+'P�����ԾD��.̗\�Qji�+θ]:$����M�S�H"��2%��`��jr7�H����r�E�1���F�f�N;��g&;����/�p����֠�pCategory.Female);
            model.FinishedBookList = ChannelHelper.FinishedBookList(ChannelTopCategory.Female);
            model.RankBookList = ChannelHelper.GetRankBookList((int?)ChannelTopCategory.Female, 10);
            model.CategoryBookList = ChannelHelper.GetCategoryBookList(ChannelTopCategory.Female, 13);
            return View(model);
        }
    }
}
