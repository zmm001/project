�}�� r �  �Sx>���a	��&�ӟ8����kF���I[�#��5*fz��2T�E�cd��wA-�f_�qn|�%�M�!7��.E`���F�4�U�1[H���iA���������n�5��C�]٦�G��S^
!�Ձ�d#��:�l�M�W�05!U�dK?�1�� �[�(B_T�oUUHf�|���x��"@}aq	?Z�z���
������eI����yk�X�+?�9x4a2��U�i����eR�%A�r��8�X��T�Ř�h�T���`e��I��*�߈� ^�aj��Nk?�ꡌ*�s�R�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�l�:g<._�JG�;���qe���#���EW-$H
�V���;��{;/Դ���K�oq�5��v�<i��~t��Q<]s�mɎ���tr�Cs�O��A�c���"���R��®26��;+[�МNE&:�)��"Y�{��,!P@��݂3�򭻺X��s��秆_����I�c��&X����F*5痹#��6M|��L�8�t}V��T	$��:�>`�;���� u��˰<X_7���5��� 鈎�Fu/�zL�����
���2t�+�ྜྷK�C�����I�e ����ZɖS]��E:���w�n܄T7��u܃#�-�H:x#a�{��&�Q��92�}�s���͝��L6T7F�e�r_�l@<8yG�$BR����g|n��#���n���({;�C��� ?MLbšv�]����e[��3�����P�9��8�j�dWo�Ʀ�I�7ϖ7% �<:d{������R����J���9�M{;h�ol�'X����zt��?t�*��E9Pt����H�3cd&����%A:I�GNݩJ��u��z������$��8 lӗ
��TN~�|W>��r�%7�"'����z@���@�:�p�0��!y�*2�J���KC����ZbP@��ߡ$���P�qx��9s�;i����gr矞�2;"�\�qg���k&��vy8D�XbP�贞*=
���٣��VV�/�#�x��Vٞ���{sۗ+%�<9�(�qF�~��O��á-�����g͂f�6��q �'0�ވ���#k4Z�A  c*.��T�T/o^h�*ǲlζY�R{ʊ>)d�sp����C�~|��@̆�]�T
�l���,�qI��`D�/#L��2�QGil���8{�F��4����⥾��C��.�3�?ܱT��ݵ߀�Ѧiq)8y�l���O�A9 �R�)�����0j�ve���<������ю�%̑���d��fJ���9�i���"z��U��  {
            EDC.Framework.EdushiDataCenter.Current.WriteLog(string.Format("索引{0}生成完成", strategy.IndexPath), LogState.Error);
        }

        void strategy_BuildError(IIndexable strategy, SearchEngineEventArgs<int> args)
        {
            EDC.Framework.EdushiDataCenter.Current.WriteLog(string.Format("生成索引{0}出错",strategy.IndexPath),LogState.Error);
        }

        #endregion
    }
}
