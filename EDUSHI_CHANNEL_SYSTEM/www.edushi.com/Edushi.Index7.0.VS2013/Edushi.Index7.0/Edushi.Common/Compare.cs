�}� r G	  erav��L���a	����@B���o�.��^�c����
����'�z������9�PI>z�k4��Q�Ȓ�t�I���!~���$��+�U�=�zrj�)���!)�>��&��@�'�ݛ���Kn�W7V��K���	��Î2�����9�.�"M�!��@D�Ǽ�6�PǞ�a�ѵ'�4<�/��fS��>� d�=�"v+��j�hwۄ�|?�k4"�r��rN�՝�e$�Q�tK�~���{��eQ��ǊX��;�J*7D�O�w+�#H������ ѣ/��<�w��d�w@�+��F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�l�,na]�F��[�����l�5~��CYMl�
B�:�_��	��Ϋ���Cu<Z<��*)����,�;�>[�Z�c����{+`�p��sYqũ=�q�������.��kʤ�?F
��|yJ��楫G㋑Vd]w�ZW���p�߰Si^�6����\zTQ����i(Hh�O��x	WL��1��SG�^�5��8F	7g<m  W*����zWx��0:��Sv�6j+�600
�EB*o]���%主^�罘 �HN�������K'j��_)�Za�NC�ו^կ�1nek`|a	�)P����kg�.�g���lr;$t�8�����Vޘ`�ג�/d����0}G�xK��������_R���{�,��k6CwU7�+��T<[�����s��l�o�����oGvh�8� ��%�
��N�M��=)j�^�
�Qy��b�j
��EaMvJEL\Md���K��TY��RL\�WzSf�M��	?c��CH�HN��的委托</param>
        /// <returns></returns>
        public static IEnumerable<T> MyDistinct<T, C>(this IEnumerable<T> source, Func<T, C> getfield)
        {
            return source.Distinct(new Compare<T, C>(getfield));
        }
    }
}
